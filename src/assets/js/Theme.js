
const button = document.querySelector('.theme-switcher');

function toggleTheme() {

  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'light');
    button.setAttribute('aria-label', 'Activate dark mode');
    button.querySelector('svg use').setAttribute('href', 'sprite.svg#light-theme_sprite');

  } else {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    localStorage.setItem('theme', 'dark');
    button.querySelector('svg use').setAttribute('href', 'sprite.svg#dark-theme_sprite');

  }
}

if (button) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  const theme = localStorage.getItem('theme');
  if (theme) {
    document.documentElement.classList.add(theme);
    button.querySelector('svg use').setAttribute('href', `sprite.svg#${theme}-theme_sprite`);

  }

  // Toggle theme



  // Toggle theme on click

  document.querySelector('.theme-switcher').addEventListener('click', () => toggleTheme());

}