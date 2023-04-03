const servicesCards = document.querySelectorAll('.tool-content__section ');

const callback = (entries) => {
  entries.forEach((entry) => {
    const elem = entry;
    console.log(elem.isVisible);
    if (elem.isIntersecting) {
      const { target } = elem;
      document.querySelectorAll('.tool-nav__link').forEach((el) => {
        el.classList.remove('tool-nav__link--current');
      });
      document.querySelector(`.tool-nav__link[data-id="${target.id}"]`).classList.add('tool-nav__link--current');
    }
  });
};

const options = {
  root: null,
  threshold: 0,
};

const observer = new IntersectionObserver(callback, options);

servicesCards.forEach((elem) => observer.observe(elem));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior

    // Scroll to section with smooth behavior
    const sectionId = anchor.getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
