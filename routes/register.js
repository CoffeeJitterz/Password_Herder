const express = require('express');
const router  = express.Router();

const bcrypt = require('bcrypt');

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
    console.log("this is getting");
    res.render("register", templateVars);
  });

  const addUser = function (org, em, pw) {

    console.log("add one user");

    const salt = bcrypt.genSaltSync(10);

    const hashPW = function(userPW) {
      return bcrypt.hashSync(userPW, salt);
    };

    const conditions = [
      // check if the organization already exist.
      pool.query(`SELECT * FROM organizations WHERE name = $1;`, [org]),
      // check if the email already exist.
      pool.query(`SELECT * FROM users WHERE email = $1;`, [em])
    ];

    return Promise.all(conditions)
    .then((results) =>{
      if(results[0].rows.length === 1  && results[1].rows.length === 0) {
        return pool
        // insert the new user information.
        .query (`INSERT INTO users (email, user_password) VALUES ($1, $2) RETURNING *`, [em, hashPW(pw)])
        .then( (user) => {
          console.log("this is user: ", user)
          if(!user) {
            console.log('error!');
            return;
          }
          return user;
        })
      }
    })
  }

  exports.addUser = addUser;

  router.post("/", (req, res) => {
    const info = req.body;
    // console.log("This is posting");
    // console.log("req.body: ", req.body);

    addUser(info.organization_name, info.email, info.password)
    .then((result) => {
      console.log("this is line 65: ", result);

      if(!result) {
        res.status(500).send("wrong info!");
      }
      else {
        req.session.email = result.rows.email;
        res.redirect('/');
      };
    })
  })
  return router;
};
