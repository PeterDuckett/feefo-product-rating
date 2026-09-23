import PropTypes from 'prop-types';
import styled from 'styled-components';

import { clamp } from '../../utils/rating';
import StarIcon from '../StarIcon';

const Tile = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.radius.tile};
  color: ${({ theme }) => theme.colors.surface};
  background: ${({ theme, $percent }) =>
    `linear-gradient(to right, ${theme.colors.star} ${$percent}%, ${theme.colors.starEmpty} ${$percent}%)`};

  svg {
    width: 62%;
    height: 62%;
  }
`;

/**
 * One square star tile. `fill` is how much of the tile is coloured, from 0 to 1,
 * so a rating of 4.6 gives the fifth tile a fill of 0.6. Values outside 0-1 are clamped.
 */
export default function StarTile({ fill }) {
  const percent = Math.round(clamp(fill, 0, 1) * 100);
  return (
    <Tile $percent={percent} data-testid="star-tile" aria-hidden="true">
      <StarIcon />
    </Tile>
  );
}

StarTile.propTypes = {
  fill: PropTypes.number.isRequired,
};
