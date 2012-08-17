
function clean(key) {
  if (!keys(nmsp[key]).length) {
    delete nmsp[key];
  }
}
