window.addEventListener("keydown", keyInput);
const screen = document.querySelector(".screen");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButton = document.querySelectorAll("[data-operator");
const equalsButton = document.querySelector("[data-equals]");
const percentButton = document.querySelector("[data-percent]");
const decimalButton = document.querySelector("[data-decimal]");




equalsButton.addEventListener("click", () => evaluate());
percentButton.addEventListener("click", () => convertToPercent());
decimalButton.addEventListener("click", () => decimalHandler());
var operandTriggered = false;
var firstOp = null;
var secondOp = null;
var operator = null;


numberButtons.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButton.forEach(button => button.addEventListener("click", () => performOperation(convertOperator(button.textContent))));

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => clearScreen());

const negateButton = document.querySelector("[data-negative]");
negateButton.addEventListener("click", () => negateScreen());


function negateScreen() {
    screen.textContent = -Number(screen.textContent);
}


function convertToPercent() {
    num = Number(screen.textContent);
    num /= 100;
    screen.textContent = num.toString();
}

function decimalHandler() {
    console.table(`${firstOp} ${operator} ${secondOp}`);

    if (screen.textContent == 0) {
        screen.textContent = "0.";
        firstOp = Number(screen.textContent);
    } else if (screen.textContent.includes("!")) {
        screen.textContent = "Stop that!";
    } else if (!screen.textContent.includes(".")) {
        screen.textContent += "."
    }


}

function appendNumber(num) {
    if (screen.textContent == "0" || screen.textContent === "No way, Jose!" || operandTriggered) {
        screen.textContent = num;
        operandTriggered = false;
    } else {
        screen.textContent += num;
    }
}

function performOperation(op) {
    if (operator != null) {
        evaluate();
    }
    operator = op;
    firstOp = Number(screen.textContent)
    operandTriggered = true;

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
    }
}

function clearScreen() {
    screen.textContent = "0";
    operator = null;
    firstOp = 0;
    secondOp = 0;
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
            result = (b !== 0) ? divide(a, b) : "No way, Jose!";
            break;
        default:
            result = null;
            console.log("In operate, this should NEVER happen!");
            break;
    }

    return result;
}


