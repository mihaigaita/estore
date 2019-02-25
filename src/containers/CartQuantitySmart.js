import { connect } from 'react-redux';
import cartSlice, { makeGetQuantity } from '../slices/cart';
import { getProductData } from '../slices/products';
import CartQuantityDumb from '../components/CartQuantityDumb';

/*  function (productId) => {
      <CartQuantityDumb: productId, price, quantity, 
                         incrQuantity, decrQuantity, setQuantity />
    }
*/

// We use a factory in order to provide a separate cache for each instance
// because each instance depends on productId which breaks a unified caching
let makeMapStateToProps = () => {
  let mapStateToProps = (state, ownProps) => {
    let { price } = getProductData(state, ownProps);
    let getQuantity = makeGetQuantity(ownProps.productId);
    let quantity = getQuantity(state, ownProps);
    
    return {
      price,
      quantity
    };
  };
  return mapStateToProps;
};

let { incrQuantity, decrQuantity, setQuantity } = cartSlice.actions;

export default connect(
  makeMapStateToProps,
  { incrQuantity, decrQuantity, setQuantity }
)(CartQuantityDumb)