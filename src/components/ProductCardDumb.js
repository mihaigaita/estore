import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductCardDumb.module.css';
import RatingDumb from './RatingDumb';

function ProductCardDumb({
      productId = null,
      title = 'Product Title', 
      imageURL = '',
      imageAlt = '',
      price = 0,
      ratingInStars = 0,
      incrQuantity = ({ productId }) => console.log(`AddToCart clicked for product id ${productId}`)
  }) {
  return (
    <a href = '#' className = {styles.cardOutline}>
      <div className = {styles.thumbnail}>
        <img
          className = {styles.image}
          src = {imageURL} 
          alt = {imageAlt} />
      </div>

      <div className = {styles.title}>
        {title}
      </div>

      <RatingDumb starCount = {ratingInStars} />

      <div className = {styles.price}>
        ${price}
      </div>

      <button 
        type = "button"
        className = {styles.addToCartButton}
        onClick = {() => incrQuantity({ productId })}
      >
        Add to Cart
      </button>
    </a>
  );
}

ProductCardDumb.propTypes = {
  productId: PropTypes.string,
  title: PropTypes.string,
  imageURL: PropTypes.string,
  imageAlt: PropTypes.string,
  price: PropTypes.number,
  ratingInStars: PropTypes.number,
  incrQuantity: PropTypes.func
}

export default ProductCardDumb;