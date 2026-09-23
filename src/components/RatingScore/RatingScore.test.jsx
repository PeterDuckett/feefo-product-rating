import { screen } from '@testing-library/react';

import { renderWithTheme } from '../../test/renderWithTheme';
import RatingScore from './RatingScore';

describe('RatingScore', () => {
  it('shows the rating out of 5 with one decimal place', () => {
    renderWithTheme(<RatingScore rating={4.6} />);

    expect(screen.getByText('4.6 out of 5')).toBeInTheDocument();
  });

  it('shows whole numbers with a decimal place', () => {
    renderWithTheme(<RatingScore rating={5} />);

    expect(screen.getByText('5.0 out of 5')).toBeInTheDocument();
  });

  it('is upper case through CSS only', () => {
    renderWithTheme(<RatingScore rating={4.6} />);

    expect(screen.getByText('4.6 out of 5')).toHaveStyleRule('text-transform', 'uppercase');
  });
});
