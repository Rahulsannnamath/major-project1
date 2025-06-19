const express = require("express");
const router = express.Router();



router.get("/show", (req, res) => {
    res.send("this is a GET route for users");
  });
  
  // POST a new user
 router.post("/new", (req, res) => {
    res.send("this is a POST route for users");
  });
  
  // DELETE a user
  router.delete("/", (req, res) => {
    res.send("this is a DELETE route for users");
  });
  
  // PATCH a user
router.patch("/", (req, res) => {
    res.send("this is a PATCH route for users");
  });
  

module.exports = router