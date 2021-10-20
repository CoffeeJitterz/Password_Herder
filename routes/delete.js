const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/:id/delete", (req, res) => {
    // console.log("I AM DELETE")
  const passwordID = req.params.id;
  // console.log(passwordID);

  if (req.session.id === undefined) {
    res.redirect("login");
    } else {
      db.query (`SELECT user_id FROM passwords
                WHERE id = ${passwordID};`)
      .then((result) => {
        // console.log("expecting result", result.rows[0].user_id);
        // console.log("expecting req.session.id", req.session.id);
        const tf = (result.rows[0].user_id === req.session.id);
        console.log("expecting true or false", tf);
        if (tf) {
          db
          .query(` DELETE FROM passwords
                WHERE id = ${passwordID}
                `)
          .then(() => {
          res.redirect("/");
          })
        } else {
          res.send("your are not the creator of this password and you cannot delete this password");
        }
      })
    }
  })

  return router;
};



