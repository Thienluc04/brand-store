export interface ratingStar {
  number: number;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: {
    number: number;
    image: string;
  };
  orders: number;
  description: string;
  features: number;
  category: number;
}
