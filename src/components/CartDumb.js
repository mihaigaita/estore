import React from 'react';
import PropTypes from 'prop-types';
import styles from './CartDumb.module.css'
import ProductPreviewSmart from '../containers/ProductPreviewSmart';

function CartDumb({
  title = 'Cart',
  productIdsInCart = [],
  cartTotal = 0
}) {
  return (
    <div className= {styles.cartOutline}>
      <div className = {styles.header}>
        <div className = {styles.title}>
          {title}
        </div>
      </div>

      <div className = {styles.productList}>
        {productIdsInCart.map(productId => {
          return (
            <ProductPreviewSmart 
              key = {productId} 
              productId = {productId}
            />
          );
        })}
      </div>
      <div className = {styles.priceTotal}>
        Total Price: ${cartTotal}
      </div>
    </div>
  );
}

CartDumb.propTypes = {
  title: PropTypes.string,
  productIdsInCart: PropTypes.arrayOf(PropTypes.string),
  cartTotal: PropTypes.number
}

export default CartDumb;