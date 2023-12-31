import express from "express";
import * as path from "path";
import { ElementsApi } from "./ElementsApi.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { fetchJSON } from "./fetchJSON.js";
import { Users } from "./loginCookies.js";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(async (req, res, next) => {
  const authorization = req.header("Authorization");
  if (authorization) {
    const { userinfo_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration",
    );
    req.userinfo = await fetchJSON(userinfo_endpoint, {
      headers: { authorization },
    });
  }
  next();
});

app.get("/api/login", async (req, res) => {
  try {
    const { access_token } = req.signedCookies;
    const { userinfo_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration",
    );

    const userinfo = await fetchJSON(userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    res.json(userinfo);
  } catch (error) {
    res.status(401).json({ error: "" });
  }
});

app.post("/api/login/access_token", (req, res) => {
  const { access_token } = req.body;
  res.cookie("access_token", access_token, { signed: true });
  res.sendStatus(204);
});

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
  const database = await mongoClient.db().admin().listDatabases();
  console.log(database);
  app.use("/api/elements", ElementsApi(mongoClient.db("chat_database")));
  app.use("/api/createUser", Users(mongoClient.db("chat_database")));
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
