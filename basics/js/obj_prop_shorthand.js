// Object Literals Using Object Property Shorthand

function createWardrobe() {
  var hat = 1;
  var shorts = 5;
  var jumper = 8;
  var socks = 2;

  var myWardrobe = {
    hat: hat,
    shorts: shorts,
    jumper: jumper,
    socks: socks,
  };

  return myWardrobe;
}

// ES6 Object property shorthand enables us to simply pass in the name of the key as opposed to repeating the name and the key.
const createWardrobe_ops = () => {
  let hat = 1;
  let shorts = 5;
  let jumper = 8;
  let socks = 2;

  let myWardrobe = {
    hat, // vs hat: hat
    shorts,
    jumper,
    socks,
  };

  return myWardrobe;
};

console.log(createWardrobe()); // { hat: 1, shorts: 5, jumper: 8, socks: 2 }
console.log(createWardrobe_ops()); // { hat: 1, shorts: 5, jumper: 8, socks: 2 }
