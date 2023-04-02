/* eslint-disable no-shadow */
class CustomSelect {
  constructor(triggerClass, triggerElements) {
    this.triggerClass = triggerClass;
    this.triggerElements = triggerElements;

    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.closest(this.triggerClass)) {
        this.toggleSelect(e);
      } else if (!e.target.closest('.custom-select-wrapper') || e.target.closest('.js-close-select')) {
        this.closeSelect(e);
      }
    });

    document.addEventListener('input', (e) => {
      if (e.target.closest('input[type="radio"]')) {
        this.closeSelect(e);
        e.target.closest('.custom-select-wrapper').querySelector('.custom-select__placeholder span').innerHTML = e.target
          .closest('.checkbox-list__label')
          .querySelector('.checkbox-list__text').innerHTML;
      }
    });
  }

  toggleSelect(e) {
    const content = e.target.closest('.custom-select-wrapper').querySelector(this.triggerElements);
    const trigger = e.target.closest('.custom-select-wrapper').querySelector(this.triggerClass);

    trigger.setAttribute('aria-expanded', `${!(trigger.getAttribute('aria-expanded') === 'true')}`);
    content.setAttribute('aria-hidden', `${!(content.getAttribute('aria-hidden') === 'true')}`);

    const allContents = document.querySelectorAll(this.triggerElements);
    const allTriggers = document.querySelectorAll(this.triggerClass);

    allContents.forEach((content) => {
      if (content !== e.target.closest('.custom-select-wrapper').querySelector(this.triggerElements)) {
        content.setAttribute('aria-hidden', true);
      }
    });

    allTriggers.forEach((trigger) => {
      if (trigger !== e.target.closest('.custom-select-wrapper').querySelector(this.triggerClass)) {
        trigger.setAttribute('aria-expanded', false);
      }
    });

    if (!e.target.closest('.custom-select--secondary') && window.matchMedia('(max-width: 768px)').matches && !e.target.closest('[data-modal]')) {
      document.querySelector('.background-blur').classList.toggle('is-open');
    }
  }

  closeSelect(e) {
    const content = document.querySelectorAll(this.triggerElements);
    const trigger = document.querySelectorAll(this.triggerClass);
    content.forEach((elem) => {
      elem.setAttribute('aria-hidden', true);
    });
    trigger.forEach((elem) => {
      elem.setAttribute('aria-expanded', false);
    });
    if (window.matchMedia('(max-width:768px)').matches || !e.target.closest('[data-modal]')) {
      document.querySelector('.background-blur').classList.remove('is-open');
    }
  }

  openSelect(e) {
    const content = e.target.closest('.custom-select-wrapper').querySelector(this.triggerElements);
    const trigger = e.target.closest('.custom-select-wrapper').querySelector(this.triggerClass);

    trigger.setAttribute('aria-expanded', true);
    content.setAttribute('aria-hidden', false);
    content.querySelector('input').focus();
  }
}

// eslint-disable-next-line no-unused-vars
const toggle = new CustomSelect('.custom-select', '.custom-select__content');

const modal = document.querySelectorAll('[data-select]');

modal.forEach((elem) => {
  const val = elem.dataset.select;

  // eslint-disable-next-line no-unused-vars
  const select = new CustomSelect(`[data-select="${val}"]`, `[data-select-el="${val}"]`);
});
