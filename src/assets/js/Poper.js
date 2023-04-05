import { createPopper } from '@popperjs/core';

const tooltipTrigger = document.querySelectorAll('[data-tooltip-trigger]');
tooltipTrigger.forEach((trigger) => {
  const tooltip = document.querySelector(`[data-tooltip="${trigger.dataset.tooltipTrigger}"]`);

  const popperInstance = createPopper(trigger, tooltip, {
    placement: 'right',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  function hide() {
    tooltip.removeAttribute('data-show');
  }

  // function show() {
  //   tooltip.setAttribute('data-show', '');
  //   popperInstance.update();
  // }

  function toggle() {
    if (tooltip.dataset.show === '') {
      tooltip.removeAttribute('data-show');
    } else {
      tooltip.setAttribute('data-show', '');
      popperInstance.update();
    }
  }

  trigger.addEventListener('click', toggle);
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.share')) {
      hide();
    }
  });
});
