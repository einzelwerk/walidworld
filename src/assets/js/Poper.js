import { createPopper } from '@popperjs/core';

function initTooltip(trigger) {
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
}

const tooltipTrigger = document.querySelectorAll('[data-tooltip-trigger]');

tooltipTrigger.forEach((trigger) => {
  initTooltip(trigger);
});

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      console.log(1)
      if (node.nodeType === Node.ELEMENT_NODE && node.matches('[data-tooltip-trigger]')) {
        initTooltip(node);
      }
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });



