
if (fs.existsSync(dbName)) {
  dbStringified = fs.readFileSync(dbName, "utf-8");
  try {
    db = JSON.parse(dbStringified);
  } catch(o_O) {
    console.warn("ooops, the chef burned something!");
    console.warn(dbStringified);
  }
}

db || save(db = {});
nmsp = db[program] || (db[program] = {});

perform(args[0]);
