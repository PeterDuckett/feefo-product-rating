import { screen } from '@testing-library/react';

import { renderWithTheme } from '../../test/renderWithTheme';
import StarRating from './StarRating';

describe('StarRating', () => {
  it('is announced as one image with the rating', () => {
    renderWithTheme(<StarRating rating={4.6} />);

    expect(screen.getByRole('img', { name: 'Rated 4.6 out of 5 stars' })).toBeInTheDocument();
  });

  it('draws five tiles', () => {
    renderWithTheme(<StarRating rating={4.6} />);

    expect(screen.getAllByTestId('star-tile')).toHaveLength(5);
  });

  it('fills four whole tiles and 60% of the fifth for 4.6', () => {
    renderWithTheme(<StarRating rating={4.6} />);

    const tiles = screen.getAllByTestId('star-tile');
    tiles.slice(0, 4).forEach((tile) => {
      expect(tile).toHaveStyleRule('background', expect.stringContaining('100%'));
    });
    expect(tiles[4]).toHaveStyleRule('background', expect.stringContaining('60%'));
  });

  it('shows no filled tiles for 0', () => {
    renderWithTheme(<StarRating rating={0} />);

    screen.getAllByTestId('star-tile').forEach((tile) => {
      expect(tile).toHaveStyleRule('background', expect.stringContaining(' 0%'));
    });
  });
});
