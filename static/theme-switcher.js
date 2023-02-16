const THEMES = {
  DARK: "dark-theme",
  LIGHT: "light-theme",
  // ADD MORE IF NEEDED
};

function setTheme(theme) {
  const body = document.body;

  body.classList.remove(...body.classList);
  body.classList.add(theme);
}

window.onload = function () {
  // TODO: Set theme based on user preference.
  let currentTheme = THEMES.DARK;

  setTheme(currentTheme);
};
