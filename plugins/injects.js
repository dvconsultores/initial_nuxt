export default ({app}, inject) => {
  // console-log =========================================================================================================//
  const log = (...msgs) => {
    msgs.forEach((msg, i) => {
      console.log(`${i+1}:`, msg);
    });
  }
  // usage $log(msg)
  inject('log', log);


  // alerts =========================================================================================================//
  const alerts = (key, {title, desc} = {}) => {
    if (key === "success" || key === "cancel") {
      app.router.app.$children.find(data=>data._name === '<DefaultLayout>').$refs.alerts.
        GenerateAlert(key, title, desc);
    } else {
      console.error('Invalid key, try "success" or "cancel"')
    }
  }
  // usage $alert(key, title, desc)
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
  // usage $scrollTo(id)
  inject('scrollTo', scrollTo);


  // set-properties =========================================================================================================//
  const setProperties = (item, ...arr) => {
    if (item.currentTarget) {
      arr.forEach(e => {
        const keys = Object.keys(e);
        const values = Object.values(e);
        item.currentTarget.style.setProperty(`--${keys}`, values)
      });
    } else if (item instanceof Node) {
      arr.forEach(e => {
        const keys = Object.keys(e);
        const values = Object.values(e);
        item.style.setProperty(`--${keys}`, values)
      });
    } else if (item instanceof NodeList) {
      arr.forEach(e => {
        const keys = Object.keys(e);
        const values = Object.values(e);
        item.forEach(e => {e.style.setProperty(`--${keys}`, values)})
      });
    }
    else {
      console.error("You must use event or node element to selector parameter");
    }
  }
  // $setProperty($event, {bg: 'green' }, {c: 'black'})
  // or
  // $setProperty($refs.element.$el, {bg: 'green' }, {c: 'black'})
  inject('setProperty', setProperties);


  // to-kedabcase =========================================================================================================//
  const toKedabCase = str =>
    str && str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('-');
  // usage $toKedabCase(string)
  inject('toKedabCase', toKedabCase);


  // to-snakecase =========================================================================================================//
  const toSnakeCase = str =>
  str && str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');
  // usage $toSnakeCase(string)
  inject('toSnakeCase', toSnakeCase);


  // load-cursor =========================================================================================================//
  const loadCursorStart = (el) => {
    document.documentElement.style.cursor = "progress";
    if (el) {
      typeof el === 'string' ? document.querySelectorAll(el).forEach(e => {e.style.pointerEvents = "none"})
      : el instanceof NodeList ? el.forEach(e => {e.style.pointerEvents = "none"})
      : el instanceof Node ? el.style.pointerEvents = "none"
      : console.error("You must use a node element or selector by string")
    } else if (el === '' || el === undefined || el === null) {
      console.error("You dont need pass value")
    }
  }
  // usage $loadCursorStart(element)
  inject('loadCursorStart', loadCursorStart);

  const loadCursorEnd = (el) => {
    document.documentElement.style.cursor = "initial";
    if (el) {
      typeof el === 'string' ? document.querySelectorAll(el).forEach(e => {e.style.pointerEvents = "all"})
      : el instanceof NodeList ? el.forEach(e => {e.style.pointerEvents = "all"})
      : el instanceof Node ? el.style.pointerEvents = "all"
      : console.error("You must use a node element or selector by string")
    } else if (el === '' || el === undefined || el === null) {
      console.error("You dont need pass value")
    }
  }
  // usage $loadCursorEnd(element)
  inject('loadCursorEnd', loadCursorEnd);
}
