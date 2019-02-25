import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductPreviewDumb.module.css';
import CartQuantitySmart from '../containers/CartQuantitySmart';

function ProductPreviewDumb({
    productId = null,
    title = 'Product Title',
    imageURL = '',
    imageAlt = '',
    remove = ({ productId }) => console.log(`Remove from cart clicked for product id ${productId}`)
  }) {
  return (
    <div className = {styles.productOutline}>
      <div className = {styles.thumbnail}>
        <img
          className = {styles.image}
          src = {imageURL}
          alt = {imageAlt} />
      </div>

      <button
        type = "button"
        className = {styles.removeButton}
        onClick = {() => remove({ productId })}
      >
        &times;
      </button>

      <div className = {styles.title}>
        {title}
      </div>

      <CartQuantitySmart productId = {productId} />
    </div>
  );
}

ProductPreviewDumb.propTypes = {
  productId: PropTypes.string,
  title: PropTypes.string,
  imageURL: PropTypes.string,
  imageAlt: PropTypes.string,
  remove: PropTypes.func
}

export default ProductPreviewDumb;