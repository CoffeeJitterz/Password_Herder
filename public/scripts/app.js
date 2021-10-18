// Client facing scripts here
$(() => {
  $("#copy").click(() => {
   const copyPassword = $("copy_password");
    copyPassword.select();
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyPassword.value);
    /* Alert the copied text */
    alert("Copied the text: " + copyPassword.value);
  })
});

function generatePassword(){
  let password = "";

    let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowerCase = "abcdefghijklmnopqrstuvwxyz";
    let number = "0123456789";
    let symbol = "!@#$%&* %";
    let length = "12";
    let characters = upperCase + lowerCase + number + symbol;
  for (let i = 0; i < length; i++){
    //generatePassword
    createPassword = characters.charAt(Math.floor(Math.random() * characters.length));
    password += createPassword ;
  }
  document.getElementById('#pass-text').value = password;

};



// Copy password button
function copy() {
  // get password from input text field
  var copyText = document.getElementById("#pass-text");
  //Copy the text from the text field
  navigator.clipboard.writeText(copyText.value);
};

