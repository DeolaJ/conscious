import { Global, css } from '@emotion/react';

const GlobalStyle = () => (
  <Global
    styles={css`
      html {
        font-size: 18px;
      }

      body {
        margin: 0;
        padding: 0;
        font-family: 'Source Sans Pro', Helvetica, Sans-Serif;

        * {
          letter-spacing: 0.02rem;
        }
      }

      main {
        background-position: 110% 0%;
        background-size: auto;
        background-repeat: no-repeat;
      }
    `}
  />
);

export default GlobalStyle;
