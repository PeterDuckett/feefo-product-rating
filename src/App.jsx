import styled, { ThemeProvider } from 'styled-components';

import RatingCard from './components/RatingCard';
import { sampleRating } from './data/sampleRating';
import GlobalStyle from './GlobalStyle';
import { theme } from './theme';

const Page = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: clamp(1rem, 5vw, 3rem) 1rem;
`;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Page>
        <RatingCard rating={sampleRating.rating} counts={sampleRating.counts} />
      </Page>
    </ThemeProvider>
  );
}
