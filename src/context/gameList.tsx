import React from 'react';
import { GameList, GameListEntry } from 'common/types';

interface GameListContextState {
  gameList: GameList | undefined;
  setGameList: React.Dispatch<React.SetStateAction<GameList | undefined>>;
  selectedGameId: string | undefined;
  selectedGame: GameListEntry | undefined;
  setSelectedGameId: React.Dispatch<React.SetStateAction<string | undefined>>;
  deleteGameById: (id: string) => void;
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

  const deleteGameById = React.useCallback(
    (id: string) =>
      setGameList((gameList) => {
        if (gameList) {
          return { ...gameList, games: gameList.games.filter((game) => game.internalId !== id) };
        }
        return gameList;
      }),
    []
  );

  const contextState = React.useMemo<GameListContextState>(
    () => ({
      gameList,
      setGameList,
      selectedGame,
      selectedGameId,
      setSelectedGameId,
      deleteGameById,
    }),
    [gameList, selectedGameId, setSelectedGameId, selectedGame, deleteGameById]
  );

  return <GameListContext.Provider value={contextState}>{children}</GameListContext.Provider>;
};
