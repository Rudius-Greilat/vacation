import { getTrip } from './trips.js';

const root = document.querySelector('#trip-root');
const params = new URLSearchParams(window.location.search);
const trip = getTrip(params.get('id'));

const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[char]));

if (!trip) {
  document.title = '未找到计划 · 远行簿';
  root.innerHTML = `
    <section class="not-found">
      <p class="eyebrow">404 · TRIP NOT FOUND</p>
      <h1>这段旅程还没有写进计划。</h1>
      <p>返回时间线，看看已经整理好的旅行。</p>
      <a class="button button-primary" href="./">返回全部计划</a>
    </section>`;
} else {
  document.title = `${trip.title} · 远行簿`;
  document.documentElement.dataset.palette = trip.palette;
  renderTrip(trip);
  bindDayTabs();
  observeReveals();
}

function formatDate(date) {
  return new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric' })
    .format(new Date(`${date}T00:00:00`));
}

function renderTrip(data) {
  root.innerHTML = `
    <section class="detail-hero ${data.palette}">
      <img class="detail-hero-image" src="${escapeHtml(data.cover)}" alt="${escapeHtml(data.title)}旅行风景" width="1536" height="1024">
      <div class="detail-hero-overlay"></div>
      <div class="detail-hero-copy reveal">
        <a class="back-link" href="./">← 返回旅行时间线</a>
        <p class="eyebrow">${escapeHtml(data.mood)} · ${escapeHtml(data.duration)}</p>
        <h1>${escapeHtml(data.title)}</h1>
        <p class="detail-subtitle">${escapeHtml(data.subtitle)}</p>
        <div class="detail-route">${[data.start, ...data.route, data.finish].map((city, index, values) => `<span>${escapeHtml(city)}</span>${index < values.length - 1 ? '<i>→</i>' : ''}`).join('')}</div>
      </div>
      <div class="detail-hero-facts reveal">
        <div><span>日期</span><strong>${formatDate(data.startDate)} — ${formatDate(data.endDate)}</strong></div>
        <div><span>节奏</span><strong>${escapeHtml(data.mood)}</strong></div>
        <div><span>目的地</span><strong>${data.route.length} 座城市</strong></div>
      </div>
    </section>

    <section class="section intro-grid">
      <div class="intro-copy reveal">
        <p class="eyebrow">THE IDEA</p>
        <h2>${escapeHtml(data.overview)}</h2>
      </div>
      <div class="highlight-list reveal">
        ${data.highlights.map((item, index) => `<div><span>${String(index + 1).padStart(2, '0')}</span><p>${escapeHtml(item)}</p></div>`).join('')}
      </div>
    </section>

    <section class="section days-section" id="days">
      <div class="section-heading reveal">
        <div><p class="eyebrow">DAY BY DAY</p><h2>每日安排</h2></div>
        <p>选中日期查看当天计划；时间只用于控制大致节奏，不必严格打卡。</p>
      </div>
      <div class="day-tabs reveal" id="day-tabs" role="tablist">
        ${data.days.map((day, index) => `<button class="day-tab ${index === 0 ? 'active' : ''}" data-day="${index}" role="tab" aria-selected="${index === 0}"><small>${escapeHtml(day.week)}</small><strong>${escapeHtml(day.date)}</strong><span>${escapeHtml(day.city)}</span></button>`).join('')}
      </div>
      <div class="day-panel reveal" id="day-panel">${renderDay(data.days[0], 0)}</div>
    </section>

    <section class="transport-band">
      <div class="section transport-inner">
        <div class="transport-copy reveal">
          <p class="eyebrow">GETTING AROUND</p>
          <h2>换城之间，<br>尽量简单。</h2>
          <p>长距离交给飞机或高铁，抵达当天减少安排，为延误、吃饭和休息留出空间。</p>
        </div>
        <div class="transport-list reveal">
          ${data.transport.map((leg, index) => `
            <div class="transport-leg">
              <span>${String(index + 1).padStart(2, '0')}</span>
              <div><strong>${escapeHtml(leg.from)} → ${escapeHtml(leg.to)}</strong><p>${escapeHtml(leg.mode)} · ${escapeHtml(leg.time)}</p></div>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section guide-section" id="guide">
      <div class="section-heading reveal">
        <div><p class="eyebrow">TRAVEL GUIDE</p><h2>住、吃与准备</h2></div>
        <p>推荐区域比具体店名更稳定，也更方便根据预算和当时价格调整。</p>
      </div>
      <div class="guide-grid">
        <article class="guide-card reveal">
          <span class="guide-icon">住</span><h3>住宿区域</h3>
          ${data.stays.map(item => `<div class="guide-item"><strong>${escapeHtml(item[0])} · ${escapeHtml(item[1])}</strong><p>${escapeHtml(item[2])}</p></div>`).join('')}
        </article>
        <article class="guide-card reveal">
          <span class="guide-icon">食</span><h3>沿途风味</h3>
          ${data.foods.map(item => `<div class="guide-item"><strong>${escapeHtml(item[0])}</strong><p>${escapeHtml(item[1])}</p></div>`).join('')}
        </article>
        <article class="guide-card guide-card-dark reveal">
          <span class="guide-icon">备</span><h3>出发前确认</h3>
          <ol>${data.tips.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ol>
        </article>
      </div>
    </section>

    <section class="section next-trip reveal">
      <p class="eyebrow">KEEP SOME SPACE</p>
      <h2>计划负责指路，<br>旅途负责带来意外。</h2>
      <a class="button button-primary" href="./">查看其他旅行</a>
    </section>`;
}

function renderDay(day, index) {
  return `
    <div class="day-number"><span>DAY</span><strong>${String(index + 1).padStart(2, '0')}</strong></div>
    <div class="day-content">
      <div class="day-heading"><div><p class="eyebrow">${escapeHtml(day.label)}</p><h3>${escapeHtml(day.city)}</h3></div><div class="energy"><span>体力 ${day.energy}%</span><i><b style="width:${day.energy}%"></b></i></div></div>
      <p class="day-summary">${escapeHtml(day.summary)}</p>
      <div class="schedule-list">
        ${day.schedule.map((item, itemIndex) => `<div class="schedule-item"><time>${escapeHtml(item[0])}</time><span>${itemIndex + 1}</span><div><strong>${escapeHtml(item[1])}</strong><p>${escapeHtml(item[2])}</p></div></div>`).join('')}
      </div>
      <div class="day-notes"><p><span>住</span>${escapeHtml(day.stay)}</p><p><span>食</span>${day.food.map(escapeHtml).join(' · ')}</p></div>
    </div>`;
}

function bindDayTabs() {
  const tabs = document.querySelector('#day-tabs');
  const panel = document.querySelector('#day-panel');
  tabs?.addEventListener('click', event => {
    const button = event.target.closest('[data-day]');
    if (!button) return;
    const index = Number(button.dataset.day);
    tabs.querySelectorAll('[data-day]').forEach(tab => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    panel.classList.add('switching');
    window.setTimeout(() => {
      panel.innerHTML = renderDay(trip.days[index], index);
      panel.classList.remove('switching');
    }, 150);
  });
}

function observeReveals() {
  const items = document.querySelectorAll('.reveal:not(.visible)');
  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  items.forEach(item => observer.observe(item));
}
