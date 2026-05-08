import { AppNotification, Category, FAQItem, Language, ListCardPay, MenuItem, Order, PaymentMethod, Product, PromoItem, Transaction, User } from "../types";

export const USER_DATA: User[] = [
    {
        id: 1,
        role: 'customer',
        username: 'Jhon',
        fullname: 'Jhon Doe',
        email: 'jhondoe@gmail.com',
        password: 'jhon123',
        avatarImg: '',
        phone: '+6281234567890',
        address: 'Jl. Sudirman No. 123, Jakarta',
        created_at: new Date().toISOString(),
        update_at: new Date().toISOString()
    },
    {
        id: 2,
        role: 'admin',
        username: 'admin',
        fullname: 'Administrator',
        email: 'admin@kukuruyuk.com',
        password: 'admin123',
        avatarImg: '',
        phone: '+6281234567891',
        address: 'Jl. Thamrin No. 456, Jakarta',
        created_at: new Date().toISOString(),
        update_at: new Date().toISOString()
    },
    {
        id: 3,
        role: 'customer',
        username: 'test',
        fullname: 'Test User',
        email: 'test@example.com',
        password: 'test123',
        avatarImg: '',
        phone: '+6281234567892',
        address: 'Jl. Gatot Subroto No. 789, Jakarta',
        created_at: new Date().toISOString(),
        update_at: new Date().toISOString()
    },
    {
        id: 4,
        role: 'merchant',
        username: 'merchant',
        fullname: 'Merchant Owner',
        email: 'merchant@kukuruyuk.com',
        password: 'merchant123',
        avatarImg: '',
        phone: '+6281234567893',
        address: 'Jl. Malioboro No. 321, Yogyakarta',
        created_at: new Date().toISOString(),
        update_at: new Date().toISOString()
    }
];

export const USER_BALANCE = 75000;

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

export const MOCK_NOTIFICATIONS: AppNotification[] = [
    {
        id: '1',
        title: 'Promo Hari Ini',
        message: 'Dapatkan diskon 20% untuk semua menu makanan utama',
        isRead: false,
        createdAt: '2026-05-07T08:00:00Z'
    },
    {
        id: '2',
        title: 'Pesanan Anda',
        message: 'Pesanan Ayam Geprek telah selesai diambil',
        isRead: true,
        createdAt: '2026-05-06T14:30:00Z'
    },
    {
        id: '3',
        title: 'Pembaruan Sistem',
        message: 'Aplikasi telah diperbaiki untuk performa yang lebih baik',
        isRead: false,
        createdAt: '2026-05-05T09:15:00Z'
    }
];

// Payment related mock data
export const PAYMENT_METHODS: PaymentMethod[] = [
    { id: '1', type: 'Kartu Kredit / Debit', number: '**** **** **** 1234', icon: 'card-outline' },
    { id: '2', type: 'GoPay', number: '081234567890', icon: 'wallet-outline' },
    { id: '3', type: 'OVO', number: '081234567890', icon: 'phone-portrait-outline' },
];

export const RECENT_TRANSACTIONS: Transaction[] = [
    { id: '1', description: 'Top Up Saldo', amount: '+50.000', date: '2026-05-06', type: 'credit' },
    { id: '2', description: 'Pembayaran Ayam Geprek', amount: '-18.000', date: '2026-05-05', type: 'debit' },
    { id: '3', description: 'Pembayaran Nasi Goreng', amount: '-22.000', date: '2026-05-04', type: 'debit' },
];

export const ALL_TRANSACTIONS: Transaction[] = [
    { id: '1', description: 'Top Up Saldo', amount: '+50.000', date: '2026-05-06', type: 'credit', time: '14:30' },
    { id: '2', description: 'Pembayaran Ayam Geprek', amount: '-18.000', date: '2026-05-05', type: 'debit', time: '12:15' },
    { id: '3', description: 'Pembayaran Nasi Goreng', amount: '-22.000', date: '2026-05-04', type: 'debit', time: '19:45' },
    { id: '4', description: 'Top Up Saldo', amount: '+25.000', date: '2026-05-03', type: 'credit', time: '10:20' },
    { id: '5', description: 'Pembayaran Mie Ayam', amount: '-15.000', date: '2026-05-02', type: 'debit', time: '13:10' },
    { id: '6', description: 'Transfer ke Teman', amount: '-30.000', date: '2026-05-01', type: 'debit', time: '16:30' },
    { id: '7', description: 'Top Up Saldo', amount: '+75.000', date: '2026-04-30', type: 'credit', time: '09:15' },
    { id: '8', description: 'Pembayaran Kopi', amount: '-12.000', date: '2026-04-29', type: 'debit', time: '11:45' },
    { id: '9', description: 'Pembayaran Bakso', amount: '-20.000', date: '2026-04-28', type: 'debit', time: '18:20' },
    { id: '10', description: 'Top Up Saldo', amount: '+40.000', date: '2026-04-27', type: 'credit', time: '15:30' },
    { id: '11', description: 'Pembayaran Martabak', amount: '-25.000', date: '2026-04-26', type: 'debit', time: '20:15' },
    { id: '12', description: 'Transfer dari Bank', amount: '+100.000', date: '2026-04-25', type: 'credit', time: '08:00' },
];

export const LIST_CARD_PAYMENT: ListCardPay[] = [
    { id: '1', name: 'Kartu Kredit / Debit', icon: 'card-outline', type: 'bank' },
    { id: '2', name: 'GoPay', icon: 'wallet-outline', type: 'ewallet' },
    { id: '3', name: 'OVO', icon: 'phone-portrait-outline', type: 'ewallet' },
    { id: '4', name: 'Dana', icon: 'cash-outline', type: 'ewallet' },
    { id: '5', name: 'ShopeePay', icon: 'basket-outline', type: 'ewallet' },
];

// Promo related mock data
export const PROMOTIONS: PromoItem[] = [
    {
        id: '1',
        title: 'Diskon 20% Ayam Geprek',
        description: 'Nikmati ayam geprek dengan diskon 20%',
        discount: '20%',
        image: '',
        validUntil: '2026-05-15'
    },
    {
        id: '2',
        title: 'Buy 1 Get 1 Free',
        description: 'Beli 1 minuman gratis 1 minuman',
        discount: '50%',
        image: '',
        validUntil: '2026-05-20'
    },
    {
        id: '3',
        title: 'Free Delivery',
        description: 'Gratis ongkir untuk pesanan di atas 50rb',
        discount: 'Gratis',
        image: '',
        validUntil: '2026-05-25'
    }
];

export const PROMO_MENUS: MenuItem[] = [
    { id: '1', name: 'Ayam Geprek Special', price: 14400, image: '', category: 'Main Course', isAvailable: true },
    { id: '2', name: 'Es Teh Jumbo', price: 7500, image: '', category: 'Drinks', isAvailable: true },
    { id: '3', name: 'Nasi Goreng Promo', price: 17600, image: '', category: 'Main Course', isAvailable: true },
];

// Settings related mock data
export const LANGUAGES: Language[] = [
    { id: 'id', name: 'Bahasa Indonesia', code: 'id', flag: '🇮🇩', isDefault: true },
    { id: 'en', name: 'English', code: 'en', flag: '🇬🇧' },
    { id: 'zh', name: '中文', code: 'zh', flag: '🇨🇳' },
    { id: 'ja', name: '日本語', code: 'ja', flag: '🇯🇵' },
];

export const FAQ: FAQItem[] = [
    {
        id: '1',
        question: 'Bagaimana cara memesan?',
        answer: 'Pilih menu favorit Anda, tambahkan ke keranjang, lalu klik "Pesan Sekarang". Ikuti petunjuk pembayaran.'
    },
    {
        id: '2',
        question: 'Berapa lama estimasi pengiriman?',
        answer: 'Estimasi pengiriman sekitar 15 menit, tergantung lokasi Anda.'
    },
    {
        id: '3',
        question: 'Bagaimana cara membatalkan pesanan?',
        answer: 'Hubungi customer service kami melalui WhatsApp atau email untuk pembatalan pesanan.'
    },
    {
        id: '4',
        question: 'Metode pembayaran apa saja yang tersedia?',
        answer: 'Kami menerima pembayaran melalui transfer bank, e-wallet (GoPay, OVO, Dana), dan COD.'
    }
];