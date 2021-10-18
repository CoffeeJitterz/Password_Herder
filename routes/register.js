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

    const salt = bcrypt.genSaltSync(10);

    const hashPW = function(userPW) {
      return bcrypt.hashSync(userPW, salt);
    };

    const conditions = [
      pool.query(`SELECT * FROM organizations WHERE name = $1;`, [org]),
      pool.query(`SELECT * FROM users WHERE email = $1;`, [em])
    ];

    return Promise.all(conditions)
    .then((results) =>{
      if(results[0].rows.length === 1  && results[1].rows.length === 0) {
        return pool
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


  //   // check if the organization is in the database
  //   return pool
  //   .query(`SELECT * FROM organizations WHERE name = $1;`, [org])
  //   .then((result) => {
  //     console.log("check the org name: ", result);

  //     if (result.rows.length === 0) {
  //       console.log("wrong org!");
  //       return;
  //     };

  //     // check if the email is in the database
  //     return pool
  //     .query (`SELECT * FROM users WHERE email = $2 ;` [em])
  //     .then((result) => {
  //       console.log("check the email: ",result);
  //       if (result) {
  //         console.log("this user already exist");
  //         return;
  //       }

  //       congols.log("line 50");

  //       // insert the new user information into the database
  //       return pool
  //       .query (`INSERT INTO users (email, user_password) VALUES ($2, $3) RETURNING *`, [em, hashPW(pw)])
  //       .then( (user) => {
  //         console.log("this is user: ", user)
  //         if(!user) {
  //           console.log('error!');
  //           return;
  //         }
  //         return user ;
  //       })
  //     })
  //   })
  //   .catch((err) => {
  //     return "line 44 error!";
  //   })
  // }

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
