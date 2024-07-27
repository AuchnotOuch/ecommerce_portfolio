import React from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/ProductList';

const CategoryProducts = () => {
    const { category } = useParams();

    return (
        <ProductList category={category} />
    );
};

export default CategoryProducts;
