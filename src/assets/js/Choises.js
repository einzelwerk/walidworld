/* eslint-disable no-new */
import Choices from 'choices.js';

import 'choices.js/public/assets/styles/choices.min.css';

document.querySelectorAll('.js-custom-select').forEach((elem) => {
  new Choices(elem, {
    searchEnabled: false,
    position: 'bottom',
    itemSelectText: '',
    shouldSort: false,
    placeholder: true,
    classNames: {
      containerOuter: `custom-select choices `,
      containerInner: `custom-select__inner choices__inner `,
    },
  });
});

new Choices('.js-lang-select', {
  searchEnabled: false,
  position: 'bottom',
  itemSelectText: '',
  shouldSort: false,
  placeholder: true,
  classNames: {
    containerOuter: `lang-select choices `,
    containerInner: `lang-select__inner choices__inner `,
  },
});
