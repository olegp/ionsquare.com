document.addEventListener('DOMContentLoaded', function() {
  const themeToggles = document.querySelectorAll('[data-bs-toggle="theme"]');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
    localStorage.setItem('ionsquare-theme', theme);

    // Update button visibility
    document.querySelectorAll('[data-bs-toggle="theme"]').forEach(btn => {
      if (btn.getAttribute('data-theme') === theme) {
        btn.style.display = 'none';
      } else {
        btn.style.display = 'flex';
      }
    });
  }

  // Handle theme toggle clicks
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const theme = toggle.getAttribute('data-theme');
        setTheme(theme);
      });
  });

  // Watch for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('ionsquare-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

    // Gets the system color scheme preference
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Initialize theme based on saved preference or system setting
  function initializeTheme() {
    const savedTheme = localStorage.getItem('ionsquare-theme');
    setTheme(savedTheme || getSystemTheme());
  }

  initializeTheme();
});
