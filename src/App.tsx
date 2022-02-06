import React from 'react';

import { parseGameList } from 'gamelist/parseGameList';
import { exampleGameList } from 'gamelist/example';

import { Sidebar } from 'components/sidebar/Sidebar';
import { GameView } from 'components/GameView';

import 'styled-components/macro';
import { useGameListContext } from 'logic/gameListContext';
import { MainMenu } from 'components/MainMenu';
import { setWindowTitle } from 'osSpecific/tauri';
import { GameList, GameListEntry } from 'common/types';

export const App: React.FC = () => {
  const { gameList, setGameList, selectedGame, setSelectedGameId } = useGameListContext();

  const openFile = React.useCallback(async () => {
    const gameList = parseGameList(exampleGameList);
    setGameList(gameList);
  }, [setGameList]);

  React.useEffect(() => {
    openFile();
  }, [openFile]);

  setWindowTitle(`Galid - dev`);

  const handleGameChange = React.useCallback(
    (newGame: GameListEntry) => {
      if (!gameList) {
        throw new Error('gameList is empty in handleGameChange');
      }
      const newGameList: GameList = {
        ...gameList,
        games: gameList.games.map((game) => (game.internalId === newGame.internalId ? newGame : game)),
      };
      setGameList(newGameList);
    },
    [setGameList, selectedGame, gameList]
  );

  const handleGameSelect = React.useCallback(
    (game: GameListEntry) => setSelectedGameId(game.internalId),
    [setSelectedGameId]
  );

  return (
    <div css="display: flex; flex-direction: column; overflow: hidden; position:absolute; top: 0;bottom: 0;left: 0;right: 0;">
      <div css="flex: 0 0 auto; width: 100%;">
        <MainMenu />
      </div>
      <div css="display: flex; flex: 1 1 0; overflow: hidden;">
        <Sidebar
          games={gameList?.games}
          css="flex: 0 0 250px;"
          selectedGameId={selectedGame?.internalId}
          onSelect={handleGameSelect}
        />
        <GameView css="flex: 1 1 0;" game={selectedGame} key={selectedGame?.internalId} onChange={handleGameChange} />
      </div>
    </div>
  );
};
