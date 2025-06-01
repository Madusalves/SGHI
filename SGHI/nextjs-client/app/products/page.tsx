'use client';
import { useEffect, useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:5001/api/products', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Não autorizado");
                return res.json();
            })
            .then(data => setProducts(data))
            .catch(() => alert("Token inválido ou expirado"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Carregando...</p>;

    return (
        <div>
            <h1>Produtos</h1>
            <ul>
                {products.map(p => (
                    <li key={p.id}>{p.name} - R$ {p.price}</li>
                ))}
            </ul>
        </div>
    );
}
