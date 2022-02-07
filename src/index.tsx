import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'main/Layout';
import domReady from 'domready';

import { GlobalStyles } from 'common/globalStyles';
import 'common/cssprop';

import 'modern-normalize/modern-normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

import { translations, TranslationContextProvider } from 'translation';
import { GameListContextProvider } from 'context/gameList';
import { ActionsContextProvider } from 'context/actions';
import { UiContextProvider } from 'context/ui';
import { OptionsContextProvider } from 'options/context';

import { AppInitializer } from 'main';
import { PopupContextProvider } from 'popup/popupContext';

domReady(() => {
  const wrapper = document.createElement('div');
  document.body.appendChild(wrapper);

  ReactDOM.render(
    <React.StrictMode>
      <GlobalStyles />
      <TranslationContextProvider translations={translations}>
        <PopupContextProvider>
          <OptionsContextProvider>
            <UiContextProvider>
              <GameListContextProvider>
                <ActionsContextProvider>
                  <AppInitializer />
                </ActionsContextProvider>
              </GameListContextProvider>
            </UiContextProvider>
          </OptionsContextProvider>
        </PopupContextProvider>
      </TranslationContextProvider>
    </React.StrictMode>,
    wrapper
  );
});
