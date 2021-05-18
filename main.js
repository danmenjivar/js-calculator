window.addEventListener("keydown", keyInput);
const screen = document.querySelector(".screen");
const numberButtons = document.querySelectorAll("[data-number]");


numberButtons.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.textContent))
);

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => clearScreen());


function appendNumber(num) {
    console.log(`Clicked on ${num}`);
    if (screen.textContent == "0") {
        screen.textContent = num;
    } else {
        screen.textContent += num;
    }
}

function keyInput(e) {
    const key = e.key;
    if (key >= 0 && key <= 9) {
        appendNumber(key)
    }
}

function clearScreen() {
    screen.textContent = "0";
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
    const result = null;
    a = Number(a);
    b = Number(b);

    switch (op) {
        case '+':
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
        case "*":
            result = multiply(a, b);
        case "/":
            result = (b !== 0) ? divide(a, b) : null;
        default:
            result = null;
            console.log("In operate, this should NEVER happen!");
            break;
    }

    return result;
}


