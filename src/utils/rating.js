export const MAX_RATING = 5;

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/** One decimal place, as in the design: 4.6 -> "4.6", 5 -> "5.0". */
export function formatRating(rating) {
  return rating.toFixed(1);
}

/**
 * The word shown above the stars. The design only shows "Excellent" for 4.6,
 * so the other bands are an assumption based on a five-point scale.
 */
export function ratingLabel(rating) {
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 3.5) return 'Good';
  if (rating >= 2.5) return 'Average';
  if (rating >= 1.5) return 'Poor';
  return 'Very poor';
}

export function totalCount(counts) {
  return counts.reduce((sum, { count }) => sum + count, 0);
}

/** Share of the total as 0-100. Returns 0 rather than NaN when there are no reviews. */
export function percentage(count, total) {
  if (!(total > 0)) return 0;
  return clamp((count / total) * 100, 0, 100);
}
