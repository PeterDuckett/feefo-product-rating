import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import App from './App';

describe('App', () => {
  it('shows the rating card from the design inside the main landmark', () => {
    render(<App />);

    const main = screen.getByRole('main');
    expect(main).toContainElement(screen.getByRole('region', { name: 'Excellent' }));
    expect(screen.getByRole('img', { name: 'Rated 4.6 out of 5 stars' })).toBeInTheDocument();
    expect(screen.getByText('5 stars: 952 reviews (77%)')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<App />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
