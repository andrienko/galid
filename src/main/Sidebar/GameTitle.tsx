import React from 'react';
import { GameListEntry, KnownField } from 'common/types';
import { find } from 'lodash';

import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import 'styled-components/macro';

interface GameTitleProps {
  game: GameListEntry;
}

export const GameTitle: React.FC<GameTitleProps> = ({ game }) => {
  const title = React.useMemo(() => find(game.fields, ['name', KnownField.Name])?.value || '', [game]);

  const isFavorite: boolean = React.useMemo(
    () => game.fields.some((field) => field.name === KnownField.Favorite && field.value === 'true'),
    [game]
  );

  return (
    <>
      {isFavorite && <Icon css="vertical-align: top; margin-right: 3px;" size={14} icon={IconNames.STAR} />}
      {title}
    </>
  );
};
