import { screen } from '@testing-library/react';

import { renderWithTheme } from '../../test/renderWithTheme';
import VisuallyHidden from './VisuallyHidden';

describe('VisuallyHidden', () => {
  it('keeps the text in the page for screen readers', () => {
    renderWithTheme(<VisuallyHidden>Only for screen readers</VisuallyHidden>);

    expect(screen.getByText('Only for screen readers')).toBeInTheDocument();
  });

  it('is clipped to 1px so it is not visible', () => {
    renderWithTheme(<VisuallyHidden>Hidden</VisuallyHidden>);

    const element = screen.getByText('Hidden');
    expect(element).toHaveStyleRule('position', 'absolute');
    expect(element).toHaveStyleRule('width', '1px');
    expect(element).toHaveStyleRule('clip', 'rect(0 0 0 0)');
  });
});
