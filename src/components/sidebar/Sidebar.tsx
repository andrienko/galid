import React from 'react';
import { GameListEntry } from 'common/types';
import { SidebarEntry } from './SidebarEntry';
import styled from 'styled-components';
import classNames from 'classnames';

const SidebarWrapper = styled.div`
  background: #ccc;
  overflow: auto;
  box-shadow: -2px 2px -2px;
`;

interface SidebarProps {
  games?: GameListEntry[];
  selectedGameId?: string;
  onSelect: (gameId: GameListEntry) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = React.memo(({ games, selectedGameId, onSelect, className }) => {
  return (
    <SidebarWrapper className={classNames('scrollbars', className)}>
      {games
        ? games.map((game) => {
            return (
              <SidebarEntry
                key={game.internalId}
                game={game}
                isActive={selectedGameId === game.internalId}
                onClick={onSelect}
              />
            );
          })
        : 'No games :<'}
    </SidebarWrapper>
  );
});
