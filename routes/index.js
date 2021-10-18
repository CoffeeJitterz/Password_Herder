const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT websites.name, website_username, website_password
              FROM passwords
              JOIN websites ON websites.id = website_id;
              `)
    .then(data => {
      console.log(data.rows)
      const passwords = data.rows;
      const templateVars = {passwords};
      res.render("index", templateVars);
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  router.post("/", (req, res) => {
    //console.log(req.body)
  });


  return router;
};
