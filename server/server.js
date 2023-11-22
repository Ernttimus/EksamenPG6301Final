import express from "express";
import * as path from "path";
import { ElementsApi } from "./ElementsApi.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { fetchJSON } from "./fetchJSON.js";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.post("/api/createUser", async (req, res) => {
  const { name, email } = req.body;

  console.log("Request body check:", req.body);

  try {
    const existingUser = await mongoClient
      .db("chat_database")
      .collection("users")
      .findOne({ email: email });

    if (existingUser) {
      return res.status(204).json({ error: "User already exists." });
    }

    const insertResult = await mongoClient
      .db("chat_database")
      .collection("users")
      .insertOne({
        email: email,
        name: name,
      });

    console.log("Successfully inserted user:", insertResult);

    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user." });
  }
});

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
