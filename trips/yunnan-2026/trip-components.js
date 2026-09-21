const safeItems = items => Array.isArray(items) ? items : [];

export function renderRouteCards(container, stops) {
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

export function renderDateTabs(container, days, activeIndex) {
  if (!container) return;
  container.innerHTML = safeItems(days).map((day, index) => `
    <button data-day-index="${index}" role="tab" aria-selected="${index === activeIndex}" class="min-w-[112px] rounded-2xl border px-4 py-3 text-left transition ${index === activeIndex ? 'border-ink bg-ink text-white shadow-lg' : 'border-ink/10 bg-white/70 text-ink hover:border-moss/40 hover:bg-white'}">
      <span class="block text-xs opacity-60">${day.week}</span>
      <span class="mt-1 block text-lg font-bold">${day.date}</span>
      <span class="mt-1 block truncate text-xs opacity-70">${day.city}</span>
    </button>
  `).join('');
}

export function renderDayDetail(container, day) {
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

export function renderSlowRules(container, rules) {
  if (!container) return;
  container.innerHTML = safeItems(rules).map(rule => `
    <div class="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
      <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sun font-bold text-ink"><i class="${rule.icon}"></i></span>
      <div><h3 class="font-bold">${rule.title}</h3><p class="mt-1 text-sm leading-6 text-white/55">${rule.desc}</p></div>
    </div>
  `).join('');
}

export function renderChecklist(container, items, checkedIds) {
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

export function renderOverview(container, days) {
  if (!container) return;
  container.innerHTML = safeItems(days).map(day => `
    <div class="flex items-center gap-4 rounded-2xl bg-white p-4">
      <div class="grid h-12 w-14 shrink-0 place-items-center rounded-xl ${day.theme} font-bold">${day.date}</div>
      <div class="min-w-0 flex-1"><h3 class="font-bold">${day.city}</h3><p class="mt-1 truncate text-sm text-ink/50">${day.label} · ${day.schedule[0].title}</p></div>
      <i class="ri-arrow-right-s-line text-xl text-ink/25"></i>
    </div>
  `).join('');
}
