export default (context, inject) => {
  const params = (item, ...arr) => {
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
  inject('setProperty', params)
}
