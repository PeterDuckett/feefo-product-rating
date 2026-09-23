import PropTypes from 'prop-types';

import { MAX_RATING } from './rating';

function isMissing(value) {
  return value === undefined || value === null;
}

/** Required number between 0 and MAX_RATING. */
export function ratingPropType(props, propName, componentName) {
  const value = props[propName];
  if (isMissing(value)) {
    return new Error(`The prop \`${propName}\` is required in \`${componentName}\`.`);
  }
  if (typeof value !== 'number' || Number.isNaN(value) || value < 0 || value > MAX_RATING) {
    return new Error(
      `Invalid prop \`${propName}\` of value \`${value}\` supplied to \`${componentName}\`, ` +
        `expected a number between 0 and ${MAX_RATING}.`,
    );
  }
  return null;
}

/** Required whole number of 0 or more. Also works inside PropTypes.shape. */
export function countPropType(props, propName, componentName, location, propFullName) {
  const value = props[propName];
  const name = propFullName || propName;
  if (isMissing(value)) {
    return new Error(`The prop \`${name}\` is required in \`${componentName}\`.`);
  }
  if (!Number.isInteger(value) || value < 0) {
    return new Error(
      `Invalid prop \`${name}\` of value \`${value}\` supplied to \`${componentName}\`, ` +
        'expected a whole number of 0 or more.',
    );
  }
  return null;
}

export const starsPropType = PropTypes.oneOf([1, 2, 3, 4, 5]);

/** One row of the breakdown, e.g. { stars: 5, count: 952 }. */
export const ratingCountShape = PropTypes.shape({
  stars: starsPropType.isRequired,
  count: countPropType,
});

export const ratingCountsPropType = PropTypes.arrayOf(ratingCountShape);
