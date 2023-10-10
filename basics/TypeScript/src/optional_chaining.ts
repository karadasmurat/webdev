// a common practice: place required properties before optional properties.
interface Customer {
  name: string;
  email?: string;
  address?: {
    country: string;
    type?: string;
    city?: string;
  };
}

// Option 2 - nested objects

type City = {
  code: string;
  name: string;
  population?: number;
};

type Country = {
  code: string;
  name?: string;
};

type Address = {
  country: Country;
  type?: string;
  city?: City;
};

type Subscriber = {
  name: string;
  address?: Address;
};

const getASubscriber = (): Subscriber => ({
  name: "Dumbledore",
});

function getCity(subs: Subscriber) {
  // The nullish coalescing operator (??) may be used after optional chaining
  // in order to build a default value when none was found:
  return subs.address?.city?.name ?? "Unknown City";
}

const findCustomerById = (id: number): Customer | undefined => {
  if (id === 1) {
    return {
      name: "Harry Potter",
      email: "potter@foo.com",
      address: {
        type: "home",
        country: "UK",
      },
    };
  } else if (id == 2) {
    return {
      name: "Lord Voldemort",
      email: "voldemort@foo.com",
    };
  }

  return undefined;
};

// When working with optional properties and nested objects, it's important to use optional chaining to ensure safe property access.
let sub0 = getASubscriber();
console.log(sub0.name, sub0.address?.country.name); // Dumbledore undefined
console.log(sub0.name, sub0.address?.city?.population); // Dumbledore undefined
console.log("City:", getCity(sub0)); // City: Unknown City

// customer is possibly 'undefined'
let customer1 = findCustomerById(1);
let customer2 = findCustomerById(2);
let customer3 = findCustomerById(3);

// customer, and customer.address are possibly 'undefined'
console.log(customer1?.name, customer1?.address?.country); // Harry Potter UK
console.log(customer2?.name, customer2?.address?.city); // Lord Voldemort undefined
console.log(customer3?.name, customer3?.address?.city); // undefined undefined
