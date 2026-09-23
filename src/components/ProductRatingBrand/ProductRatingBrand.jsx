import styled from 'styled-components';

import FeefoLogo from '../FeefoLogo';

const Brand = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted};
`;

/** "Product Rating" followed by the feefo logo. */
export default function ProductRatingBrand() {
  return (
    <Brand>
      <span>Product Rating</span>
      <FeefoLogo />
    </Brand>
  );
}
