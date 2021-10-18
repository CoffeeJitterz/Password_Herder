const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    //console.log(req.body)
    db.query(`SELECT passwords.id, websites.name, website_username, website_password
              FROM passwords
              JOIN websites ON websites.id = website_id;
              `)
    .then(data => {
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

  router.get("/:id/copy", (req, res) => {
   console.log("I AM COPY");
   const passwordID = req.params.id;
   console.log(passwordID);
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
  });

  router.post("/:id/delete", (req, res) => {
    console.log("I AM DELETE")
    const passwordID = req.params.id;
   console.log(passwordID);
   db.query(` DELETE FROM passwords
              WHERE id = ${passwordID}
   `)
   .then(password => {
     res.redirect("/");
   })
  })

  router.post("/:id/edit", (req, res) => {
    console.log("I AM EDIT")
  })


  return router;
};
