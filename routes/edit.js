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
  router.get("/:pw_id", (req, res) => {
    if (req.session.id === undefined) {
      res.redirect("login");
      } else {
        db.query (`SELECT user_id FROM passwords
                  WHERE id = ${req.params.pw_id};`)
        .then((result) => {
          const tf = (result.rows[0].user_id === req.session.id);
          if (tf) {
            pool
            .query(`SELECT * FROM passwords WHERE id = ${req.params.pw_id}`)
            .then((result) => {
              const webpw = result.rows[0];
              const templateVars = {email: req.session.email, webpw: webpw};
              res.render("edit", templateVars);
            })
          } else {
            res.send("your are not the creator of this password and you cannot delete this password");
          }
        })
      }
  });


  router.post("/:pw_id", (req, res) => {
      const newPW = hashPW(req.body.text);
      console.log("this is the newPW: ", newPW);

      return  pool
      .query(`UPDATE passwords
      SET website_password = '${newPW}'
      WHERE id = '${req.params.pw_id}';` )
      .then(res.redirect('/'))
  })
  return router;
};

