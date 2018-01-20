import React, { Component } from 'react';

class Product extends Component {
    render() {
        return (
            <div>
                <ProductImage />
                <h1>상품명상품명상품명</h1>
            </div>
        );
    }
}

class ProductImage extends Component {
    render() {
        return (
            <img src="http://item.ssgcdn.com/32/08/58/item/1000024580832_i1_500.jpg" />
        );
    }
}

export default Product;