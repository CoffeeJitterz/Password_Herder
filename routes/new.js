const express = require('express');
const router  = express.Router();

const {Pool} = require('pg');
const pool = new Pool ({
  user:'labber',
  password: 'labber',
  host:'localhost',
  database: 'midterm'
})

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const hashPW = function(webPW) {
  return bcrypt.hashSync(webPW, salt);
}; //// this change the original pw to ^&%*^&**()



module.exports = (db) => {
  // function: add website info
  // - insert to websites database
  // - insert to password database

  // 1. verify if the website exist in the database
  // 2. verify if the user is logged, if not, no chance to do anything


  router.get("/", (req, res) => {
    if (req.session.email) {
            // console.log("line 70 success");
            const templateVars = {email: req.session.email};
            res.render("new",templateVars);
    } else {
      return res.status(404).send("you need to login first.");
    }

      // const templateVars = {email: req.session.email};
      // res.render("new",templateVars);
  });


  router.post("/", (req, res) => {
    // console.log(req.body);
    // console.log("is there an email?", req.session.email);


    if (req.body.text !== "" &&
        req.body.website_category !== "" &&
        req.body.website_name !== "" &&
        req.body.website_username !== "" ) {

          req.session.website_password = req.body.text;
          req.session.website_category = req.body.website_category;
          req.session.website_name = req.body.website_name;
          req.session.website_username = req.body.website_username;

          const addNew = function (wb_name, wb_un, wb_pw, wb_ct) {
            // console.log("this is the addNew function!!!")
            console.log(wb_name, wb_un, wb_pw, wb_ct);

            const conditions = [
              pool.query (`SELECT * FROM websites WHERE name = $1; `, [wb_name]),
            ]

            return Promise.all(conditions)
            .then ((results) => {
              // console.log(results[0]);
              if(results[0].rows.length === 0 ) {
                console.log("success");

                pool
                .query (`INSERT INTO websites (name, category) VALUES ($1, $2) RETURNING *;`, [wb_name, wb_ct])
                // .query(`select * from websites;`)
                .then ((result)  => {
                  console.log("insert to websites: ", result)
                  if (!result) {
                    console.log('insert to websites error!');
                    return;
                  }

                  console.log('this is new.js cookies: ', req.session);
                  console.log("this is from insert websites", result.rows[0].id);

                  return pool
                  .query (`INSERT INTO passwords
                          (organization_id, user_id, website_id, website_username, website_password)
                          VALUES (${req.session.org_id}, ${req.session.id},
                            ${result.rows[0].id}, $1, $2) RETURNING *;`, [wb_un, hashPW(wb_pw)])
                  .then ((result) => {
                    // console.log("this is line 82:", result);
                    // console.log("insert to the passwords: ", result)
                    if (!result) {
                      console.log('insert to passwords error!');
                      return;
                    }
                  })

                })
              }
            })

          }

         exports.addNew = addNew;

         addNew(req.session.website_name,
          req.session.website_username,
          req.session.website_password,
          req.session.website_category)
        //   .then ((result)=>{
        //     console.log("weird");
        //     if (!result) {
        //       res.status(500).send("line 68 error");
        //     } else {

        // }
        // });
        res.redirect('/');
      }
    })
  return router;
};
