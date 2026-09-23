import { screen } from '@testing-library/react';

import { renderWithTheme } from '../../test/renderWithTheme';
import RatingBreakdownRow from './RatingBreakdownRow';

function renderRow(props) {
  return renderWithTheme(
    <ul>
      <RatingBreakdownRow {...props} />
    </ul>,
  );
}

describe('RatingBreakdownRow', () => {
  it('describes the row in one sentence for screen readers', () => {
    renderRow({ stars: 5, count: 952, total: 1232 });

    expect(screen.getByRole('listitem')).toHaveTextContent('5 stars: 952 reviews (77%)');
  });

  it('uses the singular for 1 star and 1 review', () => {
    renderRow({ stars: 1, count: 1, total: 4 });

    expect(screen.getByText('1 star: 1 review (25%)')).toBeInTheDocument();
  });

  it('formats large counts with thousands separators', () => {
    renderRow({ stars: 5, count: 12345, total: 20000 });

    expect(screen.getByText('5 stars: 12,345 reviews (62%)')).toBeInTheDocument();
    expect(screen.getByText('12,345')).toBeInTheDocument();
  });

  it("sizes the bar by the row's share of all reviews", () => {
    renderRow({ stars: 4, count: 25, total: 100 });

    expect(screen.getByTestId('bar-fill')).toHaveStyleRule('width', '25%');
  });

  it('shows an empty bar, not NaN, when there are no reviews', () => {
    renderRow({ stars: 3, count: 0, total: 0 });

    expect(screen.getByTestId('bar-fill')).toHaveStyleRule('width', '0%');
    expect(screen.getByText('3 stars: 0 reviews (0%)')).toBeInTheDocument();
  });

  it('hides the visible number, star and bar from screen readers', () => {
    renderRow({ stars: 5, count: 952, total: 1232 });

    const item = screen.getByRole('listitem');
    const visibleParts = Array.from(item.children).slice(1);
    expect(visibleParts).toHaveLength(3);
    visibleParts.forEach((part) => expect(part).toHaveAttribute('aria-hidden', 'true'));
  });
});
