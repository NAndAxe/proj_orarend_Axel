import express from "express";
import { initializeDatabase, dbAll, dbGet, dbRun } from "./util/database.js";
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.json());

app.get("/orarend", async (req, res, next) => {
  try {
    const sor = await dbAll("SELECT * FROM orarend");
    const mappedRows = sor.map(row => ({
      ...row,
      ora: JSON.parse(row.ora) 
    }));
    res.json(mappedRows);
  } catch (err) {
    next(err); 
  }
});
app.put("/orarend", async (req, res, next) => {
    const {nap, ora} = req.body
    if (!nap || !ora) {
      return res.status(404).json({message: 'Invalid data'})
    }
    const result = await dbRun(`UPDATE orarend SET ora = ? WHERE nap = ?`, [JSON.stringify(ora), nap])
    res.status(201).json({id: result.lastID, nap, ora })
})


app.use((err, req, res, next) => {
  res.status(500).json({ message: `Error: ${err.message}` });
});

async function startServer() {                                                      //1
  await initializeDatabase();
  app.listen(3000, () => {
    console.log("Server runs on port 3000");
  });
}

startServer();
