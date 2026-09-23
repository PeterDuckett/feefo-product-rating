import { render } from '@testing-library/react';

import StarIcon from './StarIcon';

describe('StarIcon', () => {
  it('is hidden from screen readers and not focusable', () => {
    const { container } = render(<StarIcon />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
  });

  it('uses the text colour by default', () => {
    const { container } = render(<StarIcon />);

    expect(container.querySelector('path')).toHaveAttribute('fill', 'currentColor');
  });

  it('accepts a colour and class name', () => {
    const { container } = render(<StarIcon color="#ff0000" className="big" />);

    expect(container.querySelector('path')).toHaveAttribute('fill', '#ff0000');
    expect(container.querySelector('svg')).toHaveClass('big');
  });
});
