/*
========================================
A Web Based Calculator
Written By: Dan Menjivar - 2021
========================================
*/


/*
========================================
Global Variables
========================================
*/
const screen = document.querySelector(".screen");
var operandTriggered = false;
var firstOp = null;
var secondOp = null;
var operator = null;
const errorMsgs = ["No way, Jose!", "wtf", "u good?", "no go", "ask again later"]


/*
========================================
Event Handlers
========================================
*/

window.addEventListener("keydown", keyInput);

const numberButtons = document.querySelectorAll("[data-number]");
numberButtons.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.textContent))
);

const operatorButton = document.querySelectorAll("[data-operator]");
operatorButton.forEach(button => button.addEventListener("click", () => performOperation(convertOperator(button.textContent))));

const equalsButton = document.querySelector("[data-equals]");
equalsButton.addEventListener("click", () => evaluate());

const negateButton = document.querySelector("[data-negative]");
negateButton.addEventListener("click", () => negateScreen());

const percentButton = document.querySelector("[data-percent]");
percentButton.addEventListener("click", () => convertToPercent());

const decimalButton = document.querySelector("[data-decimal]");
decimalButton.addEventListener("click", () => decimalHandler());

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => clearScreen());

const backspaceButton = document.querySelector("[data-backspace]");
backspaceButton.addEventListener("click", () => backspaceHandler());


/*
========================================
Helper Handler Functions for Listeners
========================================
*/

function keyInput(e) {
    const key = e.key;
    if (key >= 0 && key <= 9) {
        appendNumber(key)
    } else if (key === "+" || key === "-" || key === "/" || key === "*") {
        performOperation(key);
    } else if (key === "=" || key === "Enter") {
        evaluate();
    } else if (key === "clear") {
        clearScreen();
    } else if (key === ".") {
        decimalHandler();
    } else if (key === "Backspace") {
        backspaceHandler();
    }
}

function convertOperator(op) {
    let operator = "";
    switch (op) {
        // + 
        case "\u002B":
            operator = "+";
            break;
        // -
        case "\u2212":
            operator = "-";
            break;
        // *
        case "\u00d7":
            operator = "*"
            break;
        // Divide
        case "\u00f7":
            operator = "/";
            break;
        default:
            break;
    }
    return operator;
}

function negateScreen() {
    screen.textContent = -Number(screen.textContent);
}

function convertToPercent() {
    num = Number(screen.textContent);
    num /= 100;
    screen.textContent = num.toString();
}

function decimalHandler() {
    console.table(`a: ${firstOp} op: ${operator} b: ${secondOp}`);

    if (!screen.textContent.includes(".")) {
        screen.textContent += ".";
    }
}

function clearScreen() {
    screen.textContent = "0";
    operator = null;
    firstOp = 0;
    secondOp = 0;
}

function backspaceHandler() {
    screen.textContent = screen.textContent.slice(0, -1);

    if (screen.textContent.length === 0) {
        screen.textContent = "0";
    }
}

function appendNumber(num) {
    console.log(`In appendNumber, textContent: ${screen.textContent}, operandTriggered: ${operandTriggered}`);
    const screenText = screen.textContent;

    if (screenText == "0." && operandTriggered) {
        screen.textContent += num;
        operandTriggered = false;
    } else if (isErrorMessage(screenText) || screenText === "0" || operandTriggered) {
        screen.textContent = num;
        operandTriggered = false;
    } else {
        screen.textContent += num;
    }



    // if (isClearScreenNecessary(screen.textContent)) {
    //     screen.textContent = num;
    //     operandTriggered = false;
    // } else {
    //     screen.textContent += num;
    // }
}

function isClearScreenNecessary(screenView) {
    return screenView === "0" || screenView === "No way, Jose!" || (operandTriggered && !screenView.includes("."))
}


/*
========================================
Error Handling
========================================
*/

function generateErrorMessage() {
    return errorMsgs[Math.floor(Math.random() * errorMsgs.length)]
}

function isErrorMessage(msg) {
    return errorMsgs.includes(msg);
}


function performOperation(op) {
    console.log(`In performOperation`);

    if (operator != null) {
        evaluate();
    }
    operator = op;
    firstOp = Number(screen.textContent)
    secondOp == null;
    operandTriggered = true;
    console.log(`In performOperation() ${firstOp} ${op} ${secondOp} ${operandTriggered}`);
}




function evaluate() {
    if (firstOp !== null && !operandTriggered) {
        secondOp = Number(screen.textContent);
        let result = operate(firstOp, secondOp, operator);
        console.log(`${firstOp} ${operator} ${secondOp} = ${result}`);
        screen.textContent = result;
        firstOp = null;
    }
}



/*
========================================
Calculator Implementation
========================================
*/
function operate(a, b, op) {
    let result = null;

    switch (op) {
        case '+':
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "*":
            result = multiply(a, b);
            break;
        case "/":
            result = (b !== 0) ? divide(a, b) : generateErrorMessage();
            break;
        default:
            result = null;
            console.log("In operate, this should NEVER happen!");
            break;
    }

    return result;
}


/*
========================================
Core Calculator Functions
========================================
*/
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



