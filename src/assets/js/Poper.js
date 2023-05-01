import { createPopper } from '@popperjs/core';

const allTooltips = document.querySelectorAll('[data-tooltip]');
const tooltipOptions = {
  placement: 'right',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 8],
      },
    },
  ],
};

// Функция, которая создает новый экземпляр Popper.js для переданных триггера и тултипа
function createPopperInstance(trigger, tooltip) {
  const popperInstance = createPopper(trigger, tooltip, tooltipOptions);
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
  return popperInstance;
}

// Создаем экземпляр Popper.js для всех элементов с атрибутом [data-tooltip-trigger]
const tooltipTrigger = document.querySelectorAll('[data-tooltip-trigger]');
tooltipTrigger.forEach((trigger) => {
  const tooltip = document.querySelector(`[data-tooltip="${trigger.dataset.tooltipTrigger}"]`);
  createPopperInstance(trigger, tooltip);
});

// Наблюдатель за изменениями в DOM
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.matches('[data-tooltip-trigger]')) {
          const tooltip = document.querySelector(`[data-tooltip="${node.dataset.tooltipTrigger}"]`);
          createPopperInstance(node, tooltip);
        }
      });
    }
  });
});

// Запускаем наблюдатель за изменениями в DOM
observer.observe(document.body, { childList: true, subtree: true });


