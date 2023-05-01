import { createPopper } from '@popperjs/core';

const allTooltips = document.querySelectorAll('[data-tooltip]');
const modifiers = [
  {
    name: 'offset',
    options: {
      offset: [0, 8],
    },
  },
];

function initializePopper(trigger, tooltip) {
  const popperInstance = createPopper(trigger, tooltip, {
    placement: trigger.dataset.tooltipPlacement || 'right',
    modifiers,
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

  return { popperInstance, toggle, hide };
}

const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.matches('[data-tooltip-trigger]')) {
          const tooltip = document.querySelector(`[data-tooltip="${node.dataset.tooltipTrigger}"]`);
          const { toggle, hide } = initializePopper(node, tooltip);
          node.addEventListener('click', toggle);
          document.addEventListener('click', (e) => {
            if (!e.target.closest('.share')) {
              hide();
            }
          });
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });


