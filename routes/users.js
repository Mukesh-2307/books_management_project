const express = require("express");
const router = express.Router();
const { users } = require("../Users.json");

const { Router } = require("express");
/* 
    Route: /getUsers
    method: GET
    desc: get all users
    access: public
    params: none
*/

router.get("/getUsers", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/* 
      Route: /getUser/:id
      method: GET
      desc: get a user by their id
      access: public
      params: id
  */

router.get("/getUser/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((person) => person.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user doesn't exist !",
    });
  }
  return res.status(200).json({
    success: true,
    message: "user found",
    data: user,
  });
});

/* 
      Route: /newUser
      method: POST
      desc: creating a new user
      access: public
      params: none
  */

router.post("/newUser", (req, res) => {
  const { id, name, roll, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((person) => person.id === id);

  if (user) {
    return res.status(404).json({
      success: false,
      message: "user with the id already exists",
    });
  }
  users.push({
    id,
    name,
    roll,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    success: true,
    message: "user added successfully",
    data: users,
  });
});

/* 
      Route: /updateUser/:id
      method: PUT
      desc: updating a user by their id
      access: public
      params: id
  */

router.put("/updateUser/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((person) => person.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user doesn't found",
    });
  }

  const updateUserData = users.map((person) => {
    if (person.id === id) {
      return {
        ...person,
        ...data,
      };
    }
    return person;
  });
  return res.status(200).json({
    success: true,
    message: "user details updated",
    data: updateUserData,
  });
});

/* 
      Route: /deleteUsers/:id
      method: DELETE
      desc: deleting a user by their id
      access: public
      params: id
  */

router.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((person) => person.id === id);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "user doesn't exist",
    });
  }
  // delete logic need to be built
  const index = users.indexOf(user);
  users.splice(index, 1);
  return res.status(200).json({
    success: true,
    message: "deleted user",
    data: users,
  });
});

/* 
      Route: /getUserSubscriptionDetails/:id
      method: GET
      desc: get a user's Subscription Details by their id
      access: public
      params: id
  */
router.get("/getUserSubscriptionDetails/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((person) => (person.id === id));
  // console.log(user);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }

  const getDateInDays = (data = "") =>{
    let date;
    if(data === ""){
      date = new Date();
    }
    else{
      date = new Date(data);
    }
    let days = Math.floor(date / (1000*60*60*24));
    return days;
  }

  const subscriptionType = (days) =>{
    if(user.subscriptionType === "basic"){
      days = days + 90;
    }
    else if(user.subscriptionType === "standard"){
      days = days + 180;
    }
    else if(user.subscriptionType === "premium"){
      days = days + 365;
    }
    return days;
  }

  let returnDate = getDateInDays(user.returnDate);
  console.log(returnDate);
  let currentDate = getDateInDays();
  console.log(currentDate);

  let subscriptionDate = getDateInDays(user.subscriptionDate);
  console.log(subscriptionDate);
  let subExpireDate = subscriptionType(subscriptionDate);
  console.log(subExpireDate);

  const data = {
    ...user,
    isSubscriptionLifeExpired : subExpireDate <= currentDate ? "expired" : "not expired",
    daysLeft : subExpireDate <= currentDate ? 0 : subExpireDate - currentDate,
    fine : returnDate < currentDate ? 0 : (subExpireDate <= currentDate ? 150 : 50) 
  }

  return res.status(200).json({
    success: true,
    message: "user found",
    data
  });
});

module.exports = router;