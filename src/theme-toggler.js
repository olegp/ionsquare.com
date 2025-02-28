document.addEventListener('DOMContentLoaded', function() {
  const themeToggles = document.querySelectorAll('[data-bs-toggle="theme"]');

  function setButtonsVisibility(theme) {
    // The below class needed for tabler to correctly display the toggle button
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');

    themeToggles.forEach(toggle => {
      if (toggle.getAttribute('data-theme') === theme) {
        toggle.style.display = 'none';
      } else {
        toggle.style.display = 'flex';
      }
    });
  };

  function setInitialState() {
    const theme = localStorage.getItem('ionsquare-theme');
    setButtonsVisibility(theme);
  }

  // Handle theme toggle clicks
  themeToggles.forEach(toggle => {
    const theme = toggle.getAttribute('data-theme');

    toggle.addEventListener('click', () => {
      setButtonsVisibility(theme);
      window.setTheme(theme)
    });
  });

  setInitialState();
});
