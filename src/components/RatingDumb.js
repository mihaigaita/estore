import React from 'react';
import PropTypes from 'prop-types';
import styles from './RatingDumb.module.css'
import {range} from '../other/helpers';

function RatingDumb({
    starCount = 0
  }) {
  return (
    <div className = {styles.ratingContainer}>
      { // Draw full stars
        range(starCount).map(index => {
        return (
          <div 
            className = {styles.star}
            key = {index}
          >
            &#9733;
          </div>
        );
      })}

      { // Draw empty stars
        range(5 - starCount).map(index => {
        return (
          <div 
            className = {styles.star}
            key = {index}
          >
            &#9734;
          </div>
        );
      })}
    </div>
  );
}

RatingDumb.propTypes = {
  starCount: PropTypes.number
}

export default RatingDumb;