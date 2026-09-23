import PropTypes from 'prop-types';
import styled from 'styled-components';

/** Hidden on screen but still read by screen readers. */
const Hidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;

export default function VisuallyHidden({ children }) {
  return <Hidden>{children}</Hidden>;
}

VisuallyHidden.propTypes = {
  children: PropTypes.node.isRequired,
};
