import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    color: #222;
    font: normal 14px sans-serif;
  }

  .bp3-navbar.thin{
    padding: 0 5px;
    &, .bp3-navbar-group{
      height: 32px;
    }
  }

  .scrollbars::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: #bbb;
  }
  .scrollbars::-webkit-scrollbar-thumb {
    background: #888;
  }

  .bp3-navbar.mainMenu{
    box-shadow: 0 2px 2px -2px;
  }
`;
