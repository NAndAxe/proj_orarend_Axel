import sqlite from "sqlite3";
const db = new sqlite.Database("./data/database.sqlite");

export function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

export async function initializeDatabase() {            //2
  await dbRun("DROP TABLE IF EXISTS orarend;"); //Ha ezt kommentbe rakom akkor szerver újraindításnál nem veszik el az adat
  await dbRun(
    "CREATE TABLE IF NOT EXISTS orarend (id INTEGER PRIMARY KEY AUTOINCREMENT, nap STRING, ora TEXT );"
  );
  
  const napok = [
    { nap: "Hétfő", ora: [" ", "FRONT(html)", "FRONT(html)", "IKT II. (javaS)", " ", "webprg", "IKT II. (javaS)", " ", " "] },
    { nap: "Kedd", ora: [" ", "IKT II. (javaS)", " ", "IKTII(mob+java)", "IKTII(mob+java)", "webprg", "IKT II. (javaS)", "webprg", " "] },
    { nap: "Szerda", ora: [" ", "FRONT(html)", "FRONT(html)", "Back(Java)", "Back(Java)", " ", " ", " ", " "] },
    { nap: "Csütörtök", ora: [" ", " ", "Ma", " ", "FRONT(html)", "FRONT(html)", "Amob(mob)", "Amob(mob)", " "] },
    { nap: "Péntek", ora: [" ", "Ma", "FRONT(html)", "webprg", "FRONT(html)", "FRONT(html)", " ", " ", " "] },
  ];
  

  for (const nap of napok) {
    await dbRun(
      "INSERT INTO orarend (nap, ora) VALUES (?, ?);", [
        nap.nap, 
        JSON.stringify(nap.ora),  
    ]);
  }
}
