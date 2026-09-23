import PropTypes from 'prop-types';

import { countPropType, ratingCountsPropType, ratingPropType } from './propTypes';

describe('ratingPropType', () => {
  const check = (rating) => ratingPropType({ rating }, 'rating', 'Test');

  it.each([0, 2.5, 4.6, 5])('accepts %p', (rating) => {
    expect(check(rating)).toBeNull();
  });

  it.each([-0.1, 5.1, Number.NaN, '4.6'])('rejects %p', (rating) => {
    expect(check(rating)).toEqual(expect.any(Error));
    expect(check(rating).message).toMatch('between 0 and 5');
  });

  it('is required', () => {
    expect(check(undefined).message).toMatch('is required');
    expect(check(null).message).toMatch('is required');
  });
});

describe('countPropType', () => {
  const check = (count) => countPropType({ count }, 'count', 'Test');

  it.each([0, 1, 952])('accepts %p', (count) => {
    expect(check(count)).toBeNull();
  });

  it.each([-1, 1.5, '10'])('rejects %p', (count) => {
    expect(check(count).message).toMatch('whole number of 0 or more');
  });

  it('is required', () => {
    expect(check(undefined).message).toMatch('is required');
  });

  it('names the full path when used inside a shape', () => {
    const error = countPropType({ count: -1 }, 'count', 'Test', 'prop', 'counts[0].count');
    expect(error.message).toMatch('counts[0].count');
  });
});

describe('ratingCountsPropType', () => {
  let consoleError;

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    PropTypes.resetWarningCache();
  });

  afterEach(() => consoleError.mockRestore());

  const check = (counts) =>
    PropTypes.checkPropTypes({ counts: ratingCountsPropType }, { counts }, 'prop', 'Test');

  it('accepts valid rows', () => {
    check([{ stars: 5, count: 952 }]);
    expect(consoleError).not.toHaveBeenCalled();
  });

  it('warns about an unknown star level', () => {
    check([{ stars: 6, count: 1 }]);
    expect(consoleError).toHaveBeenCalledWith(expect.stringContaining('counts[0].stars'));
  });

  it('warns about a negative count', () => {
    check([{ stars: 5, count: -3 }]);
    expect(consoleError).toHaveBeenCalledWith(expect.stringContaining('counts[0].count'));
  });
});
