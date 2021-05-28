const item_map: Record<string, string> = {
  divide: "/",
  multiply: "x",
  subtract: "-",
  add: "+",
  decimal: ".",
  equals: "=",
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

enum Operators {
  Divide = "/",
  Add = "+",
  Subtract = "-",
  Multiply = "*",
}

const numbers: Record<string, string> = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const operators = ["divide", "multiply", "subtract", "add"];

const currentEquation: Array<string | number> = [];
let currentOperand: string = "";
let currentOperator: string = "";

let currentCheck: "operator" | "number" | "" = "";

// need to make a stack from our current equation
// each click should differentiate if it's number or an operator

for (const operator of operators) {
  document
    .querySelector(`#${operator}`)
    .addEventListener("click", (e) => onOperatorButtonClick(e, operator));
}

for (const key in numbers) {
  document
    .querySelector(`#${key}`)
    .addEventListener("click", () => onNumberButtonClick(key));
}

document.querySelector("#equals").addEventListener("click", onEqualsClick);

function onNumberButtonClick(key: string) {
  if (currentOperand === "") {
    if (key === "zero") return;
  }

  currentOperand += numbers[key];
  document.querySelector("#display").innerHTML = currentOperand;
}

function onOperatorButtonClick(e: Event, operator: string) {
  // don't let operators happen before a number button happens
  if (!currentOperator || currentOperator !== operator) {
    //push the current operand to the current equation
    currentOperator = item_map[operator];

    currentEquation.push(parseInt(currentOperand));
    currentEquation.push(currentOperator);

    currentOperand = "";
    console.log(currentEquation);

    document.querySelector("#display").innerHTML = currentOperator;
  }
}

function onEqualsClick() {
  currentEquation.push(parseInt(currentOperand));
  calculate(currentEquation);
}

function calculate(equation: Array<string | number>) {
  let operand1;
  let operand2;
  let operator;
  let total;

  for (const element of equation) {
    if (!operand1 && typeof element === "number") {
      operand1 = element;
    } else if (operand1 && !operand2 && typeof element === "number") {
      operand2 = element;
    } else if (!operator && typeof element === "string") {
      operator = element;
    }

    if (operator && operand1 && operand2) {
      console.log("are we good");
      total = doOperation(operator, operand1, operand2);
      operator = "";
      operand1 = undefined;
      operand2 = undefined;
      console.log(total);
      document.querySelector("#display").innerHTML = total.toString();
    }
  }
}

function doOperation(operator: string, operand1: number, operand2: number) {
  if (operator === "+") return operand1 + operand2;
  if (operator === "-") return operand1 - operand2;
  if (operator === "x") return operand1 * operand2;
  if (operator === "/") return operand1 / operand2;
}
