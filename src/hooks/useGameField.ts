import { GameListEntry, KnownField } from 'common/types';
import React from 'react';

export const useGameField = (game: GameListEntry, fieldName: string | KnownField) =>
  React.useMemo(() => game.fields.find((field) => field.name === fieldName), [game, fieldName]);
