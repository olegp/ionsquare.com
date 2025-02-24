function setTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  localStorage.setItem('ionsquare-theme', theme);
}

window.setTheme = setTheme;
