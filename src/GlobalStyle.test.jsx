import { renderWithTheme } from './test/renderWithTheme';
import GlobalStyle from './GlobalStyle';
import { theme } from './theme';

function bodyRule() {
  const rules = Array.from(document.styleSheets).flatMap((sheet) => Array.from(sheet.cssRules));
  return rules.find((rule) => rule.selectorText === 'body');
}

describe('GlobalStyle', () => {
  it('sets the page font and colours from the theme', () => {
    renderWithTheme(<GlobalStyle />);

    const { style } = bodyRule();
    // stylis removes the spaces after commas
    expect(style.getPropertyValue('font-family')).toBe(theme.font.replace(/,\s*/g, ','));
    expect(style.getPropertyValue('margin')).toBe('0');
    expect(style.getPropertyValue('color')).toBe(theme.colors.text);
    expect(style.getPropertyValue('background')).toBe(theme.colors.background);
  });
});
