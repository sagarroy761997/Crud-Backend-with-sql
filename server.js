const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const db = require("./util/sqlQuery");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  bodyParser.json({
    extended: true,
  })
);

app.get("/", db.createTable);
app.get("/getUser", db.getUsers);
app.get("/getUser/:id", db.getUserById);
app.post("/createUser", db.createUser);
app.put("/updateUser/:id", db.updateUser);
app.delete("/deleteUser/:id", db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

