import { createPopper } from '@popperjs/core';

function initPopper(trigger, tooltip) {
  const popperInstance = createPopper(trigger, tooltip, {
    placement: trigger.dataset.tooltipPlacement || 'bottom',
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

  function toggle() {
    if (tooltip.dataset.show === '') {
      tooltip.removeAttribute('data-show');
    } else {
      const allTooltips = document.querySelectorAll('[data-tooltip]');
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
}


const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      const newTooltips = document.querySelectorAll('[data-tooltip]');
      newTooltips.forEach((tooltip) => {
        if (!tooltip.getAttribute('data-tooltip-init')) {
          tooltip.setAttribute('data-tooltip-init', true);
          const trigger = document.querySelector(`[data-tooltip-trigger="${tooltip.dataset.tooltip}"]`);
          initPopper(trigger, tooltip);
        }
      });
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});




