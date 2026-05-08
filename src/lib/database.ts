import { Category, Order, OrderItem, Product } from '../types';
import { supabase } from './supabase';
import { CATEGORIES, MENU_ITEMS, ORDER_HISTORY } from '../data/mockData';

// ============ UTILITY ============
function isSupabaseConfigured(): boolean {
    // Always return false to use static fallback data
    return false;
}

// ============ DATABASE INTERFACE ============
export interface DatabaseProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    category_id: string | null;
    category_name: string;
    description: string | null;
    rating: number | null;
    is_available: boolean | null;
    created_at: string;
}

export interface DatabaseOrder {
    id: string;
    user_id: string | null;
    order_name: string;
    total: number;
    status: 'Completed' | 'Pending' | 'Cancelled';
    created_at: string;
}

export interface DatabaseOrderItem {
    id: string;
    order_id: string;
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
}

export interface DatabaseCategory {
    id: string;
    name: string;
    icon: string;
    slug: string;
}

export interface DatabaseSetting {
    key: string;
    value: string;
    description: string | null;
    updated_at: string;
}

// ============ SETTINGS SERVICE ============
export const settingsService = {
    async get(key: string): Promise<string | null> {
        if (!isSupabaseConfigured()) {
            if (key === 'delivery_estimation_minutes') return '15';
            return null;
        }

        const { data, error } = await supabase
            .from('app_settings')
            .select('value')
            .eq('key', key)
            .single();

        if (error || !data) {
            console.error(`Error fetching setting ${key}:`, error);
            return key === 'delivery_estimation_minutes' ? '0' : null;
        }

        return data.value;
    },

    async set(key: string, value: string): Promise<boolean> {
        if (!isSupabaseConfigured()) return false;

        const { error } = await supabase
            .from('app_settings')
            .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });

        if (error) {
            console.error('Error setting app_settings:', error);
            return false;
        }
        return true;
    },
};

// ============ PRODUCT SERVICE ============
export const productService = {
    async getAll(): Promise<Product[]> {
        if (!isSupabaseConfigured()) return MENU_ITEMS;

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('name');

        if (error) {
            console.error('Error fetching products:', error);
            return FALLBACK_PRODUCTS;
        }

        return (data as DatabaseProduct[] || []).map(mapProductFromDB);
    },

    async getById(id: string): Promise<Product | null> {
        if (!isSupabaseConfigured()) return MENU_ITEMS.find(p => p.id === id) || null;

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            console.error('Error fetching product:', error);
            return FALLBACK_PRODUCTS.find(p => p.id === id) || null;
        }

        return mapProductFromDB(data as DatabaseProduct);
    },

    async getByCategory(categoryName: string): Promise<Product[]> {
        if (!isSupabaseConfigured()) return MENU_ITEMS.filter(p => p.category === categoryName);

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category_name', categoryName)
            .order('name');

        if (error) {
            console.error('Error fetching products by category:', error);
            return FALLBACK_PRODUCTS.filter(p => p.category === categoryName);
        }

        return (data as DatabaseProduct[] || []).map(mapProductFromDB);
    },

    async search(query: string): Promise<Product[]> {
        if (!isSupabaseConfigured()) return MENU_ITEMS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .ilike('name', `%${query}%`)
            .order('name');

        if (error) {
            console.error('Error searching products:', error);
            return FALLBACK_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
        }

        return (data as DatabaseProduct[] || []).map(mapProductFromDB);
    },
};

// ============ CATEGORY SERVICE ============
export const categoryService = {
    async getAll(): Promise<Category[]> {
        if (!isSupabaseConfigured()) return CATEGORIES;

        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');

        if (error) {
            console.error('Error fetching categories:', error);
            return FALLBACK_CATEGORIES;
        }

        return (data as DatabaseCategory[] || []).map(cat => ({
            id: cat.id,
            name: cat.name,
            icon: cat.icon,
            slug: cat.slug,
        }));
    },
};

// ============ ORDER SERVICE ============
export const orderService = {
    async getAll(userId?: string): Promise<Order[]> {
        if (!isSupabaseConfigured()) return ORDER_HISTORY;

        let query = supabase
            .from('orders')
            .select('*, order_items(*)')
            .order('created_at', { ascending: false });

        if (userId) query = query.eq('user_id', userId);

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching orders:', error);
            return FALLBACK_ORDERS;
        }

        return (data as any[] || []).map(mapOrderFromDB);
    },

    async create(order: {
        orderName: string;
        total: number;
        items: { productId: string; productName: string; quantity: number; price: number }[];
        userId?: string;
    }): Promise<Order | null> {
        if (!isSupabaseConfigured()) {
            console.log('Order created (mock):', order);
            return null;
        }

        const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert({
                order_name: order.orderName,
                total: order.total,
                status: 'Pending',
                user_id: order.userId || null,
            })
            .select()
            .single();

        if (orderError || !orderData) {
            console.error('Error creating order:', orderError);
            return null;
        }

        const orderItems = order.items.map(item => ({
            order_id: orderData.id,
            product_id: item.productId,
            product_name: item.productName,
            quantity: item.quantity,
            price: item.price,
        }));

        const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
        if (itemsError) console.error('Error creating order items:', itemsError);

        return {
            id: orderData.id,
            orderName: orderData.order_name,
            date: orderData.created_at,
            total: orderData.total,
            status: orderData.status,
            items: order.items,
        };
    },
};

// ============ SEED SERVICE ============
export const seedService = {
    async seedAll(): Promise<{ success: boolean; message: string }> {
        if (!isSupabaseConfigured()) {
            return { success: false, message: 'Supabase belum dikonfigurasi. Isi EXPO_PUBLIC_SUPABASE_URL dan EXPO_PUBLIC_SUPABASE_KEY di file .env' };
        }

        try {
            const { error: catError } = await supabase
                .from('categories')
                .upsert(CATEGORIES.map(cat => ({ ...cat, created_at: new Date().toISOString() })), { onConflict: 'id' });
            if (catError) throw new Error(`Gagal seed categories: ${catError.message}`);

            const { error: prodError } = await supabase
                .from('products')
                .upsert(MENU_ITEMS.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    category_id: null,
                    category_name: item.category,
                    description: item.description || null,
                    rating: item.rating || null,
                    is_available: item.isAvailable ?? true,
                    created_at: new Date().toISOString(),
                })), { onConflict: 'id' });
            if (prodError) throw new Error(`Gagal seed products: ${prodError.message}`);

            return { success: true, message: '✅ Data berhasil di-seed ke Supabase!' };
        } catch (error: any) {
            return { success: false, message: `❌ Error: ${error.message}` };
        }
    },
};

// ============ HELPERS ============
function mapProductFromDB(db: DatabaseProduct): Product {
    return {
        id: db.id,
        name: db.name,
        price: db.price,
        image: db.image || '',
        category: db.category_name || 'Uncategorized',
        description: db.description || undefined,
        rating: db.rating || undefined,
        isAvailable: db.is_available ?? true,
    };
}

function mapOrderFromDB(data: any): Order {
    let items: OrderItem[] = [];
    if (data.order_items && Array.isArray(data.order_items)) {
        items = data.order_items.map((item: DatabaseOrderItem) => ({
            productId: item.product_id,
            productName: item.product_name,
            quantity: item.quantity,
            price: item.price,
        }));
    }
    return {
        id: data.id,
        orderName: data.order_name,
        date: data.created_at,
        total: data.total,
        status: data.status,
        items: items.length > 0 ? items : undefined,
    };
}