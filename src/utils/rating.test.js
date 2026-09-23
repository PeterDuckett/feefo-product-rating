import { clamp, formatRating, percentage, ratingLabel, totalCount } from './rating';

describe('clamp', () => {
  it.each([
    [0.5, 0, 1, 0.5],
    [-1, 0, 1, 0],
    [2, 0, 1, 1],
  ])('clamp(%p, %p, %p) is %p', (value, min, max, expected) => {
    expect(clamp(value, min, max)).toBe(expected);
  });
});

describe('formatRating', () => {
  it('always shows one decimal place', () => {
    expect(formatRating(4.6)).toBe('4.6');
    expect(formatRating(5)).toBe('5.0');
    expect(formatRating(4.608)).toBe('4.6');
  });
});

describe('ratingLabel', () => {
  it.each([
    [5, 'Excellent'],
    [4.6, 'Excellent'],
    [4.5, 'Excellent'],
    [4.49, 'Good'],
    [3.5, 'Good'],
    [3.49, 'Average'],
    [2.5, 'Average'],
    [2.49, 'Poor'],
    [1.5, 'Poor'],
    [1.49, 'Very poor'],
    [0, 'Very poor'],
  ])('%p is %p', (rating, label) => {
    expect(ratingLabel(rating)).toBe(label);
  });
});

describe('totalCount', () => {
  it('adds up every count', () => {
    expect(totalCount([{ stars: 5, count: 952 }, { stars: 1, count: 40 }])).toBe(992);
  });

  it('is 0 for no rows', () => {
    expect(totalCount([])).toBe(0);
  });
});

describe('percentage', () => {
  it('is the share of the total', () => {
    expect(percentage(952, 1232)).toBeCloseTo(77.27, 2);
  });

  it('is 0 rather than NaN when there are no reviews', () => {
    expect(percentage(0, 0)).toBe(0);
  });

  it('never goes above 100', () => {
    expect(percentage(20, 10)).toBe(100);
  });
});
