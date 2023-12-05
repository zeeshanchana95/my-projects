const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"]

const lettersAndNumbers = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const lettersAndSymbols = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"]

const numbersAndSymbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]

const lettersNumbersSymbols = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];


let passwordOneEl = document.getElementById("password-one-el")
let passwordTwoEl = document.getElementById("password-two-el")
let passwordLenEl = document.getElementById("password-len-el")

let addAlphabetsEl = document.getElementById("add-alphabets")
let addNumbersEl = document.getElementById("add-numbers")
let addSymbolsEl = document.getElementById("add-symbols")

let statusEl = document.getElementById("status")

//generate passwords
function passwords() {
    
    // console.log("gen")
    
    let passwordOne = generatePassword()
    let passwordTwo = generatePassword()
    
    passwordOneEl.textContent = passwordOne
    passwordTwoEl.textContent = passwordTwo   
    
    
}

//generate individual password
function generatePassword() {
    
    let isPasswordGenerated = false
    
    let randomNumber = 0
    let randomPassword = ""
    
    let passwordLength = +passwordLenEl.value
    if(passwordLength === 0) {
        passwordLength = 15
    }
    
    //generate password via criteria
    let isLetters = checkText();
    let isNumbers = checkNumbers();
    let isSymbols = checkSymbols();
    
    //when only one is true
    if(isLetters && isNumbers == false && isSymbols == false) {
      for(let i = 0; i <  passwordLength; i++) {
            randomNumber = Math.floor(Math.random() * letters.length)
            randomPassword += letters[randomNumber]
        }
        isPasswordGenerated = true
    }
    else if (isNumbers && isLetters == false && isSymbols == false) {
        for(let i = 0; i <  passwordLength; i++) {
            randomNumber = Math.floor(Math.random() * numbers.length)
            randomPassword += numbers[randomNumber]
        }
        isPasswordGenerated = true
    }
    else if (isSymbols && isLetters == false && isNumbers == false) {
        for(let i = 0; i <  passwordLength; i++) {
            randomNumber = Math.floor(Math.random() * symbols.length)
            randomPassword += symbols[randomNumber]
        }
        isPasswordGenerated = true
    }
    
    //when two conditions true
    else if(isLetters  && isNumbers && isSymbols == false) {
      for(let i = 0; i <  passwordLength; i++) {
            randomNumber = Math.floor(Math.random() * lettersAndNumbers.length)
            randomPassword += lettersAndNumbers[randomNumber]
        }
    }
    else if (isLetters && isSymbols && isNumbers == false) {
        for(let i = 0; i <  passwordLength; i++) {
            randomNumber = Math.floor(Math.random() * lettersAndSymbols.length)
            randomPassword += lettersAndSymbols[randomNumber]
        }
        isPasswordGenerated = true
    }
    else if (isNumbers && isSymbols && isLetters == false) {
        for(let i = 0; i <  passwordLength; i++) {
            randomNumber = Math.floor(Math.random() * numbersAndSymbols.length)
            randomPassword += numbersAndSymbols[randomNumber]
        }
        isPasswordGenerated = true
    }
    
    //three conditions
     else if (isLetters == true && isNumbers == true && isSymbols == true) {
        for(let i = 0; i <  passwordLength; i++) {
            randomNumber = Math.floor(Math.random() * lettersNumbersSymbols.length)
            randomPassword += lettersNumbersSymbols[randomNumber]
        }
        isPasswordGenerated = true
    } 
    else if(isLetters == false && isNumbers == false && isSymbols == false){
        statusEl.textContent = "Please check checkboxes given"
    }
    
    
    //check password status
    if(isPasswordGenerated) {
        statusEl.textContent = "Password Generated Successfully"
    } else {
         statusEl.textContent = "Please check given checkboxes"
    }

    return randomPassword
}

//check criteria
function checkText() {
    return addAlphabetsEl.checked === true;
}
function checkNumbers() {
      return addNumbersEl.checked === true;
}
function checkSymbols() {
    return addSymbolsEl.checked === true;
}

//copy to clipboard functionality
function copyOneToClipboard() {
    var range = document.createRange();
    range.selectNode(document.getElementById("password-one-el"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}
function copyTwoToClipboard() {
    var range = document.createRange();
    range.selectNode(document.getElementById("password-two-el"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}

