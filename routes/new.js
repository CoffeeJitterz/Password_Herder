const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
      res.render("new");
  });
  router.post("/", (req, res) => {
    req.render("new");
  });
  return router;
};
