const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const cookieSession = require("cookie-session");

const { Pool } = require("pg");
const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

module.exports = (db) => {
  //Login Function
  router.get("/", (req, res) => {
    const templateVars = { email: req.session.email };
    res.render("login", templateVars);
  });

  const getUserWithEmail = function (email) {
    return pool
      .query(`SELECT * FROM users WHERE email = $1`, [email.toLowerCase()])
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        return null;
      });
  };
  exports.getUserWithEmail = getUserWithEmail;

  const login = function (candidateEmail, candidatePassword) {
    return getUserWithEmail(candidateEmail).then((user) => {
      if (bcrypt.compareSync(candidatePassword, user.user_password)) {
        return user;
      }
      return null;
    });
  };
  exports.login = login;

  router.post("/", (req, res) => {
    const candidateEmail = req.body.email;
    const candidatePassword = req.body.password;

    login(candidateEmail, candidatePassword)
      .then((user) => {
        if (!user) {
          res
            .status(403)
            .send("please check your username and password again. :) ");
          return;
        }
        pool
          .query(
            `SELECT organization_id
              FROM users_organizations
              WHERE user_id = ${user.id}`
          )
          .then((result) => {
            req.session = {
              id: user.id,
              email: user.email,
              org_id: result.rows[0].organization_id,
            };
            res.redirect("/");
          })
          .catch((e) => {
            res.send(e);
          });
      })
      .catch((e) => {
        res.send(e);
      });
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};
