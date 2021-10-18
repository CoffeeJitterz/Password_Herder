const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // router.get("/", (req, res) => {
  //     res.render ("index");
  //   });
  router.get("/", (req, res) => {
    db.query(`SELECT websites.name, website_username, website_password
    FROM passwords
    JOIN websites ON websites.id = website_id;`)
    .then(data => {
      const passwords = data.rows;
      console.log(passwords);
      const templateVars = {passwords};
      res.render("index", templateVars);
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });



  return router;
};

// //create password
// const createPassword = (passwords) => {
//   //const $password_container = $('#password_container');
//    $password_container.empty();

//   for(const password of passwords) {
//     //serperate inputs
//     const website = password.name;
//     const username = password.website_username
//     const password = password.website_password
//     //create HTML insery
//     const singlePassword = `
//     <tbody>
//     <tr>
//       <th scope="row">1</th>
//       <td>${website}</td>
//       <td>${username}</td>
//       <td>${password}</td>
//       <td><button>COPY</button></td>
//       <td><button>EDIT</button></td>
//       <td><button>DELETE</button></td>
//     </tr>
//   </tbody>
// </table>
//     `
//     $password_container.prepend(singlePassword);

//   };
// };
