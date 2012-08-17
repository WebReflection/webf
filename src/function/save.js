
function save() {
  fs.writeFileSync(
    dbName, dbStringified = JSON.stringify(db), "utf-8"
  );
}
