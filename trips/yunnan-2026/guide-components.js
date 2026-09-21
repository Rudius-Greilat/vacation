const safe = value => Array.isArray(value) ? value : [];

export function renderAttractionFilters(container, activeCity) {
  if (!container) return;
  const cities = ['全部', '昆明', '丽江', '长沙'];
  container.innerHTML = cities.map(city => `
    <button data-attraction-city="${city}" class="rounded-full px-5 py-2 text-sm font-semibold transition ${city === activeCity ? 'bg-ink text-white shadow-lg' : 'bg-white text-ink/60 hover:text-ink'}">${city}</button>
  `).join('');
}

export function renderAttractions(container, items, activeCity) {
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

export function renderTransport(container, legs) {
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

export function renderBookingGuide(container, items) {
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

export function renderHotels(container, items) {
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

export function renderFoodFilters(container, activeCity) {
  if (!container) return;
  container.innerHTML = ['昆明', '丽江', '长沙'].map(city => `<button data-food-city="${city}" class="rounded-full px-5 py-2 text-sm font-semibold transition ${city === activeCity ? 'bg-sun text-ink shadow-lg' : 'bg-white text-ink/60 hover:text-ink'}">${city}</button>`).join('');
}

export function renderFoods(container, items, activeCity) {
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
