// Define initial variables
let num1 = '0';
let num2 = '0';
let currentNumber = '0';
let operator = '+';
let outcome;
let result = '';
let lastButton = '';
let lastOperator = '';
let prevNum = '';

// Select buttons, input screen, and result screen elements from the DOM
const buttons = document.querySelectorAll('.btn');
const inputScreen = document.querySelector('.input-screen');
const resultScreen = document.querySelector('.result-screen');

// Add event listener to buttons
buttons.forEach(button => { 
  button.addEventListener('click', () => {
    let prevChar = '';

    // Handle clearing result screen
    if (lastButton === '=') {
      resultScreen.textContent = '';
    }

    // Display the result when '=' is clicked
    if (inputScreen.textContent.includes('=')){
      inputScreen.textContent = result;
    } 

    // Handle numeric buttons
    if (Number(button.textContent) >= 0 && Number(button.textContent) <= 9) {
      if (currentNumber !== '0' || button.textContent !== '0') {
        if (currentNumber === '0') {
          currentNumber = button.textContent;
        } else {
          currentNumber += button.textContent;
        }
        inputScreen.textContent += button.textContent;
      }

      // Handle '0' button after an operator
      if (button.textContent === '0') {
        if (/[+\-×÷]/.test(lastButton)) {
          currentNumber = button.textContent;
          inputScreen.textContent += button.textContent;
        }
      }
    } else if(button.textContent === "Clear" || button.textContent === "Delete" || button.textContent === "."){
      switch (button.textContent) {
        case "Clear" :
          clearScreen();
          break;
        case "Delete" :
          prevChar = deleteChar();
          break;
        case "." :
          if (!currentNumber.includes('.')) {
            currentNumber += button.textContent;
            inputScreen.textContent += currentNumber;
          }
      }
    } else {
      // Handle operators
      if (num1 == '0' || operator === '=') {
        console.log(currentNumber);
        num1 = currentNumber;
      } else {
        num2 = currentNumber;
        console.log(num2);
      }
      if (num1 === '0' && currentNumber === '0' && /[+\-]/.test(button.textContent)) {
        currentNumber = button.textContent;
      }
      switch(button.textContent) {
        case "+" :
          operator = button.textContent;
          break;
        case "-" :
          operator = button.textContent;
          break;
        case "÷" :
          operator = "/";
          break;
        case "×" :
          operator = "*";
          break;
        case "=" :
          // Perform the calculation and update the result
          result = operate(operator, num1, num2);
          num1 = result;
          currentNumber = result;
          num2 = '0';
          operator = '=';
          resultScreen.textContent = result;
          break;
      }

      // Handle intermediate calculations
      if (operator !== '=') {
        prevNum = currentNumber;
        if(/\d/.test(currentNumber)) {
          if (/[+\-×÷]/.test(inputScreen.textContent) ) {
            result = operate(lastOperator, num1, num2);
            num1 = result;
            num2 = '0';
            currentNumber = '0';
            resultScreen.textContent = result;
          }
          currentNumber = '0';
        }
      }

      // Handle division by zero error
      if (result === undefined) {
        alert("Can't divide by zero");
        clearScreen();
      } else {
        lastOperator = operator;
        inputScreen.textContent += operator;

        // Replace '*' and '/' with '×' and '÷' for display
        inputScreen.textContent = inputScreen.textContent
          .replace('*', '×')
          .replace('/', '÷');
      }
    }

    // Update the last button
    if (prevChar === '') {
      prevChar = button.textContent
    }
    lastButton = prevChar;
  });
});

// Function to clear the screen
function clearScreen() {
  num1 = '0';
  num2 = '0';
  currentNumber = '0';
  operator = '';
  result = '';
  inputScreen.textContent = '';
  resultScreen.textContent = '0';
  lastButton = '';
}

// Function to delete the last character
function deleteChar() {
  if (lastButton === '') {
    return;
  }
  if ((Number(lastButton) >= 0 && Number(lastButton) <= 9) || lastButton === '.') {
    currentNumber = Math.floor(currentNumber / 10);
    inputScreen.textContent = inputScreen.textContent.slice(0, -1);
    return inputScreen.textContent.charAt(inputScreen.textContent.length - 1);
  } else if (/[+-×÷]/.test(lastButton)) {
    inputScreen.textContent = inputScreen.textContent.slice(0, -1);
    currentNumber = num1;
    num2 = 0;
  }
}

// Function to perform arithmetic operations
function operate(operator, a, b) {
  console.log(a, operator, b)
  a = Number(a);
  b = Number(b);
  let result;
  switch (operator) {
    case '+':
      result = add(a, b);
      break;
    case '-':
      result = subtract(a, b);
      break;
    case '*':
      result = multiply(a, b);
      break;
    case '/':
      if (b === 0) {
        result = undefined;
      } else {
        result = divide(a, b);
      }
      break;
    default:
      result = null;
  }
  return parseFloat(result.toFixed(3));
}

// Arithmetic operation functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

