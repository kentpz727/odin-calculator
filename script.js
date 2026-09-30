let num1;
let num2;
let operator;
let currentSum;

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

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return null;
  }
}

function updateDisplay(value) {
  const display = document.getElementById('display');
  display.textContent = value;
}

// Stores input as a string, concatenates on button press, returns as number
function createInputBuffer() {
  let buffer = '';
  return {
    append: (val) => { buffer += val; return buffer; },
    clear: () => { buffer = ''; },
    getNumber: () => Number(buffer),
    getString: () => buffer
  };
}

// Simple number button listeners
const inputBuffer = createInputBuffer();
window.onload = function() {
  const numberIds = ['0','1','2','3','4','5','6','7','8','9'];
  numberIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => {
        inputBuffer.append(id);
        updateDisplay(inputBuffer.getString());
      });
    }
  });
};

