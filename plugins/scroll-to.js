export default (context, inject) => {
  const to = (id) => {
    if (id === 'top' || id === 'home' || id === '/' || id === '#' || id === '') {
      setTimeout(()=> {
        window.scrollTo(0, 1);
      }, 0);
    } else {
      const el = document.getElementById(id);
      if (el) {el.scrollIntoView(true)}
    }
  }
  // Inject $scrollTo(to) in Vue, context and store.
  inject('scrollTo', to)
}
