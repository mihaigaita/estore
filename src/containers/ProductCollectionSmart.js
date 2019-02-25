import { connect } from 'react-redux';
import { getProductIdListAndName } from '../slices/tags';
import { getProducts } from '../actions';
import ProductCollectionDumb from '../components/ProductCollectionDumb';

// function (tagId) => <ProductCollectionDumb: tagId, title, productIdList, getProducts />

let mapStateToProps = (state, ownProps) => {
  let {title, productIdList} = getProductIdListAndName(state, ownProps);

  return {
    title,
    productIdList
  };
};

export default connect(
  mapStateToProps,
  { getProducts }
)(ProductCollectionDumb)