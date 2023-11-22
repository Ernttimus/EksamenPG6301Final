import { Router } from "express";

/*
const localElements = [
  {
    title: "Element 1"
  },
  {
    title: "Element 2"
  },
  {
    title: "Element 3"
  },
]
*/
export function ElementsApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const elements = await mongoDatabase
      .collection("chat_rooms")
      .find()
      .map(({ _id, title }) => ({
        _id,
        title,
      }))
      .limit(10)
      .toArray();
    res.json(elements);
  });
  router.post("/new", (req, res) => {
    /*
      const title = req.body;
    const result = mongoDatabase.collection("movies").insertOne({ title });
     */
    res.sendStatus(500);
  });
  return router;
}
