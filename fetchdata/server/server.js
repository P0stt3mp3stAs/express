const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  try {
    fs.readFile("users.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error reading file");
        return;
      }
      const users = JSON.parse(data);
      console.log(users);
      return res.json({ users });
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

app.post("/api/addUser", (req, res) => {
  try {
    const { name } = req.body;
    fs.readFile("users.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error reading file");
        return;
      }
      const users = JSON.parse(data);
      const newUser = {
        id: Math.floor(Math.random() * 100),
        name,
        age: Math.floor(Math.random() * 100),
      };
      users.push(newUser);

      fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error writing file");
          return;
        }

        res.json({ users });
      });
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
