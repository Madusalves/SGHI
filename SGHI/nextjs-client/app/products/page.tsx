'use client';

import { useEffect, useState } from 'react';

interface Product {
    Id: number;
    Name: string;
    Price: number;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => { // Authenticate the user and get the tok
        const authenticate = async () => {
            try {
                const response = await fetch('https://localhost:5001/api/authenticate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: 'user', password: 'password' })
                });
                const data = await response.json();
                setToken(data.token);
            } catch (error) {
                console.error('Error authenticating:', error);
            }
        };
        authenticate();
    }, []);

    useEffect(() => {
        if (!token) return;

        const fetchProducts = async () => {
            try {
                const response = await fetch('https://localhost:5001/api/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [token]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Products List</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.Id}>{product.Name} - ${product.Price}</li>
                ))}
            </ul>
        </div>
    );
}