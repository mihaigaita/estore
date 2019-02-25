import React from 'react';
import PropTypes from 'prop-types';
import styles from './CartQuantityDumb.module.css';

function CartQuantityDumb({
    productId = null,
    price = 0,
    quantity = 1,
    incrQuantity = ({ productId }) => console.log(`INCR quantity clicked for product id ${productId}`),
    decrQuantity = ({ productId }) => console.log(`DECR quantity occured for product id ${productId}`),
    setQuantity = ({ productId, quantity }) => console.log(`SET quantity ${quantity} for product id  ${productId}`)
  }) {
  return (
    <div className = {styles.quantityContainer}>
      <button 
        type = "button"
        className = {styles.minusButton}
        onClick = {() => decrQuantity({ productId })}
      >-</button>
      <input 
        className = {styles.inputQuantity}
        value = {quantity}
        onChange = {(event) => setQuantity({ productId, quantity: parseInt(event.target.value) })}
      />
      <button 
        type = "button"
        className = {styles.plusButton}
        onClick = {() => incrQuantity({ productId })}
      >+</button>
      <div
        className = {styles.price}
      >&times; ${price} </div>
    </div>
  );
}

CartQuantityDumb.propTypes = {
  productId: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  incrQuantity: PropTypes.func,
  decrQuantity: PropTypes.func,
  setQuantity: PropTypes.func
}

export default CartQuantityDumb;