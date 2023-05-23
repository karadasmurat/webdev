class Point {
  x: number;
  y: number;

  // constructor with defaults
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // method
  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}

class Car {
  // name is a private member variable
  public constructor(private name: string) {}

  public getName(): string {
    return this.name;
  }
}

const car = new Car("BMW");
console.log(car.getName());

class Person {
  name: string;
  instantiatedAt = new Date(); // default value to a property

  constructor(name: string) {
    this.name = name;
  }
}

interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

const logger: Logger = new ConsoleLogger();
logger.log("Hello, TypeScript!");
