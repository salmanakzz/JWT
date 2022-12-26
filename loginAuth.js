const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = { name: req.body.name, password: hashedPassword };

  users.push(user);
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);

  if (user == null) return res.status(400).send("User not found!");

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("success");
    } else {
      res.send("failed");
    }
  } catch (error) {
    res.status(500).send();
  }
});

app.listen(3000, () => console.log("Port listening at 3000"));
