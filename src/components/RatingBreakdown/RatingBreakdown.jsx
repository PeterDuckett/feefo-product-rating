import styled from 'styled-components';

import { totalCount } from '../../utils/rating';
import { ratingCountsPropType } from '../../utils/propTypes';
import RatingBreakdownRow from '../RatingBreakdownRow';

const List = styled.ul`
  display: grid;
  gap: 0.75rem;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

/** The bars for 5 stars down to 1 star. Each bar's length is its share of all reviews. */
export default function RatingBreakdown({ counts }) {
  const total = totalCount(counts);
  const rows = [...counts].sort((a, b) => b.stars - a.stars);

  return (
    <List aria-label="Rating breakdown">
      {rows.map(({ stars, count }) => (
        <RatingBreakdownRow key={stars} stars={stars} count={count} total={total} />
      ))}
    </List>
  );
}

RatingBreakdown.propTypes = {
  counts: ratingCountsPropType.isRequired,
};
