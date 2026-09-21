import { trips } from './trips.js';

const timeline = document.querySelector('#trip-timeline');
const yearFilter = document.querySelector('#year-filter');
const tripCount = document.querySelector('#trip-count');
const cityCount = document.querySelector('#city-count');
const formatter = new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric' });

const sortedTrips = [...trips].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
const years = [...new Set(sortedTrips.map(trip => new Date(trip.startDate).getFullYear()))];
let activeYear = '全部';

function formatRange(trip) {
  const start = new Date(`${trip.startDate}T00:00:00`);
  const end = new Date(`${trip.endDate}T00:00:00`);
  return `${start.getFullYear()} · ${formatter.format(start)} — ${formatter.format(end)}`;
}

function renderFilters() {
  yearFilter.innerHTML = ['全部', ...years].map(year => `
    <button class="filter-button ${String(year) === String(activeYear) ? 'active' : ''}" data-year="${year}">${year === '全部' ? '全部计划' : `${year} 年`}</button>
  `).join('');
}

function renderTimeline() {
  const visible = activeYear === '全部'
    ? sortedTrips
    : sortedTrips.filter(trip => String(new Date(trip.startDate).getFullYear()) === String(activeYear));

  timeline.innerHTML = visible.map((trip, index) => `
    <article class="timeline-item reveal ${trip.palette}" style="--delay:${index * 80}ms">
      <div class="timeline-date">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <time datetime="${trip.startDate}">${formatRange(trip)}</time>
      </div>
      <a class="trip-card" href="./trip.html?id=${trip.id}" aria-label="查看${trip.title}旅行计划">
        <div class="trip-cover">
          <img src="${trip.cover}" alt="${trip.title}封面" width="1536" height="1024">
          <span class="trip-mood">${trip.mood}</span>
        </div>
        <div class="trip-card-body">
          <div class="trip-title-row">
            <div>
              <p class="eyebrow">${trip.route.join(' · ')}</p>
              <h3>${trip.title}</h3>
            </div>
            <span class="round-arrow" aria-hidden="true">↗</span>
          </div>
          <p class="trip-subtitle">${trip.subtitle}</p>
          <p class="trip-summary">${trip.overview}</p>
          <div class="trip-meta">
            <span>${trip.duration}</span>
            <span>${trip.start}出发</span>
            <span>${trip.route.length} 座目的地</span>
          </div>
        </div>
      </a>
    </article>
  `).join('');
  observeReveals();
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
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

yearFilter.addEventListener('click', event => {
  const button = event.target.closest('[data-year]');
  if (!button) return;
  activeYear = button.dataset.year;
  renderFilters();
  renderTimeline();
});

tripCount.textContent = String(trips.length);
cityCount.textContent = String(new Set(trips.flatMap(trip => trip.route)).size);
renderFilters();
renderTimeline();
observeReveals();
