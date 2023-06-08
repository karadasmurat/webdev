export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipconde: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
}
