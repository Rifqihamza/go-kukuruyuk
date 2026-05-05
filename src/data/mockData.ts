import { Category, Order, Product, User } from "../types";

export const USER_DATA: User[] = [
    { id: 1, username: 'Jhon', fullname: 'Jhon Doe', email: 'jhondoe@gmail.com', password: 'jhon123', avatarImg: '' }
];

export const CATEGORIES: Category[] = [
    { id: 'cat-1', name: 'Main Course', icon: 'food', slug: 'main-course' },
    { id: 'cat-2', name: 'Drinks', icon: 'cup', slug: 'drinks' },
    { id: 'cat-3', name: 'Snack', icon: 'food-variant', slug: 'snack' },
    { id: 'cat-4', name: 'Dessert', icon: 'cake', slug: 'dessert' },
];

export const MENU_ITEMS: Product[] = [
    { id: '1', name: 'Ayam Geprek', price: 18000, image: '', category: 'Main Course', description: 'Ayam geprek pedas dengan sambal bawang', isAvailable: true },
    { id: '2', name: 'Ayam Crispy', price: 15000, image: '', category: 'Main Course', description: 'Ayam crispy goreng tepung renyah', isAvailable: true },
    { id: '3', name: 'Bebek Goreng', price: 35000, image: '', category: 'Main Course', description: 'Bebek goreng empuk dan gurih', isAvailable: true },
    { id: '4', name: 'Sate Ayam', price: 25000, image: '', category: 'Main Course', description: 'Sate ayam dengan bumbu kacang', isAvailable: true },
    { id: '5', name: 'Nasi Goreng Spesial', price: 22000, image: '', category: 'Main Course', description: 'Nasi goreng spesial dengan telur dan ayam', isAvailable: true },
    { id: '6', name: 'Mie Goreng Jawa', price: 18000, image: '', category: 'Main Course', description: 'Mie goreng jawa dengan bumbu tradisional', isAvailable: true },
    { id: '7', name: 'Es Teh Manis', price: 5000, image: '', category: 'Drinks', description: 'Teh manis dingin segar', isAvailable: true },
    { id: '8', name: 'Es Jeruk Segar', price: 7000, image: '', category: 'Drinks', description: 'Jeruk peras segar', isAvailable: true },
    { id: '9', name: 'Jus Alpukat', price: 15000, image: '', category: 'Drinks', description: 'Jus alpukat dengan susu coklat', isAvailable: true },
    { id: '10', name: 'Kopi Susu Gula Aren', price: 18000, image: '', category: 'Drinks', description: 'Kopi susu dengan gula aren asli', isAvailable: true },
    { id: '11', name: 'Pisang Goreng Keju', price: 12000, image: '', category: 'Snack', description: 'Pisang goreng dengan taburan keju', isAvailable: true },
    { id: '12', name: 'Kentang Goreng', price: 15000, image: '', category: 'Snack', description: 'Kentang goreng crispy', isAvailable: true },
    { id: '13', name: 'Gado-Gado', price: 20000, image: '', category: 'Main Course', description: 'Sayuran dengan bumbu kacang', isAvailable: true },
    { id: '14', name: 'Soto Betawi', price: 30000, image: '', category: 'Main Course', description: 'Soto betawi dengan kuah santan', isAvailable: true },
    { id: '15', name: 'Es Campur', price: 15000, image: '', category: 'Dessert', description: 'Es campur buah segar', isAvailable: true },
];

export const ORDER_HISTORY: Order[] = [
    { id: 'ORD001', orderName: 'Ayam Geprek', date: '2026-05-01', total: 18000, status: 'Completed', items: [{ productId: '1', productName: 'Ayam Geprek', quantity: 1, price: 18000 }] },
    {
        id: 'ORD002', orderName: 'Nasi Goreng Spesial + Es Teh', date: '2026-05-02', total: 27000, status: 'Completed', items: [
            { productId: '5', productName: 'Nasi Goreng Spesial', quantity: 1, price: 22000 },
            { productId: '7', productName: 'Es Teh Manis', quantity: 1, price: 5000 },
        ]
    },
    { id: 'ORD003', orderName: 'Sate Ayam 10 Tusuk', date: '2026-05-03', total: 25000, status: 'Pending', items: [{ productId: '4', productName: 'Sate Ayam', quantity: 1, price: 25000 }] },
];