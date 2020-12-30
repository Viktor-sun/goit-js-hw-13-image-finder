import galleryTpl from '../templates/gallery-template.hbs';
import refs from './refs';
const { gallery } = refs;
import ImagesApiService from './api-service';
import LoadButton from './load-btn';
import notifications from './notifications';

const imagesApiService = new ImagesApiService();
const searchBtn = new LoadButton('.js-button');
const loadMoreBtn = new LoadButton('button[data-action="load-more"]');

export function onForm(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.query.value;
  if (imagesApiService.query === '') notifications.alert();

  searchBtn.spinnerOn();
  clearImgContainer();
  imagesApiService.resetPage();
  imagesApiService.fetchImg().then(hits => {
    if (hits.length === 0) notifications.error();
    else if (hits.length > 1) notifications.sucess();

    appendMarkup(hits);
    searchBtn.spinnerOff();
    loadMoreBtn.show();

    io.observe(gallery.lastElementChild); // для бесконечной загрузки
  });
  e.currentTarget.reset();
}

// ======================================================
// Бесконечная загрузка

const io = new IntersectionObserver(onEnter);

function onEnter(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadMoreBtn.spinnerOn();
      imagesApiService.incrementPage();
      imagesApiService.fetchImg().then(hits => {
        notifications.info();
        appendMarkup(hits);
        loadMoreBtn.spinnerOff();

        observer.observe(gallery.lastElementChild);
      });
      observer.unobserve(entry.target);
    }
  });
}

// =====================================================

export function onLoadMore() {
  loadMoreBtn.spinnerOn();
  imagesApiService.incrementPage();
  imagesApiService.fetchImg().then(hits => {
    notifications.info();
    appendMarkup(hits);
    loadMoreBtn.spinnerOff();

    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
}

function clearImgContainer() {
  gallery.innerHTML = '';
}

function appendMarkup(hits) {
  gallery.insertAdjacentHTML('beforeend', galleryTpl(hits));
}
