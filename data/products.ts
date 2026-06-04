export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  discount?: number;
}

export const categories = [
  { id: 'phones', name: 'Điện thoại' },
  { id: 'laptops', name: 'Laptop' },
  { id: 'accessories', name: 'Phụ kiện' },
  { id: 'electronics', name: 'Điện tử' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro Max 256GB',
    price: 24500000,
    originalPrice: 26000000,
    image: '/products/iphone14.jpg',
    category: 'phones',
    rating: 4.8,
    reviews: 245,
    description: 'Điện thoại cao cấp với màn hình Retina, chip A16, camera 48MP',
    inStock: true,
    discount: 6,
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23 Ultra',
    price: 23500000,
    originalPrice: 25000000,
    image: '/products/samsung-s23.jpg',
    category: 'phones',
    rating: 4.7,
    reviews: 189,
    description: 'Flagship Samsung với S Pen, màn hình AMOLED 120Hz, camera 200MP',
    inStock: true,
    discount: 6,
  },
  {
    id: '3',
    name: 'MacBook Pro M3 14"',
    price: 34500000,
    originalPrice: 36000000,
    image: '/products/macbook-m3.jpg',
    category: 'laptops',
    rating: 4.9,
    reviews: 156,
    description: 'Laptop chuyên nghiệp với chip M3, RAM 16GB, SSD 512GB',
    inStock: true,
    discount: 4,
  },
  {
    id: '4',
    name: 'Dell XPS 13',
    price: 25000000,
    originalPrice: 27000000,
    image: '/products/dell-xps.jpg',
    category: 'laptops',
    rating: 4.6,
    reviews: 142,
    description: 'Laptop mỏng nhẹ với màn hình FHD, CPU Intel i7, pin 9 giờ',
    inStock: true,
    discount: 7,
  },
  {
    id: '5',
    name: 'AirPods Pro 2',
    price: 6500000,
    originalPrice: 7000000,
    image: '/products/airpods-pro.jpg',
    category: 'accessories',
    rating: 4.8,
    reviews: 523,
    description: 'Tai nghe không dây với khử tiếng ồn chủ động, âm thanh spatial',
    inStock: true,
    discount: 7,
  },
  {
    id: '6',
    name: 'Sony WH-1000XM5',
    price: 8500000,
    originalPrice: 9500000,
    image: '/products/sony-headphones.jpg',
    category: 'accessories',
    rating: 4.7,
    reviews: 312,
    description: 'Tai nghe over-ear premium với noise cancelling tốt nhất',
    inStock: true,
    discount: 11,
  },
  {
    id: '7',
    name: 'iPad Pro 12.9" M2',
    price: 18500000,
    originalPrice: 20000000,
    image: '/products/ipad-pro.jpg',
    category: 'electronics',
    rating: 4.8,
    reviews: 234,
    description: 'Máy tính bảng cao cấp với chip M2, màn hình Liquid Retina',
    inStock: true,
    discount: 8,
  },
  {
    id: '8',
    name: 'Canon EOS R6',
    price: 45000000,
    originalPrice: 48000000,
    image: '/products/canon-r6.jpg',
    category: 'electronics',
    rating: 4.9,
    reviews: 87,
    description: 'Máy ảnh mirrorless full-frame 20MP, quay video 4K 60fps',
    inStock: false,
    discount: 6,
  },
];
