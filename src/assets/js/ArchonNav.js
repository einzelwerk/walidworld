const servicesCards = document.querySelectorAll('.tool-content__section ');

window.addEventListener('scroll', () => {
  servicesCards.forEach((elem) => {
    if (elem.getBoundingClientRect().top < 100) {
      document.querySelectorAll('.tool-nav__link').forEach((el) => {
        el.classList.remove('tool-nav__link--current');
      });
      document.querySelector(`.tool-nav__link[data-id="${elem.id}"]`).classList.add('tool-nav__link--current');
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = anchor.getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
