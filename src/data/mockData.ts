import { Order, Product, User } from "../types";

export const USER_DATA: User[] = [
    { id: 1, username: 'Jhon', fullname: 'Jhon Doe', email: 'jhondoe@gmail.com', password: 'jhon123', avatarImg: '' }
]
export const MENU_ITEMS: Product[] = [
    { id: '1', name: 'Ayam Geprek', price: 18000, image: require('@/src/assets/images/menuPlaceholder.png'), category: 'Main Course' },
    { id: '2', name: 'Ayam Crispy', price: 15000, image: require('@/src/assets/images/menuPlaceholder.png'), category: 'Main Course' },
    { id: '3', name: 'Bebek Goreng', price: 35000, image: require('@/src/assets/images/menuPlaceholder.png'), category: 'Main Course' },
    { id: '4', name: 'Sate Ayam', price: 25000, image: require('@/src/assets/images/menuPlaceholder.png'), category: 'Main Course' },
    { id: '5', name: 'Nasi Goreng Spesial', price: 22000, image: require('@/src/assets/images/menuPlaceholder.png'), category: 'Main Course' },
    { id: '6', name: 'Mie Goreng Jawa', price: 18000, image: require('@/src/assets/images/menuPlaceholder.png'), category: 'Main Course' },
    { id: '7', name: 'Es Teh Manis', price: 5000, image: require('@/src/assets/images/menuPlaceholder.png'), category: 'Drinks' },
    { id: '8', name: 'Es Jeruk Segar', price: 7000, image: require('@/src/assets/images/menuPlaceholder.png'), category: 'Drinks' },
    { id: '9', name: 'Jus Alpukat', price: 15000, image: require('@/src/assets/images/menuPlaceholder.png'), category: 'Drinks' },
    { id: '10', name: 'Kopi Susu Gula Aren', price: 18000, image: require('@/src/assets/images/menuPlaceholder.png'), category: 'Drinks' },
    { id: '11', name: 'Pisang Goreng Keju', price: 12000, image: require('@/src/assets/images/menuPlaceholder.png'), category: 'Snack' },
    { id: '12', name: 'Kentang Goreng', price: 15000, image: require('@/src/assets/images/menuPlaceholder.png'), category: 'Snack' },
    { id: '13', name: 'Gado-Gado', price: 20000, image: require('@/src/assets/images/menuPlaceholder.png'), category: 'Main Course' },
    { id: '14', name: 'Soto Betawi', price: 30000, image: require('@/src/assets/images/menuPlaceholder.png'), category: 'Main Course' },
    { id: '15', name: 'Es Campur', price: 15000, image: require('@/src/assets/images/menuPlaceholder.png'), category: 'Dessert' },
];


export const ORDER_HISTORY: Order[] = [
    { id: 'ORD001', orderName: 'Ayam Geprek', date: '2026-05-01', total: 18000, status: 'Completed' },
];