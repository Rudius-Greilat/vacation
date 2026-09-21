// 主入口：渲染各模块 + 交互
import { routeCards, routeLine, days, hotels, foods, tips, budget } from './data.js';

// ---------- 1. 城市总览卡片 ----------
function renderRouteCards() {
  const el = document.getElementById('routeCards');
  el.innerHTML = routeCards.map((c, i) => `
    <article class="hover-lift bg-white rounded-2xl overflow-hidden shadow-sm border border-jade/10" data-reveal style="transition-delay:${i * 0.1}s">
      <div class="img-zoom h-48 relative">
        <img src="${c.img}" alt="${c.city}" class="w-full h-full object-cover" />
        <span class="absolute top-3 left-3 bg-jadeDark/90 text-cream text-xs px-3 py-1 rounded-full">${c.days}</span>
      </div>
      <div class="p-5">
        <h3 class="font-serif font-bold text-lg text-jadeDark">${c.city}</h3>
        <p class="text-sm text-ink/70 mt-2 leading-relaxed">${c.desc}</p>
        <div class="flex flex-wrap gap-2 mt-4">
          ${c.tags.map(t => `<span class="text-xs bg-sand text-jadeDark px-2.5 py-1 rounded-full">${t}</span>`).join('')}
        </div>
      </div>
    </article>`).join('');
}

// ---------- 2. 交通主线 ----------
function renderRouteLine() {
  const el = document.getElementById('routeLine');
  el.innerHTML = routeLine.map((r, i) => {
    const node = `
      <div class="flex flex-col items-center">
        <span class="w-12 h-12 rounded-full bg-jade text-white flex items-center justify-center font-serif font-bold shadow">${r.t}</span>
      </div>`;
    const arrow = i < routeLine.length - 1
      ? `<div class="flex flex-col items-center text-jade/70 px-1">
           <span class="text-lg">➜</span>
           <span class="text-xs text-ink/50 whitespace-nowrap">${routeLine[i + 1].d}</span>
         </div>`
      : '';
    return node + arrow;
  }).join('');
}

// ---------- 3. 每日时间轴 ----------
function renderTimeline() {
  const el = document.getElementById('timeline-list');
  const items = days.map((d, i) => {
    const left = i % 2 === 0;
    const card = `
      <div class="bg-white rounded-2xl shadow-sm border border-jade/10 overflow-hidden hover-lift">
        <div class="img-zoom h-44">
          <img src="${d.img}" alt="${d.title}" class="w-full h-full object-cover" />
        </div>
        <div class="p-5 text-left">
          <span class="inline-block bg-clay/10 text-clay text-xs font-bold px-3 py-1 rounded-full mb-2">${d.date}</span>
          <h3 class="font-serif font-bold text-lg text-jadeDark">${d.title}</h3>
          <p class="text-sm text-ink/70 mt-2 leading-relaxed"><span class="text-jade font-semibold">🚗 行程：</span>${d.move}</p>
          <div class="mt-4">
            <p class="text-sm font-bold text-jade mb-2 flex items-center gap-1">🏞️ 今日景点</p>
            <div class="space-y-2">
              ${d.spots.map((s, si) => `
                <div class="bg-sand/40 rounded-xl p-3 border-l-4 border-jade">
                  <div class="flex items-start justify-between gap-2">
                    <span class="font-bold text-jadeDark text-sm flex items-center gap-1.5">
                      <span class="inline-flex w-5 h-5 rounded-full bg-jade text-white text-[11px] items-center justify-center shrink-0">${si + 1}</span>
                      ${s.name}
                    </span>
                  </div>
                  <div class="flex flex-wrap gap-1.5 mt-2">
                    <span class="text-[11px] bg-jade/10 text-jadeDark px-2 py-0.5 rounded-full">⏱️ ${s.time}</span>
                    <span class="text-[11px] bg-clay/10 text-clay px-2 py-0.5 rounded-full">🎟️ ${s.ticket}</span>
                  </div>
                  <p class="text-xs text-ink/60 mt-1.5">💡 ${s.tip}</p>
                  ${s.transit ? `<p class="text-xs text-jadeDark/80 mt-1.5 bg-jade/5 rounded-md px-2 py-1.5">🚇 <span class="font-semibold">通勤：</span>${s.transit}</p>` : ''}
                </div>`).join('')}
            </div>
          </div>
          <p class="text-sm text-ink/70 mt-3"><span class="text-clay font-semibold">🍜 美食：</span>${d.food.join(' · ')}</p>
          <p class="text-sm text-ink/60 mt-3 bg-sand/50 rounded-lg px-3 py-2"><span class="font-semibold text-jadeDark">🏨 住宿：</span>${d.stay}</p>
        </div>
      </div>`;
    return `
      <div class="relative flex md:items-center mb-10 md:mb-14" data-reveal>
        <span class="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-gold ring-4 ring-cream z-10 mt-6 md:mt-0"></span>
        <div class="pl-12 md:pl-0 w-full md:w-1/2 ${left ? 'md:pr-12' : 'md:ml-auto md:pl-12'}">
          ${card}
        </div>
      </div>`;
  }).join('');
  el.innerHTML = `<div class="tl-line"></div>${items}`;
}

// ---------- 4. 酒店推荐 ----------
function renderHotels() {
  const el = document.getElementById('hotelGrid');
  const badgeColor = { '经济实惠': 'bg-jade/15 text-jadeDark', '舒适首选': 'bg-clay/15 text-clay', '品质享受': 'bg-gold/20 text-[#8a6a1f]' };
  el.innerHTML = hotels.map((h, i) => `
    <article class="hover-lift bg-white rounded-2xl overflow-hidden shadow-sm border border-jade/10" data-reveal style="transition-delay:${i * 0.1}s">
      <div class="img-zoom h-40 relative">
        <img src="${h.img}" alt="${h.city}" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"></div>
        <div class="absolute bottom-3 left-4 text-cream">
          <h3 class="font-serif font-bold text-xl">${h.city}</h3>
          <p class="text-xs text-cream/85">📍 ${h.area}</p>
        </div>
      </div>
      <div class="p-5 space-y-3">
        ${h.list.map(item => `
          <div class="border border-jade/10 rounded-xl p-3 hover:bg-sand/30 transition">
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-jadeDark text-sm">${item.name}</span>
              <span class="text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${badgeColor[item.level] || 'bg-jade/10 text-jadeDark'}">${item.level}</span>
            </div>
            <div class="flex items-center gap-2 mt-1.5">
              <span class="text-clay font-bold text-sm">${item.price}<span class="text-ink/40 font-normal text-xs"> /晚</span></span>
            </div>
            <p class="text-xs text-ink/60 mt-1">💡 ${item.tip}</p>
          </div>`).join('')}
      </div>
    </article>`).join('');
}

// ---------- 5. 美食地图 ----------
function renderFood() {
  const el = document.getElementById('foodGrid');
  el.innerHTML = foods.map((f, i) => `
    <article class="hover-lift bg-white rounded-2xl overflow-hidden shadow-sm border border-jade/10" data-reveal style="transition-delay:${i * 0.08}s">
      <div class="img-zoom h-44 relative">
        <img src="${f.img}" alt="${f.name}" class="w-full h-full object-cover" />
        <span class="absolute top-3 left-3 bg-clay text-white text-xs px-3 py-1 rounded-full">${f.city}</span>
      </div>
      <div class="p-5">
        <h3 class="font-serif font-bold text-lg text-jadeDark">${f.emoji} ${f.name}</h3>
        <p class="text-sm text-ink/70 mt-2 leading-relaxed">${f.desc}</p>
      </div>
    </article>`).join('');
}

// ---------- 5. 实用贴士 ----------
function renderTips() {
  const el = document.getElementById('tipsGrid');
  el.innerHTML = tips.map((t, i) => `
    <div class="bg-white/10 border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition" data-reveal style="transition-delay:${i * 0.1}s">
      <div class="text-3xl mb-3">${t.icon}</div>
      <h3 class="font-serif font-bold text-lg text-white">${t.title}</h3>
      <p class="text-sm text-cream/75 mt-2 leading-relaxed">${t.text}</p>
    </div>`).join('');
}

// ---------- 6. 预算 ----------
function renderBudget() {
  const body = document.getElementById('budgetBody');
  body.innerHTML = budget.map(b => `
    <tr class="border-b border-jade/10 hover:bg-sand/30 transition">
      <td class="py-3.5 px-5 font-medium">${b.item}</td>
      <td class="py-3.5 px-5 text-ink/60">${b.note}</td>
      <td class="py-3.5 px-5 text-right">${b.cost.toLocaleString()}</td>
    </tr>`).join('');
  const total = budget.reduce((s, b) => s + b.cost, 0);
  document.getElementById('budgetTotal').textContent = '约 ' + total.toLocaleString() + ' 元';
}

// ---------- 静态模式：直接显示全部内容（不依赖滚动） ----------
function initReveal() {
  document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
}

// ---------- 导航栏阴影 ----------
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) nav.classList.add('shadow-md');
    else nav.classList.remove('shadow-md');
  });
}

// ---------- 初始化 ----------
document.addEventListener('DOMContentLoaded', () => {
  renderRouteCards();
  renderRouteLine();
  renderTimeline();
  renderHotels();
  renderFood();
  renderTips();
  renderBudget();
  initReveal();
  initNavbar();
});
