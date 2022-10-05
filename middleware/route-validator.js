export default function ({app, route}) {
  setTimeout(() => {
    // If current layout
    switch (app.router.app.$data.layoutName) {
      case 'default': {
        const layout = app.router.app.$children.find(data=>data._name === '<DefaultLayout>');
        // If current route
        switch (route.path) {
          case "/":       // target rutes
            layout.wrapperSpace = false;
          break;
          default:        // the rest
            layout.wrapperSpace = true;
          break;
        }
      }
      break;
    }
  }, 100);
}
