(function() {
  // Gets the system color scheme preference
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Initialize theme based on saved preference or system setting
  function initializeTheme() {
    const savedTheme = localStorage.getItem('ionsquare-theme');
    window.setTheme(savedTheme || getSystemTheme());
  }

  initializeTheme();
})();
