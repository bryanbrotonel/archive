import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  :root {

    // font family
    --font-primary: 'PT Serif', serif;
    --font-secondary: 'Roboto', sans-serif;

    // font size
    --text-base-size: 1em; // body font-size
    --text-scale-ratio: 1.2; // multiplier used to generate the type scale values 👇
    
    // line-height
    --body-line-height: 1.4;
    --heading-line-height: 1.2;
    
    // capital letters - used in combo with the lhCrop mixin
    --font-primary-capital-letter: 1;
    --font-secondary-capital-letter: 1;

    // unit - don't modify unless you want to change the typography unit (e.g., from Rem to Em units)
    --text-unit: 1em; // if Em units → --text-unit: 1em;

    // gutters
      --bs-gutter-x: 1.5rem;
      --bs-gutter-y: 0;

    // Colours
    --colour-primary: #0B6E4F;
    --colour-secondary: #0f956a;
    --colour-tertiary: #074a35;
    --colour-light: #95d5b2;

    --colour-white: #FFFFFF;
    --colour-black: #1D1A05;
    --colour-darkGrey: #6b7280;
    --colour-lightGrey: #f9fafb;
  }

  @media (min-width: 992px) {
    :root {
      --text-base-size: 1.25em;
      --text-scale-ratio: 1.3;
    }
  }

  :root, * {
  // type scale
  --text-xs: calc((var(--text-unit) / var(--text-scale-ratio)) / var(--text-scale-ratio));
  --text-sm: calc(var(--text-xs) * var(--text-scale-ratio));
  --text-md: calc(var(--text-sm) * var(--text-scale-ratio) * var(--text-scale-ratio));
  --text-lg: calc(var(--text-md) * var(--text-scale-ratio));
  --text-xl: calc(var(--text-lg) * var(--text-scale-ratio));
  --text-xxl: calc(var(--text-xl) * var(--text-scale-ratio));
  --text-xxxl: calc(var(--text-xxl) * var(--text-scale-ratio));
  --text-xxxxl: calc(var(--text-xxxl) * var(--text-scale-ratio));
}

  html,
  body,
  #app {
    height: 100%;
  }
  
  body {
    font-family: var(--font-secondary);
    color: var(--colour-black);
    line-height: var(--body-line-height);
    margin: 0;
  }

  p {
    font-size: var(--text-base-size);
  }

  // Header sizes and styling
  h1,
  h2,
  h3,
  h4 {
    font-family: var(--font-primary);
    --heading-font-weight: 700;
  }

  ::-moz-selection { /* Code for Firefox */
    background: var(--colour-light);
  }

  ::selection {
    background: var(--colour-light);
  }

  // font family
  .font-primary {
    font-family: var(--font-primary);
  }

  .font-secondary {
    font-family: var(--font-secondary);
  }

  .font-xxxl {
    font-size: var(--text-xxxl);
  }

  .font-xxxxl {
    font-size: var(--text-xxxxl);
  }

  //Bootstrap container
  .container,
  .container-fluid,
  .container-xxl,
  .container-xl,
  .container-lg,
  .container-md,
  .container-sm {
    padding-right: var(--bs-gutter-x, 0.75rem);
    padding-left: var(--bs-gutter-x, 0.75rem);
    margin-right: auto;
    margin-left: auto;
  }
  
  @media (min-width: 576px) {
    .container-sm, .container {
      width: 100%;
      max-width: 540px;
    }
  }
  @media (min-width: 768px) {
    .container-md, .container-sm, .container {
      max-width: 720px;
    }
  }
  @media (min-width: 992px) {
    .container-lg, .container-md, .container-sm, .container {
      max-width: 960px;
    }
  }
  @media (min-width: 1200px) {
    .container-xl, .container-lg, .container-md, .container-sm, .container {
      max-width: 1140px;
    }
  }
  @media (min-width: 1400px) {
    .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container {
      max-width: 1320px;
    }
  }

  /* TRANSITIONS */
  @keyframes rotateCenter {
    0% {
      -webkit-transform: rotate(0);
              transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
    }
  }

  @keyframes fadeInUp {
    0% {
      -webkit-transform: translateY(20px);
              transform: translateY(20px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
      opacity: 1;
    }
  }
  
`;

export default GlobalStyle;
