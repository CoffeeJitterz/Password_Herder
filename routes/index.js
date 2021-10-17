const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("this is getting");
    res.render("index");
  });



  return router;
};
