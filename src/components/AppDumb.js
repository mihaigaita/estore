import React from 'react';
import PropTypes from 'prop-types';
import styles from './AppDumb.module.css';
import ProductCollectionSmart from '../containers/ProductCollectionSmart';
import CartSmart from '../containers/CartSmart';

class AppDumb extends React.Component {
  static defaultProps = {
    tagIdList: [],
    getTags: () => undefined
  }

  componentDidMount() {
    this.props.getTags('AppDumb initialization');
  }

  render() {
    return (
      <div className = {styles.content}>
        <div className = {styles.main}>
          {this.props.tagIdList.map(tagId => {
            return (
            <ProductCollectionSmart 
              key = {tagId} 
              tagId = {tagId}
            />
            );
          })}
        </div>
        <div className = {styles.side}>
          <CartSmart/>
        </div>
      </div>
    );
  }
}

AppDumb.propTypes = {
  tagIdList: PropTypes.arrayOf(PropTypes.string),
  getTags: PropTypes.func
}

export default AppDumb;