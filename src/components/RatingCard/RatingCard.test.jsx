import { screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import PropTypes from 'prop-types';

import { sampleRating } from '../../data/sampleRating';
import { renderWithTheme } from '../../test/renderWithTheme';
import RatingCard from './RatingCard';

function renderCard(props = {}) {
  return renderWithTheme(<RatingCard {...sampleRating} {...props} />);
}

describe('RatingCard', () => {
  it('is a section named by its heading', () => {
    renderCard();

    expect(screen.getByRole('region', { name: 'Excellent' })).toBeInTheDocument();
  });

  it('shows every part of the design in order', () => {
    renderCard();

    const parts = [
      screen.getByRole('heading', { name: 'Excellent' }),
      screen.getByRole('img', { name: 'Rated 4.6 out of 5 stars' }),
      screen.getByText('4.6 out of 5'),
      screen.getByText('Product Rating'),
      screen.getByRole('list', { name: 'Rating breakdown' }),
    ];
    parts.slice(1).forEach((part, i) => {
      expect(parts[i].compareDocumentPosition(part) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
  });

  it('gives each card a unique heading id', () => {
    renderWithTheme(
      <>
        <RatingCard {...sampleRating} />
        <RatingCard {...sampleRating} rating={3.8} />
      </>,
    );

    const [first, second] = screen.getAllByRole('heading');
    expect(first.id).not.toBe(second.id);
    expect(screen.getByRole('region', { name: 'Good' })).toBeInTheDocument();
  });

  it('never grows wider than the design', () => {
    renderCard();

    expect(screen.getByRole('region')).toHaveStyleRule('max-width', '26rem');
    expect(screen.getByRole('region')).toHaveStyleRule('width', '100%');
  });

  it('has no accessibility violations', async () => {
    const { container } = renderCard();

    expect(await axe(container)).toHaveNoViolations();
  });

  describe('prop types', () => {
    let consoleError;

    beforeEach(() => {
      consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      PropTypes.resetWarningCache();
    });

    afterEach(() => consoleError.mockRestore());

    it('warns when the rating is outside 0-5', () => {
      renderCard({ rating: 7 });

      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('Failed %s type'),
        'prop',
        expect.stringContaining('expected a number between 0 and 5'),
        expect.anything(),
      );
    });

    it('does not warn for valid props', () => {
      renderCard();

      expect(consoleError).not.toHaveBeenCalled();
    });
  });
});
