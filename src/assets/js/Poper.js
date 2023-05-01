import { createPopper } from '@popperjs/core';

function popperInit() {
  const tooltipTrigger = document.querySelectorAll('[data-tooltip-trigger]');
  tooltipTrigger.forEach((trigger) => {
    const tooltip = document.querySelector(`[data-tooltip="${trigger.dataset.tooltipTrigger}"]`);
    const allTooltips = document.querySelectorAll('[data-tooltip]');
    const popperInstance = createPopper(trigger, tooltip, {
      placement: trigger.dataset.tooltipPlacement || 'right',
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
        allTooltips.forEach((t) => {
          t.removeAttribute('data-show');
        });
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

}

popperInit()