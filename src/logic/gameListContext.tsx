import React from 'react';
import { GameList, GameListEntry } from 'types';

interface GameListContextState {
  gameList: GameList | undefined;
  setGameList: React.Dispatch<React.SetStateAction<GameList | undefined>>;
  selectedGameId: string | undefined;
  selectedGame: GameListEntry | undefined;
  setSelectedGameId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const GameListContext = React.createContext<GameListContextState | null>(null);

export const useGameListContext = (): GameListContextState => {
  const contextValue = React.useContext(GameListContext);
  if (!contextValue) {
    throw new Error('useGameListContext is used outside GameListContextProvider');
  }
  return contextValue;
};

export const GameListContextProvider: React.FC = ({ children }) => {
  const [gameList, setGameList] = React.useState<GameList | undefined>(undefined);
  const [selectedGameId, setSelectedGameId] = React.useState<string | undefined>(undefined);
  const selectedGame = React.useMemo(
    () => gameList?.games.find((game) => game.internalId === selectedGameId),
    [gameList, selectedGameId]
  );

  const contextState = React.useMemo<GameListContextState>(
    () => ({
      gameList,
      setGameList,
      selectedGame,
      selectedGameId,
      setSelectedGameId,
    }),
    [gameList, selectedGameId, setSelectedGameId, selectedGame]
  );

  return <GameListContext.Provider value={contextState}>{children}</GameListContext.Provider>;
};
