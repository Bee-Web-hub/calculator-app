console.log("JS is working!");

// Get the display box
const display = document.getElementById("display");

// Get all the buttons
const buttons = document.querySelectorAll("button");

// Add event listeners to each button
buttons.forEach(button => {
  button.addEventListener("click", () => {
    // If the button is "C" -> clear the display
    if (button.textContent === "C") {
      display.value = "";
    } 
    // If the button is "=" -> evaluate the expression
    else if (button.textContent === "=") {
      try {
        display.value = eval(display.value); // ⚠️ for now we use eval (simple way)
      } catch {
        display.value = "Error";
      }
    } 
    // Otherwise, add the button text to the display
    else {
      display.value += button.textContent;
    }
  });
});


// Keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  // If number or operator
  if (/[0-9+\-*/.]/.test(key)) {
    display.value += key;
  } 
  // Enter = evaluate
  else if (key === "Enter") {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  } 
  // Backspace = remove last character
  else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } 
  // C or c = clear
  else if (key.toLowerCase() === "c") {
    display.value = "";
  }

  // Prevent default action (like form submission on Enter)
  event.preventDefault();
});
