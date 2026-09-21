const safeItems = items => Array.isArray(items) ? items : [];

function renderRouteCards(container, stops) {
  if (!container) return;
  container.innerHTML = safeItems(stops).map((stop, index) => `
    <article class="group relative overflow-hidden rounded-3xl ${stop.color} p-6 transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div class="flex items-start justify-between">
        <span class="grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-2xl"><i class="${stop.icon}"></i></span>
        <span class="font-serif text-4xl font-bold text-ink/10">0${index + 1}</span>
      </div>
      <p class="mt-8 text-xs font-bold tracking-[0.18em] text-ink/45">${stop.date}</p>
      <h3 class="mt-2 text-xl font-bold">${stop.city}</h3>
      <p class="mt-1 text-sm text-ink/55">${stop.note}</p>
      ${index < stops.length - 1 ? '<i class="ri-arrow-right-line absolute bottom-6 right-6 text-xl text-ink/35 transition group-hover:translate-x-1"></i>' : ''}
    </article>
  `).join('');
}

function renderDateTabs(container, days, activeIndex) {
  if (!container) return;
  container.innerHTML = safeItems(days).map((day, index) => `
    <button data-day-index="${index}" role="tab" aria-selected="${index === activeIndex}" class="min-w-[112px] rounded-2xl border px-4 py-3 text-left transition ${index === activeIndex ? 'border-ink bg-ink text-white shadow-lg' : 'border-ink/10 bg-white/70 text-ink hover:border-moss/40 hover:bg-white'}">
      <span class="block text-xs opacity-60">${day.week}</span>
      <span class="mt-1 block text-lg font-bold">${day.date}</span>
      <span class="mt-1 block truncate text-xs opacity-70">${day.city}</span>
    </button>
  `).join('');
}

function renderDayDetail(container, day) {
  if (!container || !day) return;
  const schedule = safeItems(day.schedule);
  const foods = safeItems(day.food);
  container.innerHTML = `
    <article class="overflow-hidden rounded-[2rem] bg-white shadow-soft">
      <div class="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div class="relative min-h-[320px] lg:min-h-[590px]">
          <img src="${day.image}" alt="${day.city}旅行风景" class="absolute inset-0 h-full w-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"></div>
          <div class="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
            <span class="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">${day.label}</span>
            <h3 class="mt-4 font-serif text-3xl font-bold">${day.city}</h3>
            <p class="mt-3 max-w-md text-sm leading-7 text-white/80">${day.summary}</p>
          </div>
        </div>
        <div class="p-6 sm:p-9">
          <div class="mb-7 flex items-center justify-between">
            <div><p class="text-xs font-bold tracking-[0.2em] text-moss">SLOW SCHEDULE</p><h3 class="mt-1 text-xl font-bold">今日节奏</h3></div>
            <div class="text-right"><p class="text-xs text-ink/45">体力消耗</p><p class="mt-1 font-bold text-moss">${day.energy}%</p></div>
          </div>
          <div class="space-y-1">
            ${schedule.map((item, index) => `
              <div class="grid grid-cols-[70px_38px_1fr] gap-3">
                <span class="pt-2 text-xs font-bold text-ink/45">${item.time}</span>
                <div class="flex flex-col items-center">
                  <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full ${day.theme} text-base"><i class="${item.icon}"></i></span>
                  ${index < schedule.length - 1 ? '<span class="h-full min-h-8 w-px bg-ink/10"></span>' : ''}
                </div>
                <div class="pb-6 pt-1"><h4 class="font-bold">${item.title}</h4><p class="mt-1 text-sm leading-6 text-ink/55">${item.desc}</p></div>
              </div>
            `).join('')}
          </div>
          <div class="mt-3 grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl bg-[#F8F6F0] p-4"><p class="text-xs font-bold text-ink/40">住哪里</p><p class="mt-2 text-sm font-semibold"><i class="ri-map-pin-2-line mr-1 text-sun"></i>${day.stay}</p></div>
            <div class="rounded-2xl bg-[#F8F6F0] p-4"><p class="text-xs font-bold text-ink/40">吃什么</p><p class="mt-2 text-sm font-semibold">${foods.join(' · ')}</p></div>
          </div>
          <div class="mt-3 rounded-2xl border border-sun/25 bg-sun/10 p-4 text-sm leading-6"><i class="ri-lightbulb-flash-line mr-2 text-sun"></i>${day.note}</div>
        </div>
      </div>
    </article>
  `;
}

function renderSlowRules(container, rules) {
  if (!container) return;
  container.innerHTML = safeItems(rules).map(rule => `
    <div class="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
      <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sun font-bold text-ink"><i class="${rule.icon}"></i></span>
      <div><h3 class="font-bold">${rule.title}</h3><p class="mt-1 text-sm leading-6 text-white/55">${rule.desc}</p></div>
    </div>
  `).join('');
}

function renderChecklist(container, items, checkedIds) {
  if (!container) return;
  container.innerHTML = safeItems(items).map(item => {
    const checked = checkedIds.has(item.id);
    return `
      <button data-check-id="${item.id}" class="flex items-center gap-3 rounded-2xl border p-4 text-left transition ${checked ? 'border-moss bg-sage/60' : 'border-ink/10 bg-white hover:border-moss/40'}" aria-pressed="${checked}">
        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl ${checked ? 'bg-moss text-white' : 'bg-sand text-ink'}"><i class="${checked ? 'ri-check-line' : item.icon}"></i></span>
        <span class="text-sm font-semibold ${checked ? 'line-through opacity-60' : ''}">${item.label}</span>
      </button>
    `;
  }).join('');
}

function renderOverview(container, days) {
  if (!container) return;
  container.innerHTML = safeItems(days).map(day => `
    <div class="flex items-center gap-4 rounded-2xl bg-white p-4">
      <div class="grid h-12 w-14 shrink-0 place-items-center rounded-xl ${day.theme} font-bold">${day.date}</div>
      <div class="min-w-0 flex-1"><h3 class="font-bold">${day.city}</h3><p class="mt-1 truncate text-sm text-ink/50">${day.label} · ${day.schedule[0].title}</p></div>
      <i class="ri-arrow-right-s-line text-xl text-ink/25"></i>
    </div>
  `).join('');
}
const safe = value => Array.isArray(value) ? value : [];

function renderAttractionFilters(container, activeCity) {
  if (!container) return;
  const cities = ['全部', '昆明', '丽江', '长沙'];
  container.innerHTML = cities.map(city => `
    <button data-attraction-city="${city}" class="rounded-full px-5 py-2 text-sm font-semibold transition ${city === activeCity ? 'bg-ink text-white shadow-lg' : 'bg-white text-ink/60 hover:text-ink'}">${city}</button>
  `).join('');
}

function renderAttractions(container, items, activeCity) {
  if (!container) return;
  const filtered = activeCity === '全部' ? safe(items) : safe(items).filter(item => item.city === activeCity);
  container.innerHTML = filtered.map(item => `
    <article class="flex h-full flex-col rounded-3xl border border-ink/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div class="flex items-start justify-between gap-3">
        <span class="grid h-12 w-12 place-items-center rounded-2xl bg-sage text-2xl text-moss"><i class="${item.icon}"></i></span>
        <div class="flex gap-2"><span class="rounded-full bg-sand px-3 py-1 text-xs font-bold">${item.city}</span><span class="rounded-full bg-sun/15 px-3 py-1 text-xs font-bold text-[#9A5F2A]">${item.badge}</span></div>
      </div>
      <h3 class="mt-5 font-serif text-xl font-bold">${item.name}</h3>
      <p class="mt-1 text-xs font-semibold text-moss"><i class="ri-time-line mr-1"></i>建议停留 ${item.duration}</p>
      <p class="mt-4 flex-1 text-sm leading-7 text-ink/60">${item.intro}</p>
      <div class="mt-4 flex flex-wrap gap-2">${safe(item.highlights).map(tag => `<span class="rounded-lg bg-[#F8F6F0] px-2.5 py-1 text-xs text-ink/55">${tag}</span>`).join('')}</div>
      <details class="group mt-5 border-t border-ink/10 pt-4">
        <summary class="flex cursor-pointer list-none items-center justify-between text-sm font-bold"><span>交通与预约细节</span><i class="ri-add-line text-lg transition group-open:rotate-45"></i></summary>
        <div class="mt-4 space-y-3 text-sm leading-6">
          <p class="rounded-xl bg-[#F8F6F0] p-3"><i class="ri-route-line mr-2 text-moss"></i>${item.transit}</p>
          <p class="rounded-xl bg-sun/10 p-3"><i class="ri-calendar-check-line mr-2 text-sun"></i>${item.booking}</p>
        </div>
      </details>
    </article>
  `).join('');
}

function renderTransport(container, legs) {
  if (!container) return;
  container.innerHTML = safe(legs).map((leg, index) => `
    <div class="relative grid grid-cols-[44px_1fr] gap-4 pb-7 last:pb-0">
      <div class="flex flex-col items-center"><span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-lg text-white"><i class="${leg.icon}"></i></span>${index < legs.length - 1 ? '<span class="mt-2 h-full min-h-8 w-px bg-ink/15"></span>' : ''}</div>
      <div class="rounded-2xl bg-white p-5 shadow-sm">
        <div class="flex flex-wrap items-center gap-2"><h3 class="font-bold">${leg.from} <i class="ri-arrow-right-line mx-1 text-ink/30"></i> ${leg.to}</h3><span class="rounded-full bg-sage px-2.5 py-1 text-xs font-bold text-moss">${leg.mode} · ${leg.time}</span></div>
        <p class="mt-2 text-sm leading-6 text-ink/55">${leg.detail}</p>
      </div>
    </div>
  `).join('');
}

function renderBookingGuide(container, items) {
  if (!container) return;
  container.innerHTML = safe(items).map(item => `
    <article class="rounded-3xl ${item.color} p-6">
      <div class="flex items-start justify-between gap-3"><span class="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-xl"><i class="${item.icon}"></i></span><span class="rounded-full bg-white/60 px-3 py-1 text-xs font-bold">${item.level}</span></div>
      <h3 class="mt-5 text-lg font-bold">${item.title}</h3>
      <p class="mt-1 text-xs font-bold text-ink/50"><i class="ri-alarm-line mr-1"></i>${item.deadline}</p>
      <ol class="mt-4 space-y-2">${safe(item.steps).map((step, index) => `<li class="flex gap-2 text-sm leading-6"><span class="font-bold text-moss">${index + 1}.</span><span>${step}</span></li>`).join('')}</ol>
      <p class="mt-4 border-t border-ink/10 pt-4 text-xs leading-6 text-ink/55">${item.note}</p>
    </article>
  `).join('');
}

function renderHotels(container, items) {
  if (!container) return;
  container.innerHTML = safe(items).map(item => `
    <article class="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div class="flex items-start justify-between gap-4 border-b border-ink/5 p-6">
        <div><span class="text-xs font-bold tracking-[0.15em] text-moss">${item.city}</span><h3 class="mt-2 font-serif text-xl font-bold">${item.area}</h3></div>
        <span class="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">${item.best}</span>
      </div>
      <div class="p-6">
        <p class="text-sm leading-7 text-ink/60">${item.reason}</p>
        <div class="mt-5 space-y-3">${safe(item.picks).map(pick => `<div class="rounded-2xl bg-[#F8F6F0] p-4"><div class="flex flex-wrap items-center justify-between gap-2"><h4 class="text-sm font-bold">${pick.name}</h4><span class="rounded-full bg-sage px-2 py-1 text-[11px] font-bold text-moss">${pick.type}</span></div><p class="mt-2 text-xs leading-5 text-ink/50">${pick.why}</p></div>`).join('')}</div>
        <p class="mt-4 text-xs leading-6 text-[#9A5F2A]"><i class="ri-error-warning-line mr-1"></i>${item.caution}</p>
      </div>
    </article>
  `).join('');
}

function renderFoodFilters(container, activeCity) {
  if (!container) return;
  container.innerHTML = ['昆明', '丽江', '长沙'].map(city => `<button data-food-city="${city}" class="rounded-full px-5 py-2 text-sm font-semibold transition ${city === activeCity ? 'bg-sun text-ink shadow-lg' : 'bg-white text-ink/60 hover:text-ink'}">${city}</button>`).join('');
}

function renderFoods(container, items, activeCity) {
  if (!container) return;
  const filtered = safe(items).filter(item => item.city === activeCity);
  container.innerHTML = filtered.map(item => `
    <article class="rounded-3xl border border-ink/5 bg-white p-5 transition hover:-translate-y-1 hover:shadow-soft">
      <div class="flex items-start justify-between"><span class="grid h-11 w-11 place-items-center rounded-2xl bg-sun/15 text-xl text-[#A8652E]"><i class="${item.icon}"></i></span><span class="text-xs font-bold text-ink/35">${item.meal}</span></div>
      <h3 class="mt-4 text-lg font-bold">${item.name}</h3>
      <p class="mt-2 text-sm leading-6 text-ink/55">${item.desc}</p>
      <div class="mt-4 flex items-center justify-between gap-3 border-t border-ink/5 pt-3 text-xs"><span class="truncate text-ink/45"><i class="ri-map-pin-line mr-1"></i>${item.area}</span><span class="shrink-0 font-bold text-moss">${item.spicy}</span></div>
    </article>
  `).join('');
}

const elements = {
  routeCards: document.querySelector('#route-cards'),
  dateTabs: document.querySelector('#date-tabs'),
  dayDetail: document.querySelector('#day-detail'),
  attractionFilters: document.querySelector('#attraction-filters'),
  attractionGrid: document.querySelector('#attraction-grid'),
  transportList: document.querySelector('#transport-list'),
  bookingGrid: document.querySelector('#booking-grid'),
  hotelGrid: document.querySelector('#hotel-grid'),
  foodFilters: document.querySelector('#food-filters'),
  foodGrid: document.querySelector('#food-grid'),
  slowRules: document.querySelector('#slow-rules'),
  checklist: document.querySelector('#checklist'),
  progress: document.querySelector('#check-progress'),
  sceneImage: document.querySelector('#scene-image'),
  randomMoment: document.querySelector('#random-moment'),
  toast: document.querySelector('#toast'),
  openOverview: document.querySelector('#open-overview'),
  closeOverview: document.querySelector('#close-overview'),
  overviewModal: document.querySelector('#overview-modal'),
  overviewList: document.querySelector('#overview-list')
};

const state = {
  activeDay: 0,
  attractionCity: '全部',
  foodCity: '昆明',
  checked: new Set(readCheckedItems())
};

const slowMoments = [
  '今天允许自己在湖边多坐二十分钟。',
  '看到喜欢的小店就进去，不必赶下一个景点。',
  '累了就打车，旅行不是体能测试。',
  '错过一个景点，也会遇见另一段风景。',
  '给手机放个假，抬头看看云和屋檐。'
];

function readCheckedItems() {
  try {
    const stored = JSON.parse(localStorage.getItem('slow-trip-checklist') || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function saveCheckedItems() {
  try {
    localStorage.setItem('slow-trip-checklist', JSON.stringify([...state.checked]));
  } catch {
    showToast('当前浏览器未开放本地存储，本次勾选仍可正常使用。');
  }
}

function updateProgress() {
  if (elements.progress) elements.progress.textContent = `${state.checked.size}/${checklist.length}`;
}

function selectDay(index, shouldScroll = false) {
  if (!Number.isInteger(index) || index < 0 || index >= days.length) return;
  state.activeDay = index;
  renderDateTabs(elements.dateTabs, days, state.activeDay);
  renderDayDetail(elements.dayDetail, days[state.activeDay]);
  bindDateTabs();
  if (shouldScroll && elements.dayDetail) elements.dayDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function bindDateTabs() {
  elements.dateTabs?.querySelectorAll('[data-day-index]').forEach(button => {
    button.addEventListener('click', () => selectDay(Number(button.dataset.dayIndex)));
  });
}

function selectAttractionCity(city) {
  state.attractionCity = city;
  renderAttractionFilters(elements.attractionFilters, city);
  renderAttractions(elements.attractionGrid, attractions, city);
}

function bindAttractionFilters() {
  elements.attractionFilters?.addEventListener('click', event => {
    const button = event.target.closest('[data-attraction-city]');
    if (button) selectAttractionCity(button.dataset.attractionCity);
  });
}

function selectFoodCity(city) {
  state.foodCity = city;
  renderFoodFilters(elements.foodFilters, city);
  renderFoods(elements.foodGrid, foodGuide, city);
}

function bindFoodFilters() {
  elements.foodFilters?.addEventListener('click', event => {
    const button = event.target.closest('[data-food-city]');
    if (button) selectFoodCity(button.dataset.foodCity);
  });
}

function bindChecklist() {
  elements.checklist?.addEventListener('click', event => {
    const button = event.target.closest('[data-check-id]');
    if (!button) return;
    const id = button.dataset.checkId;
    state.checked.has(id) ? state.checked.delete(id) : state.checked.add(id);
    saveCheckedItems();
    renderChecklist(elements.checklist, checklist, state.checked);
    updateProgress();
  });
}

let toastTimer;
function showToast(message) {
  if (!elements.toast) return;
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.remove('translate-y-8', 'opacity-0');
  toastTimer = setTimeout(() => elements.toast.classList.add('translate-y-8', 'opacity-0'), 2800);
}

function openModal() {
  if (!elements.overviewModal) return;
  elements.overviewModal.classList.remove('hidden');
  elements.overviewModal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
  elements.closeOverview?.focus();
}

function closeModal() {
  if (!elements.overviewModal) return;
  elements.overviewModal.classList.add('hidden');
  elements.overviewModal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
  elements.openOverview?.focus();
}

function bindModal() {
  elements.openOverview?.addEventListener('click', openModal);
  elements.closeOverview?.addEventListener('click', closeModal);
  elements.overviewModal?.addEventListener('click', event => {
    if (event.target === elements.overviewModal) closeModal();
  });
  elements.overviewList?.addEventListener('click', event => {
    const card = event.target.closest('[data-overview-index]');
    if (!card) return;
    closeModal();
    selectDay(Number(card.dataset.overviewIndex), true);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !elements.overviewModal?.classList.contains('hidden')) closeModal();
  });
}

function makeOverviewInteractive() {
  elements.overviewList?.querySelectorAll(':scope > div').forEach((card, index) => {
    card.dataset.overviewIndex = String(index);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.classList.add('cursor-pointer', 'transition', 'hover:-translate-y-0.5', 'hover:shadow-md');
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') card.click();
    });
  });
}

function startSceneRotation() {
  const sceneImages = [
    './images/bb6f3c6522f271d9.jpg',
    './images/0c5d8a61d10321f1.jpg',
    './images/a5f34d4ffa83dbf5.jpg'
  ];
  let sceneIndex = 0;
  setInterval(() => {
    if (!elements.sceneImage || document.hidden) return;
    sceneIndex = (sceneIndex + 1) % sceneImages.length;
    elements.sceneImage.classList.add('opacity-60');
    setTimeout(() => {
      elements.sceneImage.src = sceneImages[sceneIndex];
      elements.sceneImage.classList.remove('opacity-60');
    }, 250);
  }, 5000);
}

function init() {
  renderRouteCards(elements.routeCards, routeStops);
  renderTransport(elements.transportList, transportLegs);
  renderBookingGuide(elements.bookingGrid, bookingGuide);
  renderHotels(elements.hotelGrid, hotelAreas);
  renderSlowRules(elements.slowRules, slowRules);
  renderChecklist(elements.checklist, checklist, state.checked);
  renderOverview(elements.overviewList, days);
  selectDay(0);
  selectAttractionCity('全部');
  selectFoodCity('昆明');
  updateProgress();
  bindAttractionFilters();
  bindFoodFilters();
  bindChecklist();
  bindModal();
  makeOverviewInteractive();
  startSceneRotation();
  elements.randomMoment?.addEventListener('click', () => showToast(slowMoments[Math.floor(Math.random() * slowMoments.length)]));
}

init();
