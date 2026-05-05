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
    username: string;
    fullname: string;
    email: string;
    password: string;
    avatarImg: string;
    phone?: string;
    address?: string;
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
    userName?: string;
    greeting?: string;
    onNotificationPress?: () => void;
    onProfilePress?: () => void;
    cartItemCount?: number;
}

export interface AuthContextType {
    user: User | null;
    session: any;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<{ error?: string }>;
    signUp: (email: string, password: string, fullname: string) => Promise<{ error?: string }>;
    signOut: () => Promise<void>;
}

export type TabRoute = 'index' | 'menu' | 'history' | 'settings';