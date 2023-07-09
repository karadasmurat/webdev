console.log("global this:", this);

function test() {
  console.log("within a function:", this);
}

test();

const obj = {
  capacity: 100,
  size: 65,
  ratio_v1() {
    return this.size / this.capacity;
  },
  ratio_v2: function () {
    return this.size / this.capacity;
  },
  ratio_v3: () => this.size / this.capacity,
};

console.log("object method:", obj.ratio_v1());
console.log(
  "object property is assigned to a function expression ",
  obj.ratio_v2()
);
console.log("object property is assigned to an arrow function", obj.ratio_v3());
