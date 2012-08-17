if (!module.parent) {
  var
    wru = require("wru"),
    fs = require("fs"),
    path = require("path"),
    spawn = require('child_process').spawn,
    webfDBPath = path.join(process.env.HOME, ".webf"),
    webfPath = path.join(__dirname, "../build", "webf"),
    originalContent,
    testContent = "{}"
  ;

  try {
    originalContent = fs.readFileSync(webfDBPath, "utf-8");
  } catch(o_O) {
    fs.writeFileSync(webfDBPath, originalContent = "{}", "utf-8");
  }

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
    name: "webf starts",
    test: function () {
      exec("start").on("close", wru.async(function () {
        update();
        wru.assert("polpetta as default namespace", "polpetta" in testObject);
        wru.assert("folder is there", testObject.polpetta && getFolder() in testObject.polpetta);
        var sub = testObject.polpetta[getFolder()];
        wru.assert(Object.keys(sub).length === 1);
        wru.assert(typeof sub[Object.keys(sub)[0]] == "number");
      }));
    }
  }, {
    name: "webf stops",
    test: function () {
      exec("stop").on("close", wru.async(function () {
        update();
        wru.assert("no more processes", testContent === '{"polpetta":{}}');
      }));
    }
  }, {
    name: "webf starts with polpetta argument too",
    test: function () {
      exec("start", "polpetta").on("close", wru.async(function () {
        update();
        wru.assert("polpetta as default namespace", "polpetta" in testObject);
        wru.assert("folder is there", testObject.polpetta && getFolder() in testObject.polpetta);
        var sub = testObject.polpetta[getFolder()];
        wru.assert(Object.keys(sub).length === 1);
        wru.assert(typeof sub[Object.keys(sub)[0]] == "number");
      }));
    }
  }, {
    name: "webf stops with polpetta argument too",
    test: function () {
      exec("stop", "polpetta").on("close", wru.async(function () {
        update();
        wru.assert("no more processes", testContent === '{"polpetta":{}}');
      }));
    }
  }, {
    name: "webf starts with specified port",
    test: function () {
      exec("start", "2902").on("close", wru.async(function () {
        update();
        wru.assert("polpetta as default namespace", "polpetta" in testObject);
        wru.assert("folder is there", testObject.polpetta && getFolder() in testObject.polpetta);
        var sub = testObject.polpetta[getFolder()];
        wru.assert(Object.keys(sub).length === 1);
        wru.assert(typeof sub[Object.keys(sub)[0]] == "number");
      }));
    }
  }, {
    name: "webf stops with polpetta argument too",
    test: function () {
      exec("stop", "polpetta").on("close", wru.async(function () {
        update();
        wru.assert("no more processes", testContent === '{"polpetta":{}}');
      }));
    }
  }, function putOriginalContentBack() {
    fs.writeFileSync(webfDBPath, originalContent, "utf-8");
    update();
    wru.assert("same content", testContent === originalContent);
  }]);
}