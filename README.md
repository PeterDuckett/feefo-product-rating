# Feefo Product Rating

Solution to Feefo technical assessment, part 2 (UI Assessment): the product
rating card from the design, built as a set of React components.

Built with React 18, styled-components, prop-types and Vite, and tested with
Jest and Testing Library.

## A note on how this was built

I want to be upfront: this part of the assessment relied heavily on an AI
assistant, and I'm sorry that it isn't more fully my own work.

I have never used React before. My front-end experience is in HTML, JSP and
GWT, and I have spent most of my career in backend and architecture roles. I
didn't have enough time around this assessment to learn React properly, so
rather than submit something unfinished, I used AI to help me produce the
components, styling and tests you see here.

I don't want this to give a false picture of my skills, which is why I'm
saying so here. If I'm lucky enough to progress, I'm committed to upskilling in
React and modern front-end development, and I'd be glad to talk openly about
this at interview. Thank you for your understanding.

## Running

Requires Node.js 18 or newer.

```bash
npm install
npm run dev             # start the dev server at http://localhost:5173
npm test                # run the tests
npm run test:coverage   # run the tests with a coverage report (coverage/lcov-report/index.html)
npm run build           # production build in dist/
```

## Components

```
src/
  App.jsx                       page layout, ThemeProvider and sample data
  theme.js                      colours, font and radii shared by all components
  GlobalStyle.js                page font and background
  data/sampleRating.js          the figures from the design
  utils/
    rating.js                   label, formatting and percentage helpers
    propTypes.js                shared custom prop-type validators
  components/
    RatingCard/                 the whole card: a <section> labelled by its heading
      RatingLabel/              "EXCELLENT" heading, worked out from the rating
      StarRating/               the row of five star tiles
        StarTile/               one tile, partly filled for fractions (4.6 -> 60%)
      RatingScore/              "4.6 OUT OF 5"
      ProductRatingBrand/       "Product Rating" + logo
        FeefoLogo/              CSS version of the feefo wordmark
      RatingBreakdown/          list of bars, 5 stars down to 1
        RatingBreakdownRow/     one bar: star level, bar and number of reviews
    StarIcon/                   shared decorative star SVG
    VisuallyHidden/             text for screen readers only
```

The tree above shows how the components nest. On disk, each component has its
own folder under `components/` with its test next to it.

`RatingCard` takes two props:

```jsx
<RatingCard
  rating={4.6}
  counts={[
    { stars: 5, count: 952 },
    { stars: 4, count: 171 },
    // ...
  ]}
/>
```

## How it matches the design

- **Bars:** each bar is that star level's share of all reviews. 952 of 1,232
  reviews is 77%, which matches the length of the 5-star bar in the design.
- **Partial stars:** each tile is filled by `rating - index`, limited to 0-1,
  using a hard-edged `linear-gradient`. For 4.6 the first four tiles are full
  and the fifth is 60% full.
- **Heading:** worked out from the rating. The design only shows "Excellent" for
  4.6, so the other bands (Good, Average, Poor, Very poor) are an assumption.
- **Logo:** drawn with CSS, so the project needs no image files. It could be
  swapped for the official SVG asset.
- **Font:** Poppins from Google Fonts, loaded in `index.html`.

## Responsive layout

- The card is `width: 100%` with a `max-width` of `26rem`, so it keeps the
  design's size on large screens and shrinks to fit on phones.
- Padding, gaps and the heading size use `clamp()`, so they scale smoothly with
  the viewport instead of jumping at breakpoints.
- The star tiles are a five-column grid with `aspect-ratio: 1`, so they stay
  square at any width.
- Each breakdown row is a grid of fixed star and count columns with a flexible
  bar between them, so only the bars get shorter on small screens.
- "Product Rating" and the logo wrap onto two lines if there isn't room.

Checked at 320px, 360px and 600px wide.

## Accessibility

- **Landmark:** the card is a `<section>` with `aria-labelledby` pointing at its
  heading, so screen readers list it as a region called "Excellent". `useId()`
  keeps the id unique if there's more than one card on a page.
- **Upper case comes from CSS:** "EXCELLENT" and "4.6 OUT OF 5" are written in
  normal case and styled with `text-transform: uppercase`. Some screen readers
  spell out text that's written in capitals.
- **Stars:** the row of tiles is one `role="img"` with the label "Rated 4.6 out
  of 5 stars". The individual tiles and SVGs are `aria-hidden`.
- **Logo:** `role="img"` with the label "Feefo". Its letters and eyes are hidden.
- **Breakdown:** a list labelled "Rating breakdown". The visible parts of each
  row (number, star, bar, count) are hidden from screen readers and replaced by
  one sentence, e.g. "5 stars: 952 reviews (77%)", with singular forms where
  they apply ("1 star: 1 review").
- **Contrast:** all text meets WCAG AA (4.5:1) against the white card. The grey
  text is `#5F6368` (6.4:1). The yellow bars don't need to meet the 3:1
  non-text contrast rule because the same information is given as text.
- **Automated check:** `jest-axe` runs axe-core over the whole card and the page
  in the tests.

## prop-types

Every component declares `propTypes`. Shared validators live in
`utils/propTypes.js`:

- `ratingPropType`: a required number from 0 to 5
- `countPropType`: a required whole number of 0 or more (works inside `PropTypes.shape`)
- `ratingCountsPropType`: an array of `{ stars: 1-5, count }`

The project uses **React 18** on purpose. React 19 no longer checks `propTypes`
on function components, so the validators would be silently ignored there.

## Testing

86 tests across 15 files, covering every component, the helpers and the
prop-type validators. Coverage is 100% of statements, branches, functions and
lines.

- **Behaviour:** tests use Testing Library queries by role and name
  (`getByRole('img', { name: 'Rated 4.6 out of 5 stars' })`), the same way
  assistive technology finds things.
- **Styles:** `jest-styled-components` checks the generated CSS, e.g. the tile
  fill percentages and bar widths.
- **Edge cases:** no reviews (0 total shows empty bars, not `NaN`), fills
  outside 0-1, unsorted data, singular text, thousands separators, and
  prop-type warnings for invalid props.
- **Accessibility:** `jest-axe` finds no violations for the card or the page.

Jest is pointed at styled-components' browser build in `jest.config.cjs`.
Otherwise Jest loads the server build, which never injects the
`createGlobalStyle` CSS.
