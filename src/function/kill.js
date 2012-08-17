
function kill(port) {
  if (port in domain) {
    try {
      process.kill(domain[port]);
      console.log(
        "killed " + folder + " on port " + port
      );
    } catch(o_O) {}
    delete domain[port];
  }
}
