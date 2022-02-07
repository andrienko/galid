import React from 'react';
import 'styled-components/macro';

import { GameList, GameListEntry } from 'common/types';
import { useGameListContext } from 'context/gameList';

import { NoGameListView, Sidebar } from './Sidebar';
import { Game, NoGameView } from './Game';
import { MainMenu } from './MainMenu';
import { AboutWindow } from 'main/AboutWindow';
import { OptionsWindow } from 'options/OptionsWindow';
import { Dialogs } from 'popup/Dialogs';

export const Layout: React.FC = () => {
  const { gameList, setGameList, selectedGame, setSelectedGameId } = useGameListContext();

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
    [setGameList, gameList]
  );

  const handleGameSelect = React.useCallback(
    (game: GameListEntry) => setSelectedGameId(game.internalId),
    [setSelectedGameId]
  );

  return (
    <div css="display: flex; flex-direction: column; overflow: hidden; position:absolute; top: 0;bottom: 0;left: 0;right: 0;">
      <AboutWindow />
      <OptionsWindow />
      <Dialogs />
      <div css="flex: 0 0 auto; width: 100%;">
        <MainMenu />
      </div>
      <div css="display: flex; flex: 1 1 0; overflow: hidden;">
        {gameList ? (
          <Sidebar
            games={gameList.games}
            css="flex: 0 0 250px;"
            selectedGameId={selectedGame?.internalId}
            onSelect={handleGameSelect}
          />
        ) : (
          <NoGameListView css="flex: 0 0 250px;" />
        )}
        {selectedGame ? (
          <Game css="flex: 1 1 0;" game={selectedGame} key={selectedGame?.internalId} onChange={handleGameChange} />
        ) : (
          <NoGameView />
        )}
      </div>
    </div>
  );
};
