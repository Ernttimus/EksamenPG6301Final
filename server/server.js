import express from "express";
import * as path from "path";
import { ElementsApi } from "./ElementsApi.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
const app = express();

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
  const database = await mongoClient.db().admin().listDatabases();
  console.log(database);
  app.use("/api/elements", ElementsApi(mongoClient.db("sample_mflix")));
});

app.use(express.static("../client/dist"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

app.listen(process.env.PORT || 3000);
