// This class represents a phone book for storing and managing contacts.
// It utilizes a Map to efficiently store contact names as keys and their associated phone numbers as values.
class PhoneBook {
  constructor() {
    this.contacts = new Map();
  }

  add(name, number) {
    this.contacts.set(name, number);
  }

  getPhone(name) {
    return this.contacts.get(name);
  }

  // Searching for contacts by partial names.
  searchContacts(partialName) {
    const results = [];
    // linear search -
    // Iterate through contacts to check if any key contains partialName
    for (const [name, phone] of this.contacts) {
      if (name.toLowerCase().includes(partialName.toLowerCase())) {
        // create an object representing the map entry, and push it into results list:
        results.push({ name, phone });
      }
    }
    return results;
  }

  getNumberOfContacts() {
    return this.contacts.size;
  }
}

function phoneBookDemo() {
  const phoneBook = new PhoneBook();
  phoneBook.add("John", "555-555-5555");
  phoneBook.add("Jane", "444-444-4444");
  phoneBook.add("Jim", "333-333-3333");

  console.log(phoneBook.contacts); // Map(3) {'John' => '555-555-5555', 'Jane' => '444-444-4444', 'Jim' => '333-333-3333'}
  console.log(phoneBook.getNumberOfContacts()); // 3
  console.log(phoneBook.getPhone("Jane")); // 444-444-4444

  console.log(phoneBook.searchContacts("j"));
}

function mapBasics() {
  console.log("Map Basics");

  const grades = new Map([
    ["Harry", 80],
    ["Ron", 70],
    ["Hermione", 100],
  ]);

  console.log(grades); // Map(3) { 'Harry' => 80, 'Ron' => 70, 'Hermione' => 100 }

}
// phoneBookDemo();
mapBasics();


