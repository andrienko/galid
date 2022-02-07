import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    color: #222;
    font: normal 14px sans-serif;
  }

  .scrollbars::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: #bbb;
  }
  .scrollbars::-webkit-scrollbar-thumb {
    background: #888;
  }
`;
