import React from 'react';
import PropTypes from 'prop-types';
import styles from './RatingDumb.module.css'
import {rangeGenerator} from '../other/helpers';

function RatingDumb({
    starCount = 0
  }) {
  let rangeFull = [...rangeGenerator(starCount)];
  let rangeEmpty = [...rangeGenerator(5 - starCount)];
  return (
    <div className = {styles.ratingContainer}>
      { // Draw full stars
        rangeFull.map(index => {
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
        rangeEmpty.map(index => {
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