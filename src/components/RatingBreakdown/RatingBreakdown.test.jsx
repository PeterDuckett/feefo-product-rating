import { screen, within } from '@testing-library/react';

import { sampleRating } from '../../data/sampleRating';
import { renderWithTheme } from '../../test/renderWithTheme';
import RatingBreakdown from './RatingBreakdown';

describe('RatingBreakdown', () => {
  it('is a list labelled "Rating breakdown"', () => {
    renderWithTheme(<RatingBreakdown counts={sampleRating.counts} />);

    expect(screen.getByRole('list', { name: 'Rating breakdown' })).toBeInTheDocument();
  });

  it('shows one row per star level with its share of all 1,232 reviews', () => {
    renderWithTheme(<RatingBreakdown counts={sampleRating.counts} />);

    const rows = screen.getAllByRole('listitem').map((row) => row.textContent);
    expect(rows[0]).toContain('5 stars: 952 reviews (77%)');
    expect(rows[1]).toContain('4 stars: 171 reviews (14%)');
    expect(rows[2]).toContain('3 stars: 55 reviews (4%)');
    expect(rows[3]).toContain('2 stars: 14 reviews (1%)');
    expect(rows[4]).toContain('1 star: 40 reviews (3%)');
  });

  it('always lists 5 stars first, whatever order the data is in', () => {
    const shuffled = [
      { stars: 2, count: 1 },
      { stars: 5, count: 1 },
      { stars: 1, count: 1 },
    ];
    renderWithTheme(<RatingBreakdown counts={shuffled} />);

    const first = screen.getAllByRole('listitem')[0];
    expect(within(first).getByText(/^5 stars:/)).toBeInTheDocument();
  });

  it('does not change the array it was given', () => {
    const counts = [
      { stars: 1, count: 1 },
      { stars: 5, count: 1 },
    ];
    renderWithTheme(<RatingBreakdown counts={counts} />);

    expect(counts[0].stars).toBe(1);
  });

  it('renders an empty list for no data', () => {
    renderWithTheme(<RatingBreakdown counts={[]} />);

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
