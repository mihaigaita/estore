import { connect } from 'react-redux';
import cartSlice from '../slices/cart';
import { getProductData } from '../slices/products';
import ProductPreviewDumb from '../components/ProductPreviewDumb';

/*  function (productId) => {
      <ProductPreviewDumb: productId, title, imageURL, imageAlt, remove />
    } 
*/

let mapStateToProps = (state, ownProps) => {
  let {title, imageURL, imageAlt} = getProductData(state, ownProps);
  
  return {
    title,
    imageURL,
    imageAlt
  };
};

export default connect(
  mapStateToProps,
  { remove: cartSlice.actions.remove }
)(ProductPreviewDumb)