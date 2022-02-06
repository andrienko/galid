import { loadFile, selectGamelistToOpen, selectGameListToSave, writeFile } from 'osSpecific';

import React from 'react';
import { parseGameList } from 'gamelist/parseGameList';
import { useGameListContext } from 'logic/gameListContext';
import { buildGameListXML } from 'gamelist/buildGameListXML';

interface ActionsContextState {
  openXMLFile: () => Promise<void>;
  showHelp: () => Promise<void>;
  save: () => Promise<void>;
  saveAs: () => Promise<void>;
}

export const ActionsContext = React.createContext<ActionsContextState | null>(null);

export const useActionsContext = (): ActionsContextState => {
  const contextValue = React.useContext(ActionsContext);
  if (!contextValue) {
    throw new Error('useGameListContext is used outside GameListContextProvider');
  }
  return contextValue;
};

export const ActionsContextProvider: React.FC = ({ children }) => {
  const { setGameList, setSelectedGameId, gameList } = useGameListContext();

  const openXMLFile = React.useCallback(async () => {
    const fileName = await selectGamelistToOpen();
    if (fileName) {
      const fileContents = await loadFile(fileName);
      if (fileContents) {
        const gameList = parseGameList(fileContents);
        setGameList(gameList);
        setSelectedGameId(undefined);
      }
    }
  }, [setSelectedGameId, setGameList]);

  const saveAs = React.useCallback(async () => {
    if (!gameList) {
      throw new Error('GameList is empty');
    }
    const fileName = await selectGameListToSave();
    if (fileName) {
      const xmlContents = buildGameListXML(gameList);
      writeFile(fileName, xmlContents);
    }
  }, [gameList]);
  const save = React.useCallback(async () => {}, []);

  const showHelp = React.useCallback(async () => {
    window.alert('GaLiD is a Game List Editor');
  }, []);

  const contextState = React.useMemo<ActionsContextState>(
    () => ({
      openXMLFile,
      showHelp,
      save,
      saveAs,
    }),
    [openXMLFile, showHelp, save, saveAs]
  );

  return <ActionsContext.Provider value={contextState}>{children}</ActionsContext.Provider>;
};
