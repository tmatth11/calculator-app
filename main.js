const display = document.getElementById("display");
let storedNumber = 0;
let storedOperator = null;
let isCalculated = false;

// Appends the input to the display
function appendToDisplay(input) {
    if (isOperator(input)) {
        if (input === '%') {
            display.value = parseFloat(display.value) / 100;
        } else {
            if (storedOperator !== null && storedNumber !== null) {
                calculate();
            }
            storedNumber = parseFloat(display.value);
            storedOperator = input;
            clearDisplay();
            isCalculated = false;
        }
    } else {
        if (isCalculated) {
            clearDisplay();
            isCalculated = false;
        }
        if (display.value === '0') {
            display.value = input;
        } else {
            display.value += input;
        }
    }
}

// Checks if the input is an operator
function isOperator(input) {
    return ['+', '-', '*', '/', '%'].includes(input);
}

// Clears the display
function clearDisplay() {
    display.value = "";
}

// Calculates the result
function calculate() {
    try {
        if (storedOperator !== null && storedNumber !== null && display.value !== "") {
            let secondNumber = parseFloat(display.value);
            let result;
            if (storedOperator === '%') {
                result = (storedNumber / 100).toFixed(9);
            } else {
                result = eval(storedNumber + storedOperator + secondNumber).toFixed(9);
            }
            // Check if the result is an integer
            if (Number.isInteger(parseFloat(result))) {
                result = parseInt(result, 10);
            }
            display.value = Number(result); // Convert result to Number to remove trailing zeros
            storedOperator = null;
            storedNumber = null;
            isCalculated = true;
        }
    } catch (error) {
        display.value = "Error";
    }
}

// Toggles the sign of the current value
function toggleSign() {
    var display = document.getElementById("display");
    var currentValue = parseFloat(display.value);
    display.value = -currentValue;
}

// Stores the '%' operator
function calculatePercentage() {
    let currentValue = parseFloat(display.value);
    display.value = Number((currentValue / 100).toFixed(9)); 
}