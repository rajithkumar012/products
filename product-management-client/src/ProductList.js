import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState({
        name: '', description: '', price: ''
    });

    const fetchProducts = async () => {
        try {
            const result = await axios.get('http://localhost:8000/api/products/');
            setProducts(result.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleEditClick = (product) => {
        setEditingProduct(product.id);
        setUpdatedProduct({ ...product });
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/products/${id}/`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleUpdateSubmit = async (id) => {
        try {
            await axios.put(`http://localhost:8000/api/products/${id}/`, updatedProduct);
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="product-list">
            {products.map((product) => (
                <div key={product.id} className="product-item">
                    {editingProduct === product.id ? (
                        <div>
                            <input
                                type="text"
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <textarea
                                value={updatedProduct.description}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                            />
                            <input
                                type="number"
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <button onClick={() => handleUpdateSubmit(product.id)}>Save</button>
                        </div>
                    ) : (
                        <div>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            <button onClick={() => handleEditClick(product)}>Edit</button>
                            <button onClick={() => handleDeleteClick(product.id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProductList;
