const express = require("express");
// const { encrypt, decrypt } = require('../crypto/cryptography');
const router = express.Router();

const { Pool } = require("pg");
const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

//encrypt/decrypt
const CryptoJS = require("crypto-js");
const encryptPW = function (originalPW) {
  return CryptoJS.AES.encrypt(originalPW, "we are awesome").toString();
};

module.exports = (db) => {

  //Create New Password Route, Save Function
  router.get("/", (req, res) => {
    if (req.session.email) {
      const templateVars = { email: req.session.email };
      res.render("new", templateVars);
    } else {
      return res.status(404).send("you need to login first.");
    }
  });

  router.post("/", (req, res) => {
    if (
      req.body.text !== "" &&
      req.body.website_category !== "" &&
      req.body.website_name !== "" &&
      req.body.website_username !== ""
    ) {
      req.session.website_password = req.body.text;
      req.session.website_category = req.body.website_category;
      req.session.website_name = req.body.website_name;
      req.session.website_username = req.body.website_username;

      const addNew = function (wb_name, wb_un, wb_pw, wb_ct) {
        const conditions = [
          db.query(`SELECT * FROM websites WHERE name = $1; `, [wb_name]),
          db.query(
            `SELECT users.id as user_id, users_organizations.organization_id as organization_id FROM users join users_organizations on users.id = users_organizations.user_id WHERE users.email = $1; `,
            [req.session.email]
          ),
        ];
        return Promise.all(conditions).then((results) => {
          if (results[0].rows.length === 0) {
            return db
              .query(
                `INSERT INTO websites (name, category) VALUES ($1, $2) RETURNING *;`,
                [wb_name, wb_ct]
              )
              .then((result) => {
                if (!result) {
                  return;
                }
                return db
                  .query(
                    `INSERT INTO passwords
                    (organization_id, user_id, website_id, website_username, website_password)
                    VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
                    [
                      results[1].rows[0].organization_id,
                      results[1].rows[0].user_id,
                      result.rows[0].id,
                      wb_un,
                      encryptPW(wb_pw),
                    ]
                  )
                  .then((result) => {
                    if (!result) {
                      return;
                    }
                  });
              });
          } else {
            return db
              .query(
                `INSERT INTO passwords
                 (organization_id, user_id, website_id, website_username, website_password)
                 VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
                [
                  results[1].rows[0].organization_id,
                  results[1].rows[0].user_id,
                  results[0].rows[0].id,
                  wb_un,
                  encryptPW(wb_pw),
                ]
              )
              .then((result) => {
                if (!result) {
                  return;
                }
              });
          }
        });
      };

      exports.addNew = addNew;

      addNew(
        req.session.website_name,
        req.session.website_username,
        req.session.website_password,
        req.session.website_category
      ).then((result) => {
        res.redirect("/");
      });
    }
  });
  return router;
};
