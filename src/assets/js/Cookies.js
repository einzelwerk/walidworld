const element = document.querySelector('.cookies-banner');
const acceptButton = document.querySelector('.cookies-banner__accept');
const closeButton = document.querySelector('.cookies-banner__close');
const value = localStorage.getItem('cookie-banner');

if (element) {
  if (!value) {
    element.classList.add('active');
  }


  acceptButton.addEventListener('click', () => {
    localStorage.setItem('cookie-banner', 'true');
    element.remove();
  })

  closeButton.addEventListener('click', () => {
    element.remove();
  })
}