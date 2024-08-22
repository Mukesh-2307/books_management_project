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

/* 
    Route: /users/:id
    method: GET
    desc: get a user by their id
    access: public
    params: id
*/

app.get("/users/:id",(req,res)=>{
  const {id} = req.params;
  const user = users.find((person)=>person.id === id);
  if(!user){
    return res.status(404).json({
      success: false,
      message: "user doesn't exist !"
    });
  }
  return res.status(200).json({
    success: true,
    message: "user found",
    data: user
  });
});


/* 
    Route: /users
    method: POST
    desc: creating a new user
    access: public
    params: none
*/

app.post("/users",(req,res)=>{
  const {id, name,roll,email,subscriptionType,subscriptionDate} = req.body;

  const user = users.find((person)=> person.id === id);

  if(user){
    return res.status(404).json({
      success: false,
      message: "user with the id already exists"
    });
  }
  users.push({
    id,
    name,
    roll,
    email,
    subscriptionType,
    subscriptionDate
  });

  return res.status(201).json({
    success: true,
    message: "user added successfully",
    data: users
  });
});

/* 
    Route: /users/:id
    method: PUT
    desc: updating a user by their id
    access: public
    params: id
*/

app.put("/users/:id",(req,res)=>{
  const {id} = req.params;
  const {data} = req.body;

  const user = users.find((person)=>person.id === id);
  if(!user){
    return res.status(404).json({
      success: false,
      message: "user doesn't found"
    });
  }

  const updateUserData = users.map((person)=>{
    if(person.id === id){
      return {
        ...person,
        ...data
      };
    }
    return person;
  });
  return res.status(200).json({
    success: true,
    message: "user details updated",
    data: updateUserData
  });
});

/* 
    Route: /users/:id
    method: DELETE
    desc: deleting a user by their id
    access: public
    params: id
*/

app.delete("/users/:id",(req,res)=>{
  const {id} = req.params

  const user = users.find((person)=>person.id === id);
  if(user){
    res.status(404).json({
      success: false,
      message: "user doesn't exist"
    });
  }
  // delete logic need to be built
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
