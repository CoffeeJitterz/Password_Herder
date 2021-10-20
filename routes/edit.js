const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => { /// user shout: give me the page of my password
  // verification user's identification
  // 1. user is the creator of this password
  // 2. user has logged in

  // server gonna provide the user the place to change the password
  // server gonna provide the current existing password
    const templateVars = {email: ""};
    res.render("edit", templateVars);


    // db.query(`SELECT * FROM passwords;` )
    //   .then(data => {
    //     console.log("line 17", req.params);
    //     // const users = data.rows;
    //     // res.json({ users });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
  });



  router.post("/", (req, res) => {
    console.log("I AM EDIT")
  })

  return router;
};
