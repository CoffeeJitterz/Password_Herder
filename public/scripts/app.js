// Client facing scripts here
// $(() => {
//   $("#copy").click(() => {
//    const copyPassword = $("#copy_password");
//     copyPassword.select();
//      /* Copy the text inside the text field */
//     navigator.clipboard.writeText(copyPassword.value);
//     /* Alert the copied text */
//     alert("Copied the text: " + copyPassword.value);
//   })
// });
function generatePassword() {
  let password = "";
  let characters = "";
  let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lowerCase = "abcdefghijklmnopqrstuvwxyz";
  let number = "0123456789";
  let symbol = "!@#$%&*%";
  let isUpperCase = document.getElementById('upperCase').checked;
  let isLowerCase = document.getElementById('lowerCase').checked;
  let isNumber = document.getElementById('number').checked;
  let isSymbol = document.getElementById('symbols').checked;
  let passwordLength = document.getElementById('pwdlength').value;

  if (isUpperCase) {
    characters = characters + upperCase;
  }
  if (isLowerCase) {
    characters = characters + lowerCase;
  }
  if (isNumber) {
    characters = characters + number;
  }
  if (isSymbol) {
    characters = characters + symbol;
  }
  for (let i = 0; i < passwordLength; i++) {
    //generatePassword
    createPassword = characters.charAt(Math.floor(Math.random() * characters.length));
    password += createPassword;
  }
  document.getElementById('pass-text').value = password;

  if (!(isUpperCase || isLowerCase || isNumber || isSymbol)) {

    $(".empty").hide();
    return;
  }
  //  return password;
};

// Copy password button
// function copy() {
//   // get password from input text field
//   let copyText = document.getElementById('pass-text').value;
//   console.log("copyText:", copyText);
//   //Copy the text from the text field
//   navigator.clipboard.writeText(copyText);
// };


$(document).ready(function() {
  $('#copy').click(function () {
    navigator.clipboard.writeText($("#pass-text").val());
  });
});
