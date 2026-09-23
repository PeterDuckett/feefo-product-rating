import styled from 'styled-components';

import { percentage } from '../../utils/rating';
import { countPropType, starsPropType } from '../../utils/propTypes';
import StarIcon from '../StarIcon';
import VisuallyHidden from '../VisuallyHidden';

const Row = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 2.25rem 1fr 3rem;
  align-items: center;
  gap: 0.75rem;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.muted};
`;

const StarLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 600;

  svg {
    width: 1.1em;
    height: 1.1em;
    color: ${({ theme }) => theme.colors.icon};
  }
`;

const Track = styled.span`
  height: 0.55rem;
  border-radius: ${({ theme }) => theme.radius.bar};
  background: ${({ theme }) => theme.colors.track};
  overflow: hidden;
`;

const Fill = styled.span`
  display: block;
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: ${({ theme }) => theme.colors.star};
`;

function plural(n, word) {
  return `${n} ${n === 1 ? word : `${word}s`}`;
}

/**
 * One line of the breakdown: star level, bar and number of reviews.
 * The visible parts are hidden from screen readers and replaced by one
 * sentence, e.g. "5 stars: 952 reviews (77%)".
 */
export default function RatingBreakdownRow({ stars, count, total }) {
  const percent = percentage(count, total);
  const formattedCount = count.toLocaleString('en-GB');

  return (
    <Row>
      <VisuallyHidden>
        {`${plural(stars, 'star')}: ${formattedCount} ${count === 1 ? 'review' : 'reviews'} (${Math.round(percent)}%)`}
      </VisuallyHidden>
      <StarLabel aria-hidden="true">
        {stars}
        <StarIcon />
      </StarLabel>
      <Track aria-hidden="true">
        <Fill $percent={percent} data-testid="bar-fill" />
      </Track>
      <span aria-hidden="true">{formattedCount}</span>
    </Row>
  );
}

RatingBreakdownRow.propTypes = {
  stars: starsPropType.isRequired,
  count: countPropType,
  total: countPropType,
};
