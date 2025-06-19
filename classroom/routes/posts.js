const express = require("express");
const router = express.Router();



// GET all posts
router.get("/show", (req, res) => {
    res.send("this is a GET route for posts");
  });
  
  // POST a new post
  router.post("/new", (req, res) => {
    res.send("this is a POST route for posts");
  });
  
  // DELETE a post
  router.delete("/destroy", (req, res) => {
    res.send("this is a DELETE route for posts");
  });
  
  // PATCH a post
  router.patch("/update", (req, res) => {
    res.send("this is a PATCH route for posts");
  });
  

module.exports = router;