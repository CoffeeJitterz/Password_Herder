const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

const {Pool} = require('pg');
const pool = new Pool ({
  user:'labber',
  password: 'labber',
  host:'localhost',
  database: 'midterm'
})


module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {email: req.session.email};
    res.render("login", templateVars);
  });

  const getUserWithEmail = function (email) {
    // console.log("getting email");
    return pool
    .query ( `SELECT * FROM users WHERE email = $1` , [email.toLowerCase()])
    .then((result) => {
      // console.log ("result.rows: ", result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      // console.log("line 28", err);
      return null;
    })
  }
  exports.getUserWithEmail = getUserWithEmail;

  const login = function(candidateEmail, candidatePassword) {
    // console.log("getting login");
    return getUserWithEmail(candidateEmail)
    .then(user => {
      console.log("user: ", user );
      if (bcrypt.compareSync(candidatePassword, user.user_password))
      {
        return user;
      }
      return null;
    })
  }
  exports.login = login;

  router.post("/", (req, res) => {
    console.log("this is req.body: ",req.body);
    const candidateEmail = req.body.email;
    const candidatePassword = req.body.password;

    login(candidateEmail, candidatePassword)
    // console.log("line 52")
    .then (user => {
      console.log("login promise resolved: ", user);
      if(!user) {
        console.log("user is falsy ", user);
        res.status(403).send("please check your username and password again. :) ");
        // res.send({error: "error"});
        return;
      }
      // req.session.id = user.id;
      // req.session.email = user.email; // create an id key with the value of user.id === 1
      console.log("user is truthy ", user);
      pool
      .query(`SELECT organization_id
              FROM users_organizations
              WHERE user_id = ${user.id}`)
      .then((result) => {
        console.log("the organization db query has been resolved. result.rows[0]: ", result.rows[0]);
        req.session = {id: user.id, email: user.email, org_id: result.rows[0].organization_id};
        // console.log("line 75", req.session);
        res.redirect("/");
      })
      .catch(e => {
        console.log("the organization db query has been rejected: ", e);
        res.send(e);
      })
    })
    .catch(e => {
      console.log("login promise rejected",e);
      res.send(e);
      });
  })

  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};
