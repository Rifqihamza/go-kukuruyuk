import { useState, useEffect } from 'react';
import { USER_DATA } from '../data/mockData';
import { User } from '../types';

// Hook untuk mengelola mock users dengan persistence sederhana
export function useMockUsers() {
    const [users, setUsers] = useState<User[]>(USER_DATA);

    // Load users dari localStorage jika ada (simulasi persistence)
    useEffect(() => {
        try {
            const savedUsers = localStorage.getItem('mock_users');
            if (savedUsers) {
                const parsedUsers = JSON.parse(savedUsers);
                setUsers(parsedUsers);
            }
        } catch (error) {
            console.warn('Failed to load saved users:', error);
        }
    }, []);

    // Save users ke localStorage ketika berubah
    useEffect(() => {
        try {
            localStorage.setItem('mock_users', JSON.stringify(users));
        } catch (error) {
            console.warn('Failed to save users:', error);
        }
    }, [users]);

    const addUser = (userData: Omit<User, 'id'>) => {
        const newUser: User = {
            ...userData,
            id: Date.now(), // Generate unique ID
            role: userData.role || 'customer', // Default role is customer
            created_at: new Date().toISOString(),
            update_at: new Date().toISOString(),
        };
        setUsers(prev => [...prev, newUser]);
        return newUser;
    };

    const updateUser = (userId: number, updates: Partial<User>) => {
        setUsers(prev => prev.map(user =>
            user.id === userId ? { ...user, ...updates } : user
        ));
    };

    const deleteUser = (userId: number) => {
        setUsers(prev => prev.filter(user => user.id !== userId));
    };

    const findUserByEmail = (email: string) => {
        return users.find(user => user.email === email);
    };

    const findUserById = (id: number) => {
        return users.find(user => user.id === id);
    };

    return {
        users,
        addUser,
        updateUser,
        deleteUser,
        findUserByEmail,
        findUserById,
    };
}