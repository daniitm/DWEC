// script.js
let displayValue = '';
let firstOperand = null;
let secondOperand = null;
let currentOperation = null;

// Actualiza el valor mostrado en pantalla
function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue || '0';
}

// Agrega un número al valor actual
function appendNumber(number) {
    if (number === '.' && displayValue.includes('.')) return; // Evita múltiples puntos decimales
    displayValue += number;
    updateDisplay();
}

// Configura la operación
function setOperation(operation) {
    if (currentOperation !== null) calculate();
    firstOperand = parseFloat(displayValue);
    currentOperation = operation;
    displayValue = '';
}

// Realiza el cálculo
function calculate() {
    if (currentOperation === null || displayValue === '') return;
    secondOperand = parseFloat(displayValue);
    
    switch (currentOperation) {
        case '+':
            displayValue = (firstOperand + secondOperand).toString();
            break;
        case '-':
            displayValue = (firstOperand - secondOperand).toString();
            break;
        case '*':
            displayValue = (firstOperand * secondOperand).toString();
            break;
        case '÷':
            displayValue = secondOperand === 0 ? 'Error' : (firstOperand / secondOperand).toString();
            break;
    }

    currentOperation = null;
    firstOperand = null;
    updateDisplay();
}

// Borra el display y reinicia valores
function clearDisplay() {
    displayValue = '';
    firstOperand = null;
    secondOperand = null;
    currentOperation = null;
    updateDisplay();
}

// Inicia la pantalla con valor 0
updateDisplay();