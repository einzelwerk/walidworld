class ThemeSwitcher {
  constructor() {
    this.buttons = document.querySelectorAll('.theme-switcher');
    this.theme = localStorage.getItem('theme');
    this.root = document.documentElement
    this.initialize();
  }

  initialize() {
    if (this.buttons.length > 0) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
          this.setDark();
        } else {
          this.setLight();
        }
      });

      if (this.theme) {
        this.setTheme(this.theme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.setDark();
      } else {
        this.setLight();
      }

      Array.from(this.buttons).forEach(button => {
        button.addEventListener('click', () => this.toggleTheme());
      });
    }
  }

  toggleTheme() {
    if (this.root.classList.contains('dark')) {
      this.setLight();
    } else {
      this.setDark();
    }
  }

  setTheme(theme) {
    if (theme === 'dark') {
      this.setDark();
    } else {
      this.setLight();
    }
  }

  setDark() {
    this.root.classList.remove('light');
    this.root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    Array.from(this.buttons).forEach(button => {
      const btn = button.querySelector('span');
      button.setAttribute('aria-label', 'Activate light mode');
      const useElement = button.querySelector('svg use');
      useElement.setAttribute('href', 'sprite.svg#dark-theme_sprite');
      if (btn) {
        btn.innerHTML = 'Light';
      }
    });
  }

  setLight() {
    this.root.classList.remove('dark');
    this.root.classList.add('light');
    localStorage.setItem('theme', 'light');
    Array.from(this.buttons).forEach(button => {
      const btn = button.querySelector('span');

      button.setAttribute('aria-label', 'Activate dark mode');
      const useElement = button.querySelector('svg use');
      useElement.setAttribute('href', 'sprite.svg#light-theme_sprite');
      if (btn) {
        btn.innerHTML = 'Dark'
      }
    });
  }
}

// eslint-disable-next-line no-unused-vars
const themeSwitcher = new ThemeSwitcher();
