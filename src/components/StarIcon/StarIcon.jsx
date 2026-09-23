import PropTypes from 'prop-types';

/** Decorative five-point star. Hidden from screen readers; the meaning is given as text elsewhere. */
export default function StarIcon({ color = 'currentColor', className = undefined }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill={color}
        d="M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52l-5.88 3.09 1.12-6.55L2.48 9.42l6.58-.96z"
      />
    </svg>
  );
}

StarIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};
