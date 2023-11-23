import { Router } from "express";

export function Users(mongoClient) {
  const router = new Router();
  router.post("/", async (req, res) => {
    const { name, email } = req.body;

    console.log("Request body check:", req.body);

    try {
      const existingUser = await mongoClient
        .collection("users")
        .findOne({ email: email });

      if (existingUser) {
        return res.status(204).json({ error: "User already exists." });
      }

      const insertResult = await mongoClient.collection("users").insertOne({
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

  router.post("/chat", async (req, res) => {
    const { emailUser, title, newEmail, userName } = req.body;
    console.log(emailUser, title, newEmail, userName);
    console.log("Request body check:", req.body);

    try {
      const existingUser1 = await mongoClient
        .collection("users")
        .find({ email: emailUser })
        .toArray();

      console.log(existingUser1);

      const existingUser2 = await mongoClient
        .collection("users")
        .find({ email: newEmail })
        .toArray();

      console.log(existingUser2);

      if (existingUser1.length === 1 && existingUser2.length === 1) {
        const existingTitle1 = await mongoClient
          .collection("chat_rooms")
          .findOne({ email2: newEmail, title: title, email: emailUser });

        console.log(existingTitle1);

        const existingTitle2 = await mongoClient
          .collection("chat_rooms")
          .findOne({ email: newEmail, title: title, email2: emailUser });
        console.log(existingTitle2);

        /*
        for the future
        const findName = (
          await mongoClient.collection("users").findOne({ email: newEmail })
        ).toString();
         */

        console.log(existingTitle1 === null);

        if (existingTitle1 === null && existingTitle2 == null) {
          const insertResult = await mongoClient
            .collection("chat_rooms")
            .insertOne({
              email: emailUser,
              title: title,
              email2: newEmail,
            });
          console.log("Successfully inserted user:", insertResult);
          res.status(200).json({ message: "Chat room successfully." });
        }
      }
    } catch (error) {}
  });

  return router;
}
