const servicesCards = document.querySelectorAll('.post-section[id]');

window.addEventListener('scroll', () => {
  servicesCards.forEach((elem) => {
    if (elem.getBoundingClientRect().top < 100) {
      document.querySelectorAll('.post-nav__link').forEach((el) => {
        el.classList.remove('post-nav__link--current');
      });
      document.querySelector(`.post-nav__link[data-id="${elem.id}"]`).classList.add('post-nav__link--current');
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
