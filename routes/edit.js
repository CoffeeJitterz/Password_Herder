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

const { Pool } = require("pg");
const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

module.exports = (db) => {
  //Edit function route
  router.get("/:pw_id", (req, res) => {
    if (req.session.id === undefined) {
      res.redirect("login");
    } else {
      db.query(
        `SELECT user_id FROM passwords
                  WHERE id = ${req.params.pw_id};`
      ).then((result) => {
        const tf = result.rows[0].user_id === req.session.id;
        if (tf) {
          pool
            .query(`SELECT * FROM passwords WHERE id = ${req.params.pw_id}`)
            .then((result) => {
              const webpw = result.rows[0];
              const decryptedWebpw = deCrypt(webpw.website_password);
              const templateVars = {
                email: req.session.email,
                webpw,
                decryptedWebpw,
              };
              res.render("edit", templateVars);
            });
        } else {
          res.send(
            "your are not the creator of this password and you cannot delete this password"
          );
        }
      });
    }
  });

  router.post("/:pw_id", (req, res) => {
    const newPW = encryptPW(req.body.text);
    return pool
      .query(
        `UPDATE passwords
      SET website_password = '${newPW}'
      WHERE id = '${req.params.pw_id}';`
      )
      .then(res.redirect("/"));
  });
  return router;
};
