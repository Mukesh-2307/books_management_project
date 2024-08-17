const express = require("express");
const { users } = require("./Users.json");
const { books } = require("./Books.json");

const app = express();

const port = 8081;

app.use(express.json());

/* 
    Route: /users
    method: GET
    desc: get all users
    access: public
    params: none
*/

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Express.Js Server is Up" });
});

// the below code will be executed if a user tries to access an endpoint that doesn't exist

// this is a generic route so this need to be at the bottom or else the routes below this route will no get executed

app.get("*", (req, res) => {
  res.status(404).json({ message: "this route doesn't exist !" });
});

app.listen(port, () => {
  console.log(`NodeJs server is listening at port ${port}`);
});
