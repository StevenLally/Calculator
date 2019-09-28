//basic operation functions
function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator, a, b){
    switch (operator){
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "*":
            return multiply(a, b);
            break;
        case "/":
            return divide(a, b);
    }
}
/*
solve equation in array form following correct order of operations (mult and div left to 
right followed by add and subtract)
*/
function solve(arr){
    while (arr.length > 2){
        let a = arr.indexOf("+"); //add index
        let s = arr.indexOf("-"); //subtract index
        let m = arr.indexOf("*"); //mult. index
        let d = arr.indexOf("/"); //div. index

        if (m >= 0 && d >= 0){
            if (m < d){
                arr.splice(m - 1, 3, operate(arr[m], Number(arr[m - 1]), Number(arr[m + 1])));
            } else {
                arr.splice(d - 1, 3, operate(arr[d], Number(arr[d - 1]), Number(arr[d + 1])));
            }
        } else if (m >= 0){
            arr.splice(m - 1, 3, operate(arr[m], Number(arr[m - 1]), Number(arr[m + 1])));
        } else if (d >= 0){
            arr.splice(d - 1, 3, operate(arr[d], Number(arr[d - 1]), Number(arr[d + 1])));
        } else if (a >= 0 && s >= 0){
            if (a < s) {
                arr.splice(a - 1, 3, operate(arr[a], Number(arr[a - 1]), Number(arr[a + 1])));
            } else {
                arr.splice(s - 1, 3, operate(arr[s], Number(arr[s - 1]), Number(arr[s + 1])));
            }
        } else if (a >= 0){
            arr.splice(a - 1, 3, operate(arr[a], Number(arr[a - 1]), Number(arr[a + 1])));
        } else if (s >=0){
            arr.splice(s - 1, 3, operate(arr[s], Number(arr[s - 1]), Number(arr[s + 1])));
        }
        console.log(arr);
    }
    return arr;
}

function updateDisplay(){
    display.textContent = equation.join(" ");
    input.textContent = inputText.join("");
}

let equation = [];
let inputText = [];

const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const input = document.querySelector(".input");

//event listeners for each button on calculator
for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", function(){
        
        switch (buttons[i].textContent){
            case "AC":
                equation = [];
                inputText = [];
                updateDisplay();
                break;
        
            case "=":
                equation.push(inputText.join(""));
                display.textContent = equation.join(" ");
                let result = solve(equation);
                input.textContent = result[0];
                equation = [];
                inputText = [];
                break;
                
            case ".":
                if (!inputText.includes(".")){
                    inputText.push(".");
                }
                break;
        
            case "+":
            case "-":
            case "*":
            case "/":
                if (equation.length == 0 && inputText.length == 0){
                    break;
                }
                equation.push(inputText.join(""));
                equation.push(buttons[i].textContent);
                inputText = [];
                updateDisplay();
                break;
        
            default:
                inputText.push(buttons[i].textContent);
                updateDisplay();
        }
    });
}


