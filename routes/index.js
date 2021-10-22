const express = require("express");
const router = express.Router();

//encrypt/decrypt
const CryptoJS = require("crypto-js");
const encryptPW = function (originalPW) {
  return CryptoJS.AES.encrypt(originalPW, "we are awesome").toString();
};
const deCrypt = function (changedPW) {
  const bytes = CryptoJS.AES.decrypt(changedPW, "we are awesome");
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = (db) => {
  //Password Table Display and Filter Function
  router.get("/", (req, res) => {
    if (req.session.id === undefined) {
      res.redirect("login");
    } else {
      const category = req.query.categories;
      const organization_id = req.session.org_id;
      let queries;
      if (!category) {
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
                    WHERE id = '${organization_id}';`),
        ];
      } else if (category) {
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
                    WHERE id = '${organization_id}'`),
        ];
      }

      return Promise.all(queries).then((results) => {
        let passwords = results[0].rows;

        for (let i of passwords) {
          i.website_password = deCrypt(i.website_password);
        }

        const categories = results[1].rows;
        const organization = results[2].rows;
        console.log(organization);
        const email = req.session.email;
        const templateVars = { passwords, categories, email, organization };
        res.render("index", templateVars);
      });
    }
  });

  //Copy Function Route
  router.get("/:id/copy", (req, res) => {
    const passwordID = req.params.id;
    if (req.session.id === undefined) {
      res.redirect("login");
    } else {
      db.query(
        `
    SELECT website_password
    FROM passwords
    WHERE id = ${passwordID}
   `
      )
        .then((password) => {
          const copiedPassword = password.rows[0].website_password;
        })
        .then(() => res.redirect("/"));
    }
  });

  //Delete Function Route
  router.post("/:id/delete", (req, res) => {
    const passwordID = req.params.id;
    if (req.session.id === undefined) {
      res.redirect("login");
    } else {
      db.query(
        `SELECT user_id FROM passwords
                WHERE id = ${passwordID};`
      ).then((result) => {
        const tf = result.rows[0].user_id === req.session.id;
        if (tf) {
          db.query(
            ` DELETE FROM passwords
                WHERE id = ${passwordID}
                `
          ).then(() => {
            res.redirect("/");
          });
        } else {
          res.send(
            "your are not the creator of this password and you cannot delete this password"
          );
        }
      });
    }
  });

  return router;
};
