const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = { email: req.session.email };
    res.render("new", templateVars);
  });

  router.post("/", (req, res) => {
    console.log("this is req.body: ", req.body);
    const web_name = req.body.web_name;
    const website_username = req.body.website_username;
    const password = req.body.text;
    console.log("THIS IS WEBNAME", web_name, website_username, password);

    db.query(
      `INSERT INTO passwords (website_username, website_password)  VALUES (
       ${website_username}, ${password});
    `)
    .then((result) => {
      res.redirect("/");
    });
  });
  return router;
};
