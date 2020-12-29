export default class LoadButton {
  constructor(selector) {
    this.button = this.getRefBtn(selector);
    this.text = this.button.textContent;
  }
  getRefBtn(selector) {
    return document.querySelector(selector);
  }
  show() {
    this.button.classList.remove('is-hiden');
  }
  hide() {
    this.button.classList.add('is-hiden');
  }
  spinnerOn() {
    this.button.disabled = true;
    this.button.classList.add('spinner');
    this.button.textContent = 'Loading...';
  }
  spinnerOff() {
    this.button.disabled = false;
    this.button.classList.remove('spinner');
    this.button.textContent = this.text;
  }
}
