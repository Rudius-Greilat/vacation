import { routeStops, days, slowRules, checklist } from './trip-data.js';
import { attractions, transportLegs } from './guide-data.js';
import { bookingGuide, hotelAreas, foodGuide } from './stay-food-data.js';
import { renderRouteCards, renderDateTabs, renderDayDetail, renderSlowRules, renderChecklist, renderOverview } from './trip-components.js';
import { renderAttractionFilters, renderAttractions, renderTransport, renderBookingGuide, renderHotels, renderFoodFilters, renderFoods } from './guide-components.js';

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
    './assets/images/bb6f3c6522f271d9.jpg',
    './assets/images/0c5d8a61d10321f1.jpg',
    './assets/images/a5f34d4ffa83dbf5.jpg'
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
