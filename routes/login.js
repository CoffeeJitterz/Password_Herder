const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("this is getting");
    res.render("login");
  });

  router.post("/", (req, res) => {
    console.log("This is posting");
    console.log(req.body);
    res.redirect('/');
  })

  return router;
};
