export const state = () => ({
  theme: "light",
  overlay: { opacity: 0.2, color: "black" },
  user: {
    img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    perfil: "",
    initials: 'JD',
    fullName: 'John Doe',
    email: 'john.doe@doe.com',
    wallet: 'detextre4.testnet',
  },
});

export const mutations = {
  Avatar (state, avatar) {state.user.perfil = avatar},
  CambiarTheme(state, theme) {state.theme = theme},
  OverlayMethod(state, theme) {
    if (theme === "dark") {state.overlay.opacity = "0.5"; state.overlay.color = "black"}
    if (theme === "light") {state.overlay.opacity = "0.2"; state.overlay.color = "white"}
  },
};

export const actions = {
  CambiarTheme({commit}, theme) {
    document.getElementById("theme").href = `/themes/${theme}/theme.css`;
    localStorage.setItem("theme", theme);
    commit( "CambiarTheme", theme)
  },
};

export const getters = {
};
