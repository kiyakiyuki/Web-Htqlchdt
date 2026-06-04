export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  deliveryAddress: string;
  phone: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const users: User[] = [
  {
    id: 'user1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: '123 Lê Lợi, Quận 1, TP.HCM',
  },
  {
    id: 'user2',
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    phone: '0987654321',
    address: '456 Nguyễn Huệ, Quận 1, TP.HCM',
  },
];

export const orders: Order[] = [
  {
    id: 'ORD001',
    userId: 'user1',
    items: [
      { productId: '1', quantity: 1, price: 24500000 },
      { productId: '5', quantity: 2, price: 6500000 },
    ],
    totalPrice: 37500000,
    status: 'delivered',
    createdAt: '2024-05-15',
    deliveryAddress: '123 Lê Lợi, Quận 1, TP.HCM',
    phone: '0123456789',
    email: 'nguyenvana@example.com',
  },
  {
    id: 'ORD002',
    userId: 'user1',
    items: [{ productId: '3', quantity: 1, price: 34500000 }],
    totalPrice: 34500000,
    status: 'shipped',
    createdAt: '2024-06-01',
    deliveryAddress: '123 Lê Lợi, Quận 1, TP.HCM',
    phone: '0123456789',
    email: 'nguyenvana@example.com',
  },
  {
    id: 'ORD003',
    userId: 'user2',
    items: [
      { productId: '4', quantity: 1, price: 25000000 },
      { productId: '6', quantity: 1, price: 8500000 },
    ],
    totalPrice: 33500000,
    status: 'processing',
    createdAt: '2024-06-02',
    deliveryAddress: '456 Nguyễn Huệ, Quận 1, TP.HCM',
    phone: '0987654321',
    email: 'tranthib@example.com',
  },
  {
    id: 'ORD004',
    userId: 'user1',
    items: [{ productId: '2', quantity: 1, price: 23500000 }],
    totalPrice: 23500000,
    status: 'confirmed',
    createdAt: '2024-06-03',
    deliveryAddress: '123 Lê Lợi, Quận 1, TP.HCM',
    phone: '0123456789',
    email: 'nguyenvana@example.com',
  },
  {
    id: 'ORD005',
    userId: 'user2',
    items: [{ productId: '7', quantity: 1, price: 18500000 }],
    totalPrice: 18500000,
    status: 'pending',
    createdAt: '2024-06-03',
    deliveryAddress: '456 Nguyễn Huệ, Quận 1, TP.HCM',
    phone: '0987654321',
    email: 'tranthib@example.com',
  },
  {
    id: 'ORD006',
    userId: 'user1',
    items: [{ productId: '6', quantity: 1, price: 8500000 }],
    totalPrice: 8500000,
    status: 'cancelled',
    createdAt: '2024-06-01',
    deliveryAddress: '123 Lê Lợi, Quận 1, TP.HCM',
    phone: '0123456789',
    email: 'nguyenvana@example.com',
  },
];

export const auctions = [
  {
    id: 'auction1',
    name: 'iPhone 14 Pro Max',
    currentPrice: 19999000,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    bids: 32,
  },
  {
    id: 'auction2',
    name: 'MacBook Pro 16" M2',
    currentPrice: 42000000,
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    bids: 18,
  },
];
