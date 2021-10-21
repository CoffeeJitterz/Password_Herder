const { render } = require('ejs');
const express = require('express');
const router  = express.Router();

const CryptoJS = require("crypto-js");
const encryptPW  = function (originalPW) {
  console.log("this is the encrypted pw in the database: ", CryptoJS.AES.encrypt(originalPW, 'we are awesome').toString());
  return CryptoJS.AES.encrypt(originalPW, 'we are awesome').toString();
}
const deCrypt = function (changedPW) {
  const bytes  = CryptoJS.AES.decrypt(changedPW, 'we are awesome');
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = (db) => {

  router.get("/", (req, res) => {
    //console.log(req.body)
    // console.log("this is index: ", req.session.id);
    if (req.session.id === undefined) {
      res.redirect("login");
    } else {
      // display the table
      const category = req.query.categories;
      const organization_id = req.session.org_id;
      let queries;
      if(!category){
            queries = [
          db.query(`SELECT passwords.id, websites.name, website_username, website_password, category
                   FROM passwords
                   JOIN websites ON websites.id = website_id
                   ORDER BY passwords.id DESC;
                   `),

          db.query(`
                    SELECT category
                    FROM websites
                    GROUP BY category;`),

          db.query(`
                    SELECT id, name
                    FROM organizations
                    WHERE id = '${organization_id}';`)
        ];
      } else if (category){
            queries = [
          db.query(`SELECT passwords.id, websites.name, website_username, website_password, category
                   FROM passwords
                   JOIN websites ON websites.id = website_id
                   WHERE category = '${category}'
                   ORDER BY passwords.id DESC;`),

          db.query(`
                    SELECT category
                    FROM websites
                    GROUP BY category`),

          db.query(`
                    SELECT id, name
                    FROM organizations
                    WHERE id = '${organization_id}'`)

        ];
      }
      //console.log(category);

     return Promise.all(queries)
     .then(results => {
       let  passwords = results[0].rows;


      for (let i of passwords) {
        console.log("before decrypt: ", i.website_password);
        i.website_password = deCrypt(i.website_password);
        console.log("after decrypt: ", i.website_password);
      };


       const categories = results[1].rows;
       const organization = results[2].rows;
       console.log(organization);
       const email = req.session.email
       const templateVars = {passwords, categories, email, organization};
       res.render("index", templateVars);

     })

  }
  });

  router.post("/category", (req, res) => {
    console.log(req.body)
  })

  router.get("/:id/copy", (req, res) => {
  //  console.log("I AM COPY");
   const passwordID = req.params.id;
  //  console.log(passwordID);
  if (req.session.id === undefined) {
    res.redirect("login");
  } else {
   db.query(`
    SELECT website_password
    FROM passwords
    WHERE id = ${passwordID}
   `)
   .then(password => {
     console.log("I'm from THEN!");
     const copiedPassword = password.rows[0].website_password;
     console.log(copiedPassword);
   })
   .then (() => res.redirect("/"))
  }
  });

  router.post("/:id/delete", (req, res) => {
    console.log("I AM DELETE");
  const passwordID = req.params.id;
  // console.log(passwordID);

  if (req.session.id === undefined) {
    res.redirect("login");
    } else {
      console.log("the user is logged in");
      db.query (`SELECT user_id FROM passwords
                WHERE id = ${passwordID};`)
      .then((result) => {
        console.log("expecting result", result.rows[0].user_id);
        // console.log("expecting req.session.id", req.session.id);
        const tf = (result.rows[0].user_id === req.session.id);
        console.log("expecting true or false", tf);
        if (tf) {
          db
          .query(` DELETE FROM passwords
                WHERE id = ${passwordID}
                `)
          .then(() => {
          res.redirect("/");
          })
        } else {
          res.send("your are not the creator of this password and you cannot delete this password");
        }
      })
    }
  })

  return router;
};
