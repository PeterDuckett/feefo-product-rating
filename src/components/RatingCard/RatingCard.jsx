import { useId } from 'react';
import styled from 'styled-components';

import { ratingCountsPropType, ratingPropType } from '../../utils/propTypes';
import ProductRatingBrand from '../ProductRatingBrand';
import RatingBreakdown from '../RatingBreakdown';
import RatingLabel from '../RatingLabel';
import RatingScore from '../RatingScore';
import StarRating from '../StarRating';

const Card = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 26rem;
  padding: clamp(1.25rem, 6vw, 2.5rem) clamp(1rem, 5vw, 2.25rem);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.colors.surface};
  font-family: ${({ theme }) => theme.font};
  text-align: center;
`;

const Divider = styled.div`
  height: clamp(0.75rem, 3vw, 1.5rem);
`;

/**
 * The whole product rating card. It's a labelled section, so screen reader
 * users can find it by its heading ("Excellent").
 */
export default function RatingCard({ rating, counts }) {
  const headingId = useId();

  return (
    <Card aria-labelledby={headingId}>
      <RatingLabel id={headingId} rating={rating} />
      <StarRating rating={rating} />
      <RatingScore rating={rating} />
      <ProductRatingBrand />
      <Divider aria-hidden="true" />
      <RatingBreakdown counts={counts} />
    </Card>
  );
}

RatingCard.propTypes = {
  rating: ratingPropType,
  counts: ratingCountsPropType.isRequired,
};
