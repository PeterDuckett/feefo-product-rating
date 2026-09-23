import { screen } from '@testing-library/react';

import { renderWithTheme } from '../../test/renderWithTheme';
import ProductRatingBrand from './ProductRatingBrand';

describe('ProductRatingBrand', () => {
  it('shows "Product Rating" followed by the feefo logo', () => {
    renderWithTheme(<ProductRatingBrand />);

    const text = screen.getByText('Product Rating');
    const logo = screen.getByRole('img', { name: 'Feefo' });
    expect(text.compareDocumentPosition(logo) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('wraps onto two lines on narrow screens', () => {
    renderWithTheme(<ProductRatingBrand />);

    expect(screen.getByText('Product Rating').parentElement).toHaveStyleRule('flex-wrap', 'wrap');
  });
});
