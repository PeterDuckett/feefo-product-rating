import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ratingLabel } from '../../utils/rating';
import { ratingPropType } from '../../utils/propTypes';

// Upper case comes from CSS so screen readers say "Excellent", not spell out "E-X-C..."
const Heading = styled.h2`
  margin: 0;
  font-size: clamp(1.25rem, 5vw, 1.6rem);
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

/** The heading above the stars, e.g. "Excellent" for 4.6. */
export default function RatingLabel({ id, rating }) {
  return <Heading id={id}>{ratingLabel(rating)}</Heading>;
}

RatingLabel.propTypes = {
  id: PropTypes.string.isRequired,
  rating: ratingPropType,
};
