const fruits = ["Apple", "Banana", "Orange"];
const vegetables = ["Cucumber", "Radish"];

// console.log([...fruits, ...vegetables]);
export const oddOrEven = (number) => {
  if (number % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
};
