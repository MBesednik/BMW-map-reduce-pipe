Array.prototype.customMap = function (callback) {
  if (!this.length) throw new Error('Empty array');

  let newArray = [];
  for (let i = 0; i < this.length; i++) {
    // Provjera da element nije prazan string ili razmak
    if (this[i] !== ' ' && this[i] !== '') {
      newArray.push(callback(this[i], i));
    }
  }
  return newArray;
};

Array.prototype.myCustomReduce = function (callback, initialValue) {
  if (!this.length && initialValue === undefined) {
    throw new Error('Empty array or initial value is undefined');
  }

  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

export function customReduce() {
  let input = inputText.value.split(' ');
  const reduce = input.myCustomReduce((total, curr) => total + curr, 0);
  console.log(reduce);
  arrayValue.innerHTML = reduce;
}

export function customMap(array, callback) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}
