if (!module.parent) {
  var
    wru = require("wru"),
    fs = require("fs"),
    path = require("path"),
    spawn = require('child_process').spawn,
    webfDBPath = path.join(process.env.HOME, ".webf"),
    webfPath = path.join(__dirname, "../build", "webf"),
    bin = process.argv[2] || "polpetta",
    binFolder = bin == "polpetta" ? "build" : "bin",
    program = path.join(__dirname, "../node_modules/" + bin + "/" + binFolder + "/" + bin),
    originalContent,
    testObject, testContent
  ;

  try {
    originalContent = fs.readFileSync(webfDBPath, "utf-8");
  } catch(o_O) {
    fs.writeFileSync(webfDBPath, originalContent = "{}", "utf-8");
  }

  update();

  function update() {
    testObject = JSON.parse(
      testContent = fs.readFileSync(webfDBPath, "utf-8")
    );
  }

  function exec() {
    var args = [].slice.call(arguments);
    return spawn(
      "node", [webfPath].concat(args), {
      stdio: [process.stdin, process.stdout, process.stderr]
    });
  }

  function getFolder() {
    return path.join(__dirname, ".." + path.sep).slice(0, -path.sep.length);
  }

  fs.writeFileSync(webfDBPath, testContent, "utf-8");

  wru.test([{
    name: "webf starts " + bin,
    test: function () {
      exec("start", program).on("close", wru.async(function () {
        update();
        wru.assert(bin + " as default namespace", bin in testObject);
        wru.assert("folder is there", testObject[bin] && getFolder() in testObject[bin]);
        var sub = testObject[bin][getFolder()];
        wru.assert(Object.keys(sub).length === 1);
        wru.assert(typeof sub[Object.keys(sub)[0]] == "number");
      }));
    }
  }, {
    name: "webf stops " + bin,
    test: function () {
      exec("stop", program).on("close", wru.async(function () {
        update();
        wru.assert("no more processes", testContent === '{"' + bin + '":{}}');
      }));
    }
  }, {
    name: "webf starts with specified port",
    test: function () {
      exec("start", program, "2902").on("close", wru.async(function () {
        update();
        wru.assert(bin + " as default namespace", bin in testObject);
        wru.assert("folder is there", testObject[bin] && getFolder() in testObject[bin]);
        var sub = testObject[bin][getFolder()];
        wru.assert(Object.keys(sub).length === 1);
        wru.assert(typeof sub[Object.keys(sub)[0]] == "number");
      }));
    }
  }, {
    name: "webf stops with " + bin + " argument too",
    test: function () {
      exec("stop", program).on("close", wru.async(function () {
        update();
        wru.assert("no more processes", testContent === '{"' + bin + '":{}}');
      }));
    }
  }, function putOriginalContentBack() {
    fs.writeFileSync(webfDBPath, originalContent, "utf-8");
    update();
    wru.assert("same content", testContent === originalContent);
  }]);
}