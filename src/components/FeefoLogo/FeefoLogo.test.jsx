import { screen } from '@testing-library/react';

import { renderWithTheme } from '../../test/renderWithTheme';
import FeefoLogo from './FeefoLogo';

describe('FeefoLogo', () => {
  it('is announced as one image named Feefo', () => {
    renderWithTheme(<FeefoLogo />);

    expect(screen.getByRole('img', { name: 'Feefo' })).toBeInTheDocument();
  });

  it('hides the individual letters and eyes from screen readers', () => {
    renderWithTheme(<FeefoLogo />);

    const logo = screen.getByRole('img', { name: 'Feefo' });
    Array.from(logo.children).forEach((child) => {
      expect(child).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
