import { loadFile, selectGamelistToOpen, selectGameListToSave, writeFile } from 'osSpecific';

import React from 'react';
import { buildGameList } from 'helpers/buildGameList';
import { useGameListContext } from 'context/gameList';
import { buildGameListXML } from 'helpers/buildGameListXML';
import { useUiContext } from 'context/ui';
import { useOptionsContext } from 'options/context';

interface ActionsContextState {
  openXMLFile: (fileName?: string) => Promise<void>;
  open: () => Promise<void>;
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
  const { setWindowTitle } = useUiContext();
  const { setOptions, options } = useOptionsContext();

  const openXMLFile = React.useCallback(
    async (fileName?: string) => {
      const usedFileName = fileName || (await selectGamelistToOpen());
      if (usedFileName) {
        const fileContents = await loadFile(usedFileName);
        if (fileContents) {
          setOptions({ ...options, lastOpenFile: usedFileName });
          const gameList = await buildGameList(fileContents, usedFileName);
          setWindowTitle(gameList.fileName);
          setGameList(gameList);
          setSelectedGameId(undefined);
        }
      }
    },
    [setSelectedGameId, setGameList, options, setOptions, setWindowTitle]
  );

  const open = React.useCallback(() => openXMLFile(), [openXMLFile]);

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

  const contextState = React.useMemo<ActionsContextState>(
    () => ({
      openXMLFile,
      save,
      saveAs,
      open,
    }),
    [openXMLFile, save, saveAs, open]
  );

  return <ActionsContext.Provider value={contextState}>{children}</ActionsContext.Provider>;
};
