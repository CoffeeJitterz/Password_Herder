const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    //console.log(req.body)
    // console.log("this is index: ", req.session.id);
    if (req.session.id === undefined) {
      res.redirect("login");
    } else {
      // display the table
    db.query(`SELECT passwords.id, websites.name as website, website_username, website_password, category, organizations.name as organization
              FROM passwords
              JOIN organizations ON organizations.id = organization_id
              JOIN websites ON websites.id = website_id
              ORDER BY id DESC;
              `)
    .then(data => {
      const passwords = data.rows;

      const categoriesObj = {};
      for (let i = 0; i < passwords.length; i++) {
        categoriesObj[passwords[i].category] = 1;
      }
      const categories = Object.keys(categoriesObj);

      const organizationsObj = {};
      for (let y = 0; y < passwords.length; y++) {
        organizationsObj[passwords[y].organization] = 1;
      }
      const organizations = Object.keys(organizationsObj);

      const templateVars = {passwords, email: req.session.email, categories, organizations};
      // console.log("I AM TEMPLATEVARS", templateVars)
      res.render("index", templateVars);
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  }
  });

  router.get("/:id/copy", (req, res) => {
  //  console.log("I AM COPY");
   const passwordID = req.params.id;
  //  console.log(passwordID);
  if (req.session.id === undefined) {
    res.redirect("login");
  } else {
   db.query(` SELECT website_password
              FROM passwords
              WHERE id = ${passwordID}
   `)
   .then(password => {
     console.log("I'm from THEN!");
     const copiedPassword = password.rows[0].website_password;
     console.log(copiedPassword);
     res.redirect("/");
   })
  }
  });

  router.post("/category", (req, res) => {
    console.log(req.body)
  })

  return router;
};
