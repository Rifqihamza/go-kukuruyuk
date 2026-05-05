export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

export interface Order {
    id: string;
    orderName: string;
    date: string;
    total: number;
    status: 'Completed' | 'Pending';
}

export interface User {
    id: number;
    username: string;
    fullname: string;
    email: string;
    password: string;
    avatarImg: string;

}