export interface Product {
  id: string;
  url: string;
  name: string;
  description: string;
  average_rating: number;
  price: number;
  images: Image[];
  reviews: Review[];
  totalprice?: number;
  qty?: number;
}

export interface Image {
  id: number;
  url: string;
  small_url: string[];
  medium_url: string[];
  large_url: string[];
}

export interface Review {
  id: number;
  url: string;
  title: string;
  content: string;
  timestamp: number;

}
