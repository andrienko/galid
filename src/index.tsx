import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'App';
import domReady from 'domready';

import { GlobalStyles } from 'common/globalStyles';
import 'common/cssprop';

import 'modern-normalize/modern-normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

import { translations } from 'common/translations';
import { TranslationContextProvider } from 'logic/translationContext';
import { GameListContextProvider } from 'logic/gameListContext';
import { ActionsContextProvider } from 'logic/actionsContext';

domReady(() => {
  const wrapper = document.createElement('div');
  document.body.appendChild(wrapper);
  ReactDOM.render(
    <React.StrictMode>
      <GlobalStyles />
      <TranslationContextProvider translations={translations}>
        <GameListContextProvider>
          <ActionsContextProvider>
            <App />
          </ActionsContextProvider>
        </GameListContextProvider>
      </TranslationContextProvider>
    </React.StrictMode>,
    wrapper
  );
});
