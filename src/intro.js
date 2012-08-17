#!/usr/bin/env node

/**
 * ---------------------------------------------------------
 *       webf :: non blocking launcher with daemon
 * ---------------------------------------------------------
 * @license   Mit Style License
 * @author    Andrea Giammarchi
 * @twitter   WebReflection
 * ---------------------------------------------------------
 * webf is a non-blocking way to bake one or more polpetta
 * in different folders and different ports at once, e.g.
 *  webf [start|stop] [polpetta|serverdir] [path] [port]
 */

var
  keys = Object.keys,
  env = process.env,
  fs = require("fs"),
  path = require("path"),
  spawn = require('child_process').spawn,
  args = resolveArguments(process.argv),
  dbName = path.join(env.HOME, ".webf"),
  program = /^\d+$/.test(args[1]) ?
    args.splice(1, 0, "polpetta") && args[1] : args[1]
  ,
  port = findPort(args.slice(2)) || "",
  filteredFolder = args.filter(function (folder, i) {
    return 1 < i && folder != port;
  })[0],
  folder = path.resolve(filteredFolder || process.cwd()),
  dbStringified, db,
  nmsp, domain, child
;