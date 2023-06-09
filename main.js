// 
const password_elem = document.querySelector('#password');
const length_elem = document.querySelector('#length');
const uppercase_elem = document.querySelector('#uppercase');
const lowercase_elem = document.querySelector('#lowercase');
const numbers_elem = document.querySelector('#numbers');
const symbols_elem = document.querySelector('#symbols');
const copy_status = document.querySelector('#copy-status');
const password_strength = document.querySelector('#password-strength');

const generate_btn = document.querySelector('#generate');
generate_btn.addEventListener('click', generatePassword);
//generate_btn.addEventListener('click', fillPassword);
const copy_btn = document.querySelector('#copy');
copy_btn.addEventListener('click', copyPassword);

// the characters and symbols that will be used to generate the password
const uppercase_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase_chars = "abcdefghijklmnopqrstuvwxyz";
const numbers_chars = "0123456789";
const symbols_chars = "!@#$%^&*()_+~`|}{[]\:;?><,./-=";


/* // Get the currently active tab
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // Inject a content script into the tab
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: fillPassword,
    });
  });
  
  // Define the function that will fill in the password field
function fillPassword() {
    // Replace "#password" with the ID of your password field
    var passwordField = document.querySelector("#password");
  
    // Replace "generatedPassword" with the generated password you want to fill in
    passwordField.value = generatePassword();
} */
  
function generatePassword() {
    // reset the copy status to copy
    copy_status.innerHTML = "copy";
    // reser the password status
    password_strength.innerHTML = ``;
    // to make sure that the length is at least 8 characters
    if (length_elem.value < 8) {
        password_strength.innerHTML = `<p style="color:red;font-size: 17px;"> password under than 8 character is weak </p>`;
        length_elem.value = 8;
    }

    let length = length_elem.value;
    let password = "";
    let chars = "";

    // check if the user wants to use uppercase, lowercase, numbers and symbols
    // and add them to the chars variable
    chars += uppercase_elem.checked? uppercase_chars : "";
    chars += lowercase_elem.checked? lowercase_chars : "";
    chars += numbers_elem.checked? numbers_chars : "";
    chars += symbols_elem.checked? symbols_chars : "";

    // 
    for (let i = 0; i < length; i++) {
        let rand = Math.floor(Math.random() * chars.length);
        password += chars.substring(rand, rand + 1);

    }
    console.log(password);
    password_elem.value = password;
    return password;
}


async function copyPassword() {
    const password = password_elem.value;
    
    // check if password is empty
    if (!password) return;

    // check if we have access to the clipboard
    if (!navigator.clipboard) {
        alert('Clipboard API not supported');
        return;
    }
    // add password to clipboard
    await navigator.clipboard.writeText(password);
    // acknowledge user that password was copied
    copy_status.innerHTML = "copied!";
}