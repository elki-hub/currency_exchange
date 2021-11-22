exports.multiply = function (x, y) {
  let res = 0;
  for (let i = 0; i < y; i++) {
    res += x;
  }
  return res;
};
