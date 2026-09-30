
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
let num1 = null;
let num2 = null;
let currentOperator = null;
let result = null;
let awaitingNum2 = false;

window.onload = function() {
  const numberIds = ['0','1','2','3','4','5','6','7','8','9'];
  numberIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => {
        // If waiting for num2, clear buffer
        if (awaitingNum2) {
          inputBuffer.clear();
          awaitingNum2 = false;
        }
        inputBuffer.append(id);
        updateDisplay(inputBuffer.getString());
        // Store as num1 or num2
        if (currentOperator === null) {
          num1 = inputBuffer.getNumber();
        } else {
          num2 = inputBuffer.getNumber();
        }
      });
    }
  });

  // Operator buttons
  const operatorIds = ['+','-','*','/'];
  operatorIds.forEach(op => {
    const btn = document.getElementById(op);
    if (btn) {
      btn.addEventListener('click', () => {
        if (currentOperator !== null && num2 !== null) {
          // Chain operation
          num1 = operate(currentOperator, num1, num2);
          updateDisplay(num1);
          inputBuffer.clear();
          num2 = null;
        }
        currentOperator = op;
        awaitingNum2 = true;
      });
    }
  });

  // Equals button
  const eqBtn = document.getElementById('=');
  if (eqBtn) {
    eqBtn.addEventListener('click', () => {
      if (currentOperator !== null && num2 !== null) {
        result = operate(currentOperator, num1, num2);
        updateDisplay(result);
        num1 = result;
        num2 = null;
        currentOperator = null;
        inputBuffer.clear();
      }
    });
  }

  // Clear button
  const clearBtn = document.getElementById('clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      num1 = null;
      num2 = null;
      currentOperator = null;
      result = null;
      inputBuffer.clear();
      updateDisplay('');
    });
  }
};

