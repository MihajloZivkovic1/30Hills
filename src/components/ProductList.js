// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../index.css'
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('ascending');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/products');
                setProducts(response.data);
                const uniqueCategories = [...new Set(response.data.map(product => product.category))]
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchData();
    }, []);
    const handleSortChange = () => {
        setSortOrder((prevSortOrder) => (prevSortOrder === 'ascending' ? 'descending' : 'ascending'));
    };
    const sortedProducts = [...products].sort((a, b) => {
        const priceA = parseFloat(a.price)
        const priceB = parseFloat(b.price)

        if (sortOrder === 'ascending') {
            return priceA - priceB
        }
        else {
            return priceB - priceA
        }

    })

    return (
        <div>
            <div>
                <label htmlFor="category">Filter by Category: </label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>

                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}

                </select>
            </div>
            <div>
                <div>
                    <label htmlFor="search">Search by Name or Description: </label>
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

            </div>
            <div>
                <label>
                    Sort by Price:
                    <button onClick={handleSortChange}>
                        {sortOrder === 'ascending' ? 'Ascending' : 'Descending'}
                    </button>
                </label>
            </div>
            <div id="root">

                <div className='ProductContainer'>
                    {sortedProducts
                        .filter((product) =>
                            (!selectedCategory || product.category === selectedCategory) &&
                            (searchTerm.trim() === '' ||
                                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.description.toLowerCase().includes(searchTerm.toLowerCase()))
                        )
                        .map((product) => (
                            <div className='ProductCard' key={product.id}>
                                <Link to={`/products/${product.id}`}>
                                    <h2>{product.name}</h2>

                                </Link>
                                <p>{product.description}</p>

                                <p><span>Price: ${product.price}</span></p>
                            </div>
                        ))}
                </div>
            </div>
        </div>


    );

};

export default ProductList;

// const ProductList = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/api/products');
//                 setProducts(response.data);
//             } catch (error) {
//                 console.error('Error fetching product data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div id="root">
//             <div className='ProductContainer'>
//                 {products.map((product) => (
//                     <div className='ProductCard' key={product.id}>
//                         <Link to={`/products/${product.id}`}>
//                             <h2>{product.name}</h2>
//                         </Link>
//                         <p>{product.description}</p>
//                         <p><span>Price: ${product.price}</span></p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );

// };


