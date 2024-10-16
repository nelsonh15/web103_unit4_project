export function calcprice(items) {
  let sum = 60000;
  items.forEach((value, key) => {
    sum += value;
  });
  return sum;
}
