import 'basicLightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import refs from './refs';
import notifications from './notifications';

refs.gallery.addEventListener('click', onGallery);

function onGallery(e) {
  if (e.target.nodeName !== 'IMG') return;

  const urlImage = e.target.dataset.largeImage;
  const altValue = e.target.alt;

  const instance = basicLightbox.create(
    `
    <img src="${urlImage}" alt="${altValue}"  >
`,
    {
      onShow(instance) {
        notifications.notice();
        refs.body.classList.add('modal-open');
        window.addEventListener('keydown', e => onPressKey(e, instance));
      },
      onClose(instance) {
        refs.body.classList.remove('modal-open');
        window.removeEventListener('keydown', e => onPressKey(e, instance));
      },
    },
  );
  instance.show();
}

function onPressKey(e, instance) {
  if (e.code === 'Escape') {
    instance.close();
  }
}
