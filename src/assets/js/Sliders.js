/* eslint-disable import/no-unresolved */
import Swiper, { Mousewheel } from 'swiper';
import 'swiper/css';

// import breakpoints from '../utils/MatchMedia';

class Sliders {
  static aboutUs() {
    const root = document.querySelector('.js-gallery-slider');
    const sliderInstance = new Swiper(root, {
      modules: [Mousewheel],
      init: false,
      loop: true,
      slidesPerView: 1.2,
      spaceBetween: 20,
      centeredSlides: true,
      mousewheel: {
        forceToAxis: true,
        sensitivity: 0.3,
      },

      initialSlide: 3,

      breakpoints: {
        768: {
          slidesPerView: 4,
        },
      },
    });

    sliderInstance.init();
  }

  static toolGallery() {
    const roots = document.querySelectorAll('.js-tool-gallery');
    roots.forEach((root) => {
      const sliderInstance = new Swiper(root, {
        modules: [Mousewheel],
        init: false,

        slidesPerView: 1.2,
        spaceBetween: 20,

        mousewheel: {
          forceToAxis: true,
          sensitivity: 0.3,
        },

        breakpoints: {
          556: {
            slidesPerView: 2.6,
          },
          768: {
            slidesPerView: 3.6,
          },
        },
      });

      sliderInstance.init();
    });
  }
}

function slidersInit() {
  Sliders.aboutUs();
  Sliders.toolGallery();
}

document.addEventListener('DOMContentLoaded', () => {
  slidersInit();
});

window.addEventListener('resize', () => {
  setTimeout(() => {
    slidersInit();
  }, 1000);
});
