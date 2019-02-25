import { connect } from 'react-redux';
import cartSlice from '../slices/cart';
import { getProductData } from '../slices/products';
import ProductCardDumb from '../components/ProductCardDumb';

/*  function (productId) => {
      <ProductCardDumb: productId, title, imageURL, 
                        imageAlt, price, ratingInStars, incrQuantity />
    }
*/

let mapStateToProps = (state, ownProps) => {
  let productData = getProductData(state, ownProps);
  if (productData) {
    let { 
      title, 
      ratingInStars, 
      price, 
      imageURL, 
      imageAlt 
    } = productData;

    return {
      title, 
      ratingInStars, 
      price, 
      imageURL, 
      imageAlt
    };
  } else {
    return {};
  }
};

export default connect(
  mapStateToProps,
  { incrQuantity: cartSlice.actions.incrQuantity }
)(ProductCardDumb)