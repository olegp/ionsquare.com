(function() {
  // Gets the system color scheme preference
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Watch for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('ionsquare-theme')) {
      window.setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Initialize theme based on saved preference or system setting
  function initializeTheme() {
    const savedTheme = localStorage.getItem('ionsquare-theme');
    window.setTheme(savedTheme || getSystemTheme());
  }

  initializeTheme();
})();
