import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import './App.css';

const App = () => {
    const [reload, setReload] = useState(false);

    return (
        <div className="App">
            <h1>Product Management</h1>
            <ProductForm onProductAdded={() => setReload(!reload)} />
            <ProductList reload={reload} />
        </div>
    );
};

export default App;
