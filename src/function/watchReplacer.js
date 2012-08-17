
function watchReplacer() {
  var out = fs.readFileSync(dbName, "utf-8");
  if (out !== dbStringified) {
    out = out.replace(dbStringified, "");
    console.log(out);
    if (/:\/\/[^:]+:(\d+)\//.test(out.split(/\r\n|\r|\n/)[0])) {
      domain[RegExp.$1] = child.pid;
    }
    save();
  } else {
    process.nextTick(watchReplacer);
  }
}
