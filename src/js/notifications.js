import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
import { defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import { alert, notice, info, success, error } from '@pnotify/core';
defaultModules.set(PNotifyMobile, {});

export default {
  sucess() {
    success({ title: 'Success search!' });
  },
  error() {
    error({ title: 'Not Found', text: 'Please enter again.' });
  },
  info() {
    info({ title: 'Please, more images.' });
  },
  notice() {
    notice({ title: 'Awesome big image.' });
  },
  alert() {
    alert({ title: 'Common search!' });
  },
};
