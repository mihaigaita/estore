import { connect } from 'react-redux';
import { getCartTotal, getProductIdsInCart } from '../slices/cart';
import CartDumb from '../components/CartDumb';

// function () => <CartDumb: productIdsInCart[productId], cartTotal />

let mapStateToProps = (state) => {
  return {
    productIdsInCart: getProductIdsInCart(state),
    cartTotal: getCartTotal(state)
  };
};

export default connect(
  mapStateToProps
)(CartDumb)