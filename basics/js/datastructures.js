function mapBasics() {
  console.log("Map Basics");
  console.log("----------");

  const map1 = new Map();

  // set(key, value): adds or updates an entry in this map
  map1.set("a", 11);
  map1.set(2, 22);

  const k1 = { key: 3 }; // Create a key object
  map1.set(k1, 33); // Use the same key object when setting the value

  // number of elements in the Map
  console.log(map1.size); // 3

  // Get the specified element
  console.log("a:", map1.get("a")); // 2
  console.log("2:", map1.get(2)); // 2
  console.log(k1, ":", map1.get(k1)); // get the element by a custom key object.

  // Update the specified element
  console.log("a before .set():", map1.get("a"));
  map1.set("a", 111);
  console.log("a after .set():", map1.get("a"));
  // Delete the specified element
  map1.delete("a");

  // Get non-existing key
  console.log("No such key:", map1.get("d")); // undefined, since there is no such key.

  // whether an element with the specified key exists
  const k2 = "d";
  if (map1.has(k2)) {
    console.log("The key exists");
  } else {
    console.log("Key not found.");
  }

  iterateMap(map1);
}

// A Map is an iterable, so it can be directly iterated.
function iterateMap(map) {
  console.log("Iterate through map");
  for (const entry of map) {
    console.log(entry); // [key, value]
  }

  //   array destructuring
  for (const [key, value] of map) {
    console.log(key, ":", value);
  }
}

// ############
mapBasics();
