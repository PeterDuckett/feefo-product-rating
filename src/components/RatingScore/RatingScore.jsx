import styled from 'styled-components';

import { formatRating, MAX_RATING } from '../../utils/rating';
import { ratingPropType } from '../../utils/propTypes';

const Score = styled.p`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

/** "4.6 OUT OF 5" under the stars. */
export default function RatingScore({ rating }) {
  return (
    <Score>
      {formatRating(rating)} out of {MAX_RATING}
    </Score>
  );
}

RatingScore.propTypes = {
  rating: ratingPropType,
};
