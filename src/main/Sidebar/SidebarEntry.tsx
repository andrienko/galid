import React from 'react';
import { GameListEntry } from 'common/types';
import styled from 'styled-components';
import classNames from 'classnames';
import { GameTitle } from 'main/Sidebar/GameTitle';

interface SidebarEntryProps {
  className?: string;
  game: GameListEntry;
  isActive?: boolean;
  onClick: (game: GameListEntry) => void;
}

const SidebarEntryWrapper = styled.div`
  padding: 5px 10px;
  &:hover,
  &.active {
    background: #0002;
  }
  &.active {
    color: #000;
  }
`;

export const SidebarEntry: React.FC<SidebarEntryProps> = React.memo(({ game, onClick, className, isActive }) => {
  const handleClick = React.useCallback(() => onClick(game), [onClick, game]);
  return (
    <SidebarEntryWrapper className={classNames(isActive ? 'active' : 'inactive', className)} onClick={handleClick}>
      <GameTitle game={game} />
    </SidebarEntryWrapper>
  );
});
