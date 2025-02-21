document.addEventListener('DOMContentLoaded', function() {
  const themeToggles = document.querySelectorAll('[data-bs-toggle="theme"]');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
    localStorage.setItem('theme', theme);

    // Update button visibility
    document.querySelectorAll('[data-bs-toggle="theme"]').forEach(btn => {
      if (btn.getAttribute('data-theme') === theme) {
        btn.style.display = 'none';
      } else {
        btn.style.display = 'flex';
      }
    });
  }

  // Initialize theme from localStorage, useful for page reloads and site navigation
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) setTheme(savedTheme);

  // Handle theme toggle clicks
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const theme = toggle.getAttribute('data-theme');
        setTheme(theme);
      });
  });
});
