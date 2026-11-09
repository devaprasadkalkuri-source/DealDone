export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  formattedPrice: string;
  originalPrice?: string;
  discount?: string;
  condition: "Brand New" | "Like New" | "Mint" | "Good Condition";
  location: string;
  distance: string;
  image: string;
  badge?: string;
  verified: boolean;
  seller: {
    name: string;
    rating: number;
    deals: number;
    responseTime: string;
  };
  specs?: { label: string; value: string }[];
}

export const PRODUCTS: Record<string, ProductItem> = {
  iphone15: {
    id: "iphone-15",
    name: "Apple iPhone 15",
    category: "Mobiles",
    price: 52000,
    formattedPrice: "₹52,000",
    originalPrice: "₹79,900",
    discount: "35% OFF",
    condition: "Like New",
    location: "Hitech City, Hyderabad",
    distance: "1.8 km",
    image: "/products/iphone15.jpg",
    badge: "Great Deal",
    verified: true,
    seller: {
      name: "Rohit V.",
      rating: 4.9,
      deals: 18,
      responseTime: "Replies in 5 min",
    },
    specs: [
      { label: "Storage", value: "128 GB" },
      { label: "Color", value: "Midnight Black" },
      { label: "Battery", value: "98% Health" },
      { label: "Warranty", value: "Valid till Nov 2026" },
    ],
  },
  macbookAir: {
    id: "macbook-air",
    name: "MacBook Air M2",
    category: "Laptops",
    price: 68000,
    formattedPrice: "₹68,000",
    originalPrice: "₹1,14,900",
    discount: "40% OFF",
    condition: "Like New",
    location: "Madhapur, Hyderabad",
    distance: "2.4 km",
    image: "/products/macbook.jpg",
    badge: "Popular",
    verified: true,
    seller: {
      name: "Vikram S.",
      rating: 5.0,
      deals: 24,
      responseTime: "Replies in 2 min",
    },
    specs: [
      { label: "Processor", value: "Apple M2 8-Core" },
      { label: "Memory", value: "16 GB Unified" },
      { label: "Storage", value: "512 GB SSD" },
      { label: "Cycles", value: "38 Battery Cycles" },
    ],
  },
  samsungGalaxy: {
    id: "samsung-galaxy",
    name: "Samsung Galaxy S23",
    category: "Mobiles",
    price: 31000,
    formattedPrice: "₹31,000",
    originalPrice: "₹74,999",
    discount: "58% OFF",
    condition: "Good Condition",
    location: "Gachibowli, Hyderabad",
    distance: "3.2 km",
    image: "/products/samsung.jpg",
    badge: "Fast Sale",
    verified: true,
    seller: {
      name: "Ananya R.",
      rating: 4.8,
      deals: 9,
      responseTime: "Replies in 10 min",
    },
    specs: [
      { label: "Storage", value: "256 GB" },
      { label: "Color", value: "Phantom Black" },
      { label: "RAM", value: "8 GB" },
    ],
  },
  royalEnfield: {
    id: "royal-enfield",
    name: "Royal Enfield Classic 350",
    category: "Bikes",
    price: 145000,
    formattedPrice: "₹1,45,000",
    originalPrice: "₹2,20,000",
    discount: "34% OFF",
    condition: "Mint",
    location: "Jubilee Hills, Hyderabad",
    distance: "3.1 km",
    image: "/products/royalenfield.jpg",
    badge: "Single Owner",
    verified: true,
    seller: {
      name: "Aditya N.",
      rating: 5.0,
      deals: 7,
      responseTime: "Replies in 15 min",
    },
    specs: [
      { label: "Year", value: "2023" },
      { label: "Odometer", value: "4,800 km" },
      { label: "Color", value: "Gunmetal Grey" },
      { label: "Insurance", value: "Comprehensive" },
    ],
  },
  studyTable: {
    id: "study-table",
    name: "Minimal Solid Teak Desk",
    category: "Furniture",
    price: 4500,
    formattedPrice: "₹4,500",
    originalPrice: "₹12,000",
    discount: "62% OFF",
    condition: "Good Condition",
    location: "Kondapur, Hyderabad",
    distance: "2.8 km",
    image: "/products/studytable.jpg",
    badge: "Must Go",
    verified: true,
    seller: {
      name: "Sneha K.",
      rating: 4.9,
      deals: 12,
      responseTime: "Replies in 5 min",
    },
    specs: [
      { label: "Dimensions", value: "120 x 60 cm" },
      { label: "Material", value: "Solid Teak & Steel" },
      { label: "Cable Tray", value: "Integrated" },
    ],
  },
  cameraSony: {
    id: "camera-sony",
    name: "Sony Alpha A7 III",
    category: "Electronics",
    price: 45000,
    formattedPrice: "₹45,000",
    originalPrice: "₹1,40,000",
    discount: "67% OFF",
    condition: "Like New",
    location: "Banjara Hills, Hyderabad",
    distance: "4.2 km",
    image: "/products/camera.jpg",
    badge: "Verified Lens",
    verified: true,
    seller: {
      name: "Karan M.",
      rating: 4.9,
      deals: 21,
      responseTime: "Replies in 3 min",
    },
  },
};

export const CATEGORIES = [
  { id: "mobiles", label: "MOBILES", count: "1,240 deals", image: "/products/iphone15.jpg", icon: "Smartphone" },
  { id: "laptops", label: "LAPTOPS", count: "890 deals", image: "/products/macbook.jpg", icon: "Laptop" },
  { id: "bikes", label: "BIKES", count: "420 deals", image: "/products/royalenfield.jpg", icon: "Bike" },
  { id: "furniture", label: "FURNITURE", count: "650 deals", image: "/products/chair.jpg", icon: "Armchair" },
  { id: "electronics", label: "ELECTRONICS", count: "1,110 deals", image: "/products/camera.jpg", icon: "Headphones" },
  { id: "books", label: "BOOKS", count: "980 deals", image: "/products/books.jpg", icon: "BookOpen" },
  { id: "fashion", label: "FASHION", count: "1,540 deals", image: "/products/bike.jpg", icon: "Shirt" },
  { id: "sports", label: "SPORTS", count: "340 deals", image: "/products/headphones.jpg", icon: "Trophy" },
];
