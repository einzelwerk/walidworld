class Modal {
  constructor(trigger, modal) {
    this.modal = modal;
    this.trigger = trigger;
    this.closeBtn = '.js-modal-close';
    this.state = false;
  }

  open() {
    document.querySelector(this.modal).setAttribute('aria-hidden', false);
    document.querySelector(this.modal).querySelector('.modal').classList.add('is-open');
    document.querySelector(this.modal).classList.add('is-open');

    this.state = true;
  }

  close() {
    document.querySelector(this.modal).setAttribute('aria-hidden', true);
    document.querySelector(this.modal).querySelector('.modal').classList.remove('is-open');
    document.querySelector(this.modal).classList.remove('is-open');

    this.state = false;
  }

  isOpen() {
    return this.state;
  }

  listener() {
    document.addEventListener('click', (e) => {
      if ((this.state && !e.target.closest('.modal')) || (this.state && e.target.closest(this.closeBtn))) {
        this.close();
      }
      if (!this.state && e.target.closest(this.trigger)) {
        this.open();
      }
    });
  }
}

const modal = document.querySelectorAll('[data-modal]');

const loginModal = new Modal('[data-modal]', '[data-modal-el="login-modal"]')



loginModal.listener()

window.loginModal = loginModal


modal.forEach((elem) => {
  const val = elem.dataset.modal;

  const modalInstance = new Modal(`[data-modal="${val}"]`, `[data-modal-el="${val}"]`);
  modalInstance.listener();
});
