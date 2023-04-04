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

  function show() {
    tooltip.setAttribute('data-show', '');
    popperInstance.update();
  }

  function hide() {
    setTimeout(() => {
      const isTooltipHovered = tooltip.matches(':hover');
      const isTriggerHovered = trigger.matches(':hover');
      if (!isTooltipHovered && !isTriggerHovered) {
        tooltip.removeAttribute('data-show');
      }
    }, 100);
  }

  const showEvents = ['mouseenter', 'focus'];
  const hideEvents = ['mouseleave', 'blur'];

  showEvents.forEach((event) => {
    trigger.addEventListener(event, show);
  });

  hideEvents.forEach((event) => {
    trigger.addEventListener(event, hide);
  });

  tooltip.addEventListener('mouseenter', () => {
    tooltip.removeAttribute('data-show');
  });

  tooltip.addEventListener('mouseleave', () => {
    hide();
  });
});
