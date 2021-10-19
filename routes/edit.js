const express = require('express');
const router  = express.Router();

const {Pool} = require('pg');
const pool = new Pool ({
  user:'labber',
  password: 'labber',
  host:'localhost',
  database: 'midterm'
})

module.exports = (db) => {
  router.get("/:pw_id", (req, res) => { /// user shout: give me the page of my password
  // /:id would be passwords_pkid

  // verification user's identification
  // 1. user is the creator of this password
  // 2. user has logged in

  // server gonna provide the user the place to change the password
  // server gonna provide the current existing password

    console.log('this is the passwords id: ', req.params);
    // console.log("this is req.session on edit", req.session);
    //----->  req.params.pw_id
    // req.session will have three parts: 1)id, 2)email, 3)org_id

    // select the pssword_id and find the website_password
    // have the website_password shown in the front html

    return pool
    .query(`SELECT * FROM passwords WHERE id = ${req.params.pw_id}`)
    .then((result) => {
      console.log("query result: ", result.rows);
      const webpw = result.rows[0];

      const templateVars = {email: req.session.email, webpw: webpw};
      res.render("edit", templateVars);
    } )
  });


  router.post("/:pw_id", (req, res) => {
    console.log("new password: ", req.body, req.params);
    // req.body.text  ----> your new pw

    // console.log("here is post parameter: ", req.params);
    // const pw_id = req.params.pw_id;
      return  pool
      .query(`UPDATE passwords
      SET website_password = '${req.body.text}'
      WHERE id = '${req.params.pw_id}';` )
      .then(res.redirect('/'))
  })
  return router;
};

// UPDATE table_name
// SET column1 = value1,
//     column2 = value2,
//     ...
// WHERE condition;
