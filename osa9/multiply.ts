type Operation = "multiply" | "add" | "divide";

type Result = number | string;

const calculator = (a: number, b: number, op: Operation): Result => {
  if (op === "multiply") {
    return a * b;
  } else if (op === "add") {
    return a + b;
  } else if (op === "divide") {
    return a / b;
  } else return "wrong input";
};

console.log(calculator(3, 4, "add"));