import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductCollectionDumb.module.css';
import ProductCardSmart from '../containers/ProductCardSmart';

class ProductsCollectionDumb extends React.Component {
  static defaultProps = {
    tagId: null,
    title: 'Product Container',
    productIdList: [],
    getProducts: () => undefined
  }

  componentDidMount() {
    this.props.getProducts(this.props.tagId, 
      `ProductsCollectionDumb initialization for tagId ${this.props.tagId}`);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.groupHeader}>
          <div className = {styles.groupTitle}>
            {this.props.title}
          </div>
          <div className = {styles.padBox} />
        </div>
        <div className={styles.productsContainer}>
          {this.props.productIdList.map(productId => {
            return (
              <ProductCardSmart 
                key = {productId}
                productId = {productId}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

ProductsCollectionDumb.propTypes = {
  tagId: PropTypes.string,
  title: PropTypes.string,
  productIdList: PropTypes.arrayOf(PropTypes.string),
  getProducts: PropTypes.func
}

export default ProductsCollectionDumb;