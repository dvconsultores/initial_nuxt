export default ({app}, inject) => {
  const params = (key, title, desc) =>
    app.router.app.$children[app.router.app.$children.findIndex(data=>data._uid === 11)].$refs.alerts.
      GenerateAlert(key, title, desc);
  // Inject $alert(key, title, desc) in Vue, context and store.
  inject('alert', params)
}
