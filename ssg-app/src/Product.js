import React from 'react';
//import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Product.css';

/*
class Product extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <ProductImage image={this.props.image} />
                <h1>{this.props.name}</h1>
            </div>
        );
    }
}
*/
function Product({ soldout, name, image, price, link }) {
    return (
        <li>
            <div className={soldout === 'Y' ? 'cunit_prod cunit_soldout' : 'cunit_prod'}>
                <div className="thmb">
                    <a href={link}>
                        <ProductImage image={soldout === 'Y' ? 'http://img.ssgcdn.com/trans.ssg?src=/ui/ssg/img/common/img_ready_500x500.jpg&w=232&h=232' : image} alt={name} />
                    </a>
                </div>
            </div>
            <div className="cunit_info">
                <div className="cunit_md">
                    <div className="title"><a href={link}>{name}</a></div>
                </div>
                <div className="cunit_price">
                    <div className="opt_price">
                        <span className="blind">판매가</span>
                        <em className="ssg_price">{price}</em> <span className="ssg_tx">원</span>
                    </div>
                </div>
            </div>
        </li>
    )
} 
Product.propTypes = {
    soldout: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
}

/*
class ProductImage extends Component {
    static propTypes = {
        image: PropTypes.string.isRequired
    }

    render() {
        return (
            <img src={this.props.image} />
        );
    }
}
*/
function ProductImage({image, alt}) {
    return (
        <img src={image} alt={alt} title={alt} width="232" height="232" />
    )
}
ProductImage.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}

export default Product;