import { screen } from '@testing-library/react';

import { renderWithTheme } from '../../test/renderWithTheme';
import { theme } from '../../theme';
import StarTile from './StarTile';

function expectFill(percent) {
  const { star, starEmpty } = theme.colors;
  expect(screen.getByTestId('star-tile')).toHaveStyleRule(
    'background',
    `linear-gradient(to right, ${star} ${percent}%, ${starEmpty} ${percent}%)`,
  );
}

describe('StarTile', () => {
  it.each([
    [1, 100],
    [0.6, 60],
    [0, 0],
  ])('fill %p colours %p%% of the tile', (fill, percent) => {
    renderWithTheme(<StarTile fill={fill} />);
    expectFill(percent);
  });

  it('clamps fills above 1 to a full tile', () => {
    renderWithTheme(<StarTile fill={4.6} />);
    expectFill(100);
  });

  it('clamps negative fills to an empty tile', () => {
    renderWithTheme(<StarTile fill={-0.4} />);
    expectFill(0);
  });

  it('is hidden from screen readers', () => {
    renderWithTheme(<StarTile fill={1} />);
    expect(screen.getByTestId('star-tile')).toHaveAttribute('aria-hidden', 'true');
  });
});
