import { css, Global } from '@emotion/react';

export const globalStyles = (
  <Global
    styles={css`
      html,
      body,
      p,
      ol,
      ul,
      li,
      dl,
      dt,
      dd,
      blockquote,
      figure,
      fieldset,
      legend,
      textarea,
      pre,
      iframe,
      hr,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0;
        padding: 0;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: 100%;
        font-weight: normal;
      }

      ul {
        list-style: none;
      }

      button,
      input,
      select {
        margin: 0;
      }

      html {
        max-width: 992px;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 2rem;
      }

      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      img,
      video {
        height: auto;
        max-width: 100%;
      }

      iframe {
        border: 0;
      }

      table {
        border-collapse: collapse;
        border-spacing: 0;
      }

      td,
      th {
        padding: 0;
      }

      a {
        color: inherit;
        text-decoration: none;
      }
    `}
  />
);