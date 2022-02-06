import React from 'react';
import { GameListEntry } from 'common/types';
import { find } from 'lodash';

interface GameTitleProps {
  game: GameListEntry;
}

export const GameTitle: React.FC<GameTitleProps> = ({ game }) => {
  const title = React.useMemo(() => find(game.fields, ['name', 'name'])?.value || '', [game]);
  return <>{title}</>;
};
