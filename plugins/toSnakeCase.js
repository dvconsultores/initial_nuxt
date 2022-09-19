export default (context, inject) => {
  const to = str =>
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('_');
  // Inject $toKebabCase(to) in Vue, context and store.
  inject('toKebabCase', to)
}
