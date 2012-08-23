
function watchReplacer() {
  var fl, out = fs.readFileSync(dbName, "utf-8");
  if (out !== dbStringified) {
    out = out.replace(dbStringified, "");
    console.log(out);
    fl = out.split(/\r\n|\r|\n/)[0];
    if (
      /:\/\/[^:]+:(\d+)\//.test(fl) ||
      /Serving [^\x0]*? on port (\d+)/.test(fl)
    ) {
      domain[RegExp.$1] = child.pid;
    }
    save();
  } else {
    process.nextTick(watchReplacer);
  }
}
