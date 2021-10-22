const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Delete function route
  router.post("/:pw_id", (req, res) => {
    const passwordID = req.params.id;

    if (req.session.id === undefined) {
      res.redirect("login");
    } else {
      db.query(
        `SELECT user_id FROM passwords
                WHERE id = ${passwordID};`
      ).then((result) => {
        const tf = result.rows[0].user_id === req.session.id;
        if (tf) {
          db.query(
            ` DELETE FROM passwords
                WHERE id = ${passwordID}
                `
          ).then(() => {
            res.redirect("/");
          });
        } else {
          res.send(
            "your are not the creator of this password and you cannot delete this password"
          );
        }
      });
    }
  });

  return router;
};
