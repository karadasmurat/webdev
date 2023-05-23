interface Customer {
  name: string;
  email?: string;
  address?: {
    type?: string;
    city?: string;
    state?: string;
  };
}

const findCustomerById = (id: number): Customer | undefined => {
  if (id === 1) {
    return {
      name: "Harry Potter",
      email: "potter@foo.com",
      address: {
        type: "home",
        city: "London",
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

// customer is possibly 'undefined'
let customer1 = findCustomerById(1);
let customer2 = findCustomerById(2);
let customer3 = findCustomerById(3);

// customer, and customer.address are possibly 'undefined'
console.log(customer1?.name, customer1?.address?.city); // Harry Potter London
console.log(customer2?.name, customer2?.address?.city); // Lord Voldemort undefined
console.log(customer3?.name, customer3?.address?.city); // undefined undefined
