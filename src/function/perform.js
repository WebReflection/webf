
function perform(magic) {
  domain = nmsp[folder] || (nmsp[folder] = {});
  switch (magic) {
    case "stop":
    case "burn":
      if (filteredFolder) {
        port ?
          kill(port) :
          keys(domain).forEach(kill)
        ;
      } else {
        keys(nmsp).forEach(function ($folder) {
          domain = nmsp[folder = $folder];
          (port ?
            keys(domain).filter(byPort) :
            keys(domain)
          ).forEach(kill);
        });
      }
      keys(nmsp).forEach(clean);
      save();
      break;
    case "start":
    case "cook":
      port && filteredFolder && kill(port);
      child = spawn(
        "node", [path.join(__dirname, program)].concat(args.slice(2)), {
        detached: true,
        stdio: ["ignore", fs.openSync(dbName, "a"), "ignore"]
      });
      port && (domain[port] = child.pid);
      child.unref();
      // watch is not stable yet in Windows
      // here a manual, greedy, watch replacement
      process.nextTick(watchReplacer);
      break;
    default:
      console.log([
        "chef [start|stop] [polpetta|serverdir] [path] [port]"
      ].join("\n"));
      break;
  }
}
