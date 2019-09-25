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

let arr = [2, "+", 6, "/", 6, "+", 2, "*", 3, "-", 5 , "+"];

function solve(arr){
    while (arr.length > 2){
        let a = arr.indexOf("+"); //add index
        let s = arr.indexOf("-"); //subtract index
        let m = arr.indexOf("*"); //mult. index
        let d = arr.indexOf("/"); //div. index

        if (m >= 0 && d >= 0){
            if (m < d){
                arr.splice(m - 1, 3, operate(arr[m], arr[m - 1], arr[m + 1]));
            } else {
                arr.splice(d - 1, 3, operate(arr[d], arr[d - 1], arr[d + 1]));
            }
        } else if (m >= 0){
            arr.splice(m - 1, 3, operate(arr[m], arr[m - 1], arr[m + 1]));
        } else if (d >= 0){
            arr.splice(d - 1, 3, operate(arr[d], arr[d - 1], arr[d + 1]));
        } else if (a >= 0){
            arr.splice(a - 1, 3, operate(arr[a], arr[a - 1], arr[a + 1]));
        } else if (s >=0){
            arr.splice(s - 1, 3, operate(arr[s], arr[s - 1], arr[s + 1]));
        }
        console.log(arr);
    }
    return arr;
}
console.log(solve(arr));


let equation = [];

const buttons = document.querySelectorAll("button");
const backspace = document.querySelector(".backspace");
const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");
const display = document.querySelector(".display");
const input = document.querySelector(".input");


/*
Won't work as written, need:
    1. number presses to add to a string and update input textContent
    
    2. event listeners for operators to add string then operator to 
    equation arr, clear string
*/
for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", function(){
        console.log(buttons[i].textContent);
        if (buttons[i] == backspace && equation.length > 0){
            equation.pop();
            display.textContent = equation.join(" ");
            input.textContent = "";
        } else if (buttons[i] == clear){
            equation = [];
            display.textContent = equation.join(" ");
            input.textContent = "";
        } else if (buttons[i] == equal){
            let result = solve(equation);
            input.textContent = result[0];
            equation = result[0];
        } else {
            equation.push(buttons[i].textContent);
        }
    });
}