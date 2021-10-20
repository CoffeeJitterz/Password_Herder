const { render } = require('ejs');
const express = require('express');
const router  = express.Router();



module.exports = (db) => {

      router.get("/", (req, res) => {
        const category = req.query.categories;
        const organization = req.query.organizations;
        console.log(category, organization)
        let queries;
        if(!category){
              queries = [
            db.query(`SELECT passwords.id, websites.name, website_username, website_password, category
                     FROM passwords
                     JOIN websites ON websites.id = website_id
                     `),

            db.query(`
                      SELECT category
                      FROM websites
                      GROUP BY category`),
          ];
        } else if (category){
              queries = [
            db.query(`SELECT passwords.id, websites.name, website_username, website_password, category
                     FROM passwords
                     JOIN websites ON websites.id = website_id
                     WHERE category = '${category}'`),

            db.query(`
                      SELECT category
                      FROM websites
                      GROUP BY category`),

          ];
        }
        //console.log(category);

       return Promise.all(queries)
       .then(results => {
         const passwords = results[0].rows;
         const categories = results[1].rows;
         const email = req.session.email
         const templateVars = {passwords, categories, email};
         res.render("index", templateVars);

       })
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
    res.redirect("/:id/edit")
  })

  router.get("/category", (req, res) => {
    const category = req.body.categories

    db.query(`SELECT passwords.id, websites.name, website_username, website_password
              FROM passwords
              JOIN websites ON websites.id = website_id
              WHERE category = '${category}'`)
     .then(response => {
       console.log(response.rows);
     })

    //res.redirect("/")
  })

  return router;
};
