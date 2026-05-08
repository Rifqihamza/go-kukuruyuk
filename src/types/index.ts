export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    rating?: number;
    isAvailable?: boolean;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
    slug: string;
}

export interface Order {
    id: string;
    orderName: string;
    date: string;
    total: number;
    status: 'Completed' | 'Pending' | 'Cancelled';
    items?: OrderItem[];
}

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface User {
    id: number;
    role: string;
    username: string;
    fullname: string;
    email: string;
    password: string;
    avatarImg: string;
    phone?: string;
    address?: string;
    created_at: string;
    update_at: string;
}

export interface AppNotification {
    id: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export interface CartItem {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
}

export interface QuickAccessItem {
    id: string;
    name: string;
    icon: string;
    urlTo: string;
}

export interface SearchBarProps {
    value: string;
    onChange: (text: string) => void;
    placeholder?: string;
}

export interface ProductCardProps {
    product: Product;
    onPress: (product: Product) => void;
}

export interface HeaderProps {
    userName: string;
    greeting?: string;
    onNotificationPress?: () => void;
    onProfilePress?: () => void;
    cartItemCount?: number;
    hasUnreadNotifications?: boolean; // Tambahkan ini
}

export interface AuthContextType {
    user: User | null;
    session: { user: User } | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<{ error?: string }>;
    signUp: (email: string, password: string, fullname: string) => Promise<{ error?: string }>;
    signOut: () => Promise<void>;
}

export type TabRoute = 'index' | 'menu' | 'history' | 'settings';

// Payment related types
export interface PaymentMethod {
    id: string;
    type: string;
    number: string;
    icon: string;
}

export interface Transaction {
    id: string;
    description: string;
    amount: string;
    date: string;
    type: 'credit' | 'debit';
    time?: string;
}

export interface ListCardPay {
    id: string;
    name: string;
    icon: string;
    type: string;
}

export interface PromoItem {
    id: string;
    title: string;
    description: string;
    discount: string;
    image: string;
    validUntil: string;
    type?: 'menu' | 'coupon';
    category?: string;
}

export interface MenuItem {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string;
    category: string;
    description?: string;
    isAvailable?: boolean;
}

export interface Language {
    id: string;
    name: string;
    code: string;
    flag: string;
    isDefault?: boolean;
}

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}