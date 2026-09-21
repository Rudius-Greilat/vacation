import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VERSION = sys.argv[1]
TEXT_SUFFIXES = {'.html', '.js', '.css'}
ASSET_SUFFIXES = r'(?:css|js|png|jpe?g|webp|gif|svg|ico|woff2?|ttf)'
QUOTED_ASSET = re.compile(
    rf'(?P<quote>["\'])(?P<url>(?:\./|\.\./)[^"\'?#]+\.{ASSET_SUFFIXES})(?P<query>\?[^"\'#]*)?(?P<fragment>#[^"\']*)?(?P=quote)',
    re.IGNORECASE,
)
CSS_ASSET = re.compile(
    rf'url\((?P<url>(?:\./|\.\./)[^"\')?#]+\.{ASSET_SUFFIXES})(?P<query>\?[^"\')#]*)?(?P<fragment>#[^"\')]*)?\)',
    re.IGNORECASE,
)


def versioned(match):
    separator = '&' if match.group('query') else '?'
    query = match.group('query') or ''
    fragment = match.group('fragment') or ''
    return f"{match.group('quote')}{match.group('url')}{query}{separator}v={VERSION}{fragment}{match.group('quote')}"


def versioned_css(match):
    separator = '&' if match.group('query') else '?'
    query = match.group('query') or ''
    fragment = match.group('fragment') or ''
    return f"url({match.group('url')}{query}{separator}v={VERSION}{fragment})"


for path in ROOT.rglob('*'):
    if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES or '.git' in path.parts:
        continue

    content = path.read_text(encoding='utf-8').replace('__SITE_VERSION__', VERSION)
    content = QUOTED_ASSET.sub(versioned, content)
    if path.suffix.lower() == '.css':
        content = CSS_ASSET.sub(versioned_css, content)
    path.write_text(content, encoding='utf-8')

(ROOT / 'version.json').write_text(
    json.dumps({'version': VERSION}, ensure_ascii=False, separators=(',', ':')) + '\n',
    encoding='utf-8',
)
