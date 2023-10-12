-- Customers Table
CREATE TABLE Customers (
  customer_id INTEGER PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT
);

-- Addresses Table
CREATE TABLE Addresses (
  address_id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  street_address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT,
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Phones Table
CREATE TABLE Phones (
  PhoneID INTEGER PRIMARY KEY,
  CustomerID INTEGER,
  PhoneNumber TEXT,
  Label TEXT, -- e.g., "Home," "Work"
  FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);


-- Orders Table
CREATE TABLE Orders (
  order_id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  order_date TEXT,
  total_amount REAL,
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Order Details Table
CREATE TABLE OrderDetails (
  order_detail_id INTEGER PRIMARY KEY,
  order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Products Table
CREATE TABLE Products (
  product_id INTEGER PRIMARY KEY,
  product_name TEXT,
  description TEXT
);

-- Price History Table
CREATE TABLE PriceHistory (
  price_history_id INTEGER PRIMARY KEY,
  product_id INTEGER,
  effective_date TEXT,
  price REAL,
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- PromotionCodes table to store promotion codes
CREATE TABLE PromotionCodes (
  CodeID INTEGER PRIMARY KEY,
  Code TEXT,
  Description TEXT,
  Discount REAL,
  StartDate DATE,
  EndDate DATE
);

-- CodeUsages table to associate promotion codes with orders
CREATE TABLE CodeUsages (
  UsageID INTEGER PRIMARY KEY,
  OrderID INTEGER,
  CodeID INTEGER,
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
  FOREIGN KEY (CodeID) REFERENCES PromotionCodes(CodeID)
);

-- Payment Table
CREATE TABLE Payments (
  payment_id INTEGER PRIMARY KEY,
  order_id INTEGER,
  payment_date TEXT,
  amount REAL,
  payment_method TEXT,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);
