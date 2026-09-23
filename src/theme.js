/**
 * Design tokens shared by all components through styled-components' ThemeProvider.
 * Text colours meet WCAG AA contrast (4.5:1) against the white card.
 */
export const theme = {
  colors: {
    star: '#FFCC33',
    starEmpty: '#D9D9D9',
    track: '#E6E6E6',
    icon: '#CCCCCC',
    text: '#1F1F1F', // 16.1:1 on white
    muted: '#5F6368', // 6.4:1 on white
    border: '#DADADA',
    surface: '#FFFFFF',
    background: '#F5F5F5',
  },
  font: "'Poppins', system-ui, -apple-system, 'Segoe UI', sans-serif",
  radius: {
    card: '1rem',
    tile: '0.375rem',
    bar: '2px',
  },
};
