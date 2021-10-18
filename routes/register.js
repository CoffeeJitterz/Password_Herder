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
    console.log("this is getting");
    res.render("register");
  });

  const addUser = function (org, em, pw) {

    console.log("add one user");

    return pool
    .query(`SELECT * from organizations where name = $1;`, [org])
    .then((result) => {
      console.log(result);
      if (result.rows.length === 0) {
        console.log("wrong org!");
        return;
      }
      return pool
      .query (`INSERT INTO users (email, user_password) VALUES ($2, $3) RETURNING *`, [em, bcrypt.hashSync(pw)])
      .then( (user) => {
        if(!user) {
          console.log('error!');
          return;
        }
        return user ;
      })
    })
    .catch((err) => {
      return "line 44 error!";
    })
  }

  exports.addUser = addUser;

  router.post("/", (req, res) => {
    const info = req.body;
    console.log("This is posting");
    console.log("req.body: ", req.body);

    addUser(info.organization_name, info.email, info.password)
    .then((result) => {
      if(!result) {
        res.status(500).send("wrong info!");
      }
      else {
        res.redirect('/');
      };
    })
  })
  return router;
};
