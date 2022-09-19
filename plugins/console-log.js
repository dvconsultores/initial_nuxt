export default (context, inject) => {
  const log = (...msgs) => {
    msgs.forEach((msg, i) => {
      console.log(`${i+1}:`, msg);
    });
  }
  // Inject $log(msg) in Vue, context and store.
  inject('log', log)
}
