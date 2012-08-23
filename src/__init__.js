
if (fs.existsSync(dbName)) {
  dbStringified = fs.readFileSync(dbName, "utf-8");
  try {
    db = JSON.parse(dbStringified);
  } catch(o_O) {
    console.warn("ooops, the webf lost something!");
    console.warn(dbStringified);
  }
}

db || save(db = {});
nmsp = db[programName] || (db[programName] = {});

perform(args[0]);
