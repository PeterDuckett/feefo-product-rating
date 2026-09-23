import styled from 'styled-components';

import { formatRating, MAX_RATING } from '../../utils/rating';
import { ratingPropType } from '../../utils/propTypes';
import StarTile from '../StarTile';

const Stars = styled.div`
  display: grid;
  grid-template-columns: repeat(${MAX_RATING}, 1fr);
  gap: clamp(0.25rem, 1.5vw, 0.4rem);
  width: min(100%, 15rem);
  margin: 0 auto;
`;

/** The row of five star tiles. Read out as one image, e.g. "Rated 4.6 out of 5 stars". */
export default function StarRating({ rating }) {
  return (
    <Stars role="img" aria-label={`Rated ${formatRating(rating)} out of ${MAX_RATING} stars`}>
      {Array.from({ length: MAX_RATING }, (_, index) => (
        <StarTile key={index} fill={rating - index} />
      ))}
    </Stars>
  );
}

StarRating.propTypes = {
  rating: ratingPropType,
};
