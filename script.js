const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let resetNext = true;
let currentOperator = null;
let firstOperand = null;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const char = button.textContent.trim();

    if (button.classList.contains("clear")) {
      clearDisplay();
    } else if (button.classList.contains("equals")) {
      calculateResult();
    } else if (button.classList.contains("operator")) {  // ✅ use operator class
      setOperator(char);
    } else if (char === ".") {
      appendDecimal();
    } else {
      appendToDisplay(char);
    }
  });
});


function appendToDisplay(char) {
  // Replace display if it's "0" or after operator/result
  if (display.textContent === "0" || resetNext) {
    display.textContent = char;
  } else {
    display.textContent += char;
  }
  resetNext = false;
}

function appendDecimal() {
  if (resetNext) {
    display.textContent = "0.";
    resetNext = false;
  } else if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
}

function clearDisplay() {
  display.textContent = "0";
  resetNext = true;
  firstOperand = null;
  currentOperator = null;
}

function setOperator(op) {
  const currentValue = parseFloat(display.textContent);

  if (firstOperand !== null && !resetNext) {
    calculateResult();
  } else {
    firstOperand = currentValue;
  }

  currentOperator = op;
  resetNext = true;
}

function calculateResult() {
  if (currentOperator && firstOperand !== null) {
    const secondOperand = parseFloat(display.textContent);
    let result;

    switch (currentOperator) {
      case "+": result = firstOperand + secondOperand; break;
      case "-": result = firstOperand - secondOperand; break;
      case "*": result = firstOperand * secondOperand; break;
      case "/": result = firstOperand / secondOperand; break;
    }

    display.textContent = result;
    firstOperand = result;
    currentOperator = null;
    resetNext = true;
  }
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // stop automatic prompt
  deferredPrompt = e;

  // Create an install button
  const btn = document.createElement('button');
  btn.textContent = "Install Calculator";
  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.right = "20px";
  btn.style.padding = "10px 20px";
  btn.style.zIndex = "1000";
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      console.log("User choice:", choice.outcome);
      deferredPrompt = null;
      btn.remove();
    });
  });
});
