import { screen } from '@testing-library/react';

import { renderWithTheme } from '../../test/renderWithTheme';
import RatingLabel from './RatingLabel';

describe('RatingLabel', () => {
  it('renders a level 2 heading with the label for the rating', () => {
    renderWithTheme(<RatingLabel id="label" rating={4.6} />);

    const heading = screen.getByRole('heading', { level: 2, name: 'Excellent' });
    expect(heading).toHaveAttribute('id', 'label');
  });

  it('changes with the rating', () => {
    renderWithTheme(<RatingLabel id="label" rating={3.8} />);

    expect(screen.getByRole('heading', { name: 'Good' })).toBeInTheDocument();
  });

  it('uses CSS for upper case, so the text itself stays readable', () => {
    renderWithTheme(<RatingLabel id="label" rating={4.6} />);

    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent(/^Excellent$/);
    expect(heading).toHaveStyleRule('text-transform', 'uppercase');
  });
});
