import { createPopper } from '@popperjs/core';

const tooltipTrigger = document.querySelectorAll('[data-tooltip-trigger]');
tooltipTrigger.forEach((trigger) => {
  const tooltip = document.querySelector(`[data-tooltip="${trigger.dataset.tooltipTrigger}"]`);

  const popperInstance = createPopper(trigger, tooltip, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  function show() {
    tooltip.setAttribute('data-show', '');
    popperInstance.update();
  }

  function hide() {
    tooltip.addEventListener('mouseleave', () => {
      setTimeout(() => {
        tooltip.removeAttribute('data-show');
      }, 100);
    });
  }

  const showEvents = ['mouseenter', 'focus'];
  const hideEvents = ['mouseleave', 'blur'];

  showEvents.forEach((event) => {
    trigger.addEventListener(event, show);
  });

  hideEvents.forEach((event) => {
    trigger.addEventListener(event, hide);
  });
});
