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
  const alerts = (key, {title, desc, color, centered, top, bottom, left, right} = {}) => {
    if (key === "success" || key === "cancel") {
      app.router.app.$children.find(data=>data.$el === document.getElementById("layout")).$refs.alerts.
        GenerateAlert(key, title, desc, color, centered, top, bottom, left, right);
    } else {
      throw new Error('Invalid key, try "success" or "cancel"')
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


  // load-cursor =========================================================================================================//
  const loadCursorStart = (el) => {
    document.documentElement.style.cursor = "progress";
    if (el) {
      typeof el === 'string' ? document.querySelectorAll(el).forEach(e => {e.style.pointerEvents = "none"})
      : el instanceof NodeList ? el.forEach(e => {e.style.pointerEvents = "none"})
      : el instanceof Node ? el.style.pointerEvents = "none"
      : console.error("You must use a node element or selector by string")
    } else if (el === '' || el === undefined || el === null) {
      throw new Error("You dont need pass value")
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
      throw new Error("You dont need pass value")
    }
  }
  // usage $loadCursorEnd(element)
  inject('loadCursorEnd', loadCursorEnd);
}
