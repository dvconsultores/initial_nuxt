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
  const scrollTo = id => {
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
  const loadCursor = key => {
    if (key === true) {
      document.documentElement.style.cursor = "progress";
      document.documentElement.style.pointerEvents = "none";
    } else if (key === false) {
      document.documentElement.style.cursor = "initial";
      document.documentElement.style.pointerEvents = "all";
    } else {
      throw new Error("You must to pass Boolean")
    }
  }
  // usage $loadCursor(boolean)
  inject('loadCursor', loadCursor);
}
