import styled from 'styled-components';

const Logo = styled.span`
  display: inline-flex;
  align-items: flex-start;
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
`;

const Eyes = styled.span`
  display: inline-flex;
  gap: 0.05em;
  margin-left: 0.05em;
  font-size: 0.45em;
`;

const Eye = styled.span`
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.star};
  box-shadow: inset 0 -0.18em 0 ${({ theme }) => theme.colors.text};
`;

/**
 * A CSS approximation of the feefo wordmark, so the project needs no image assets.
 * Exposed to screen readers as a single image named "Feefo".
 */
export default function FeefoLogo() {
  return (
    <Logo role="img" aria-label="Feefo">
      <span aria-hidden="true">feefo</span>
      <Eyes aria-hidden="true">
        <Eye />
        <Eye />
      </Eyes>
    </Logo>
  );
}
