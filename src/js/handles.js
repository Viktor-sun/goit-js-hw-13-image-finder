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
  imagesApiService.fetchImg().then(({ hits, totalHits }) => {
    if (hits.length === 0) notifications.error();
    else if (hits.length > 1) notifications.sucess();

    appendMarkup(hits);
    searchBtn.spinnerOff();
    loadMoreBtn.show();

    if (hits.length + 12 * (imagesApiService.page - 1) === totalHits) {
      notifications.alertEnd();
      loadMoreBtn.hide();
    }
    // =================================================================
    // для бесконечной загрузки
    if (hits.length + 12 * (imagesApiService.page - 1) !== totalHits) {
      io.observe(gallery.lastElementChild);
    }
    // =================================================================
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
      imagesApiService.fetchImg().then(({ hits, totalHits }) => {
        notifications.info();
        appendMarkup(hits);
        loadMoreBtn.spinnerOff();

        if (hits.length + 12 * (imagesApiService.page - 1) !== totalHits) {
          observer.observe(gallery.lastElementChild);
        } else {
          notifications.alertEnd();
          loadMoreBtn.hide();
        }
      });
      observer.unobserve(entry.target);
    }
  });
}

// =====================================================

export function onLoadMore() {
  loadMoreBtn.spinnerOn();
  imagesApiService.incrementPage();
  imagesApiService.fetchImg().then(({ hits, totalHits }) => {
    notifications.info();
    appendMarkup(hits);
    loadMoreBtn.spinnerOff();

    if (hits.length + 12 * (imagesApiService.page - 1) === totalHits) {
      notifications.alertEnd();
      loadMoreBtn.hide();
    }

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
