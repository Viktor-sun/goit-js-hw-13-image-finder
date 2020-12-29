import 'material-design-icons/iconfont/material-icons.css';
import './styles.css';
import './scss/spinner-animation.scss';

import { onForm, onLoadMore } from './js/handles';
import refs from './js/refs';

refs.form.addEventListener('submit', onForm);
refs.loadMore.addEventListener('click', onLoadMore);
