import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../theme';

/** Testing Library's render, wrapped in the app's ThemeProvider. */
export function renderWithTheme(ui, options) {
  return render(ui, {
    wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    ...options,
  });
}
