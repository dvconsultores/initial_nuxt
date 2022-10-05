export default ({app}, inject) => {
  // console-log =========================================================================================================//
  const log = (...msgs) => {
    msgs.forEach((msg, i) => {
      console.log(`${i+1}:`, msg);
    });
  }
  // Inject $log(msg) in Vue, context and store.
  inject('log', log);


  // alerts =========================================================================================================//
  const alerts = (key, title, desc) =>
    app.router.app.$children[app.router.app.$children.findIndex(data=>data._name === '<DefaultLayout>')].$refs.alerts.
      GenerateAlert(key, title, desc);
  // Inject $alert(key, title, desc) in Vue, context and store.
  inject('alert', alerts);


  // scroll-to =========================================================================================================//
  const scrollTo = (id) => {
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
  inject('scrollTo', scrollTo);


  // set-properties =========================================================================================================//
  const setProperties = (item, ...arr) => {
    if (item.currentTarget) {
      const el = item.currentTarget;
      arr.forEach(e => {
        const keys = Object.keys(e);
        const values = Object.values(e);
        el.style.setProperty(`--${keys}`, values)
      });
    } else if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
      console.error("You must use event or element for parameter");
    } else {
      arr.forEach(e => {
        const keys = Object.keys(e);
        const values = Object.values(e);
        item.style.setProperty(`--${keys}`, values)
      });
    }
  }
  // $setProperty($event, {bg: 'green' }, {c: 'black'})
  // or
  // $setProperty($refs.element.$el, {bg: 'green' }, {c: 'black'})
  inject('setProperty', setProperties);


  // to-kedabcase =========================================================================================================//
  const toKedabCase = str =>
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('-');
  // Inject $toKedabCase(to) in Vue, context and store.
  inject('toKedabCase', toKedabCase);

  // to-snakecase =========================================================================================================//
  const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');
  // Inject $toKebabCase(to) in Vue, context and store.
  inject('toKebabCase', toSnakeCase);
}
