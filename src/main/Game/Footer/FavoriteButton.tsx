import React from 'react';
import { GameListField } from 'common/types';
import { Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

interface FavoriteButtonProps {
  field: GameListField;
  onChange: (newField: GameListField) => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ field, onChange }) => {
  const toggleFavorite = React.useCallback(
    () => onChange({ ...field, value: field.value === 'true' ? 'false' : 'true' }),
    [field, onChange]
  );
  return <Button icon={field.value === 'true' ? IconNames.STAR : IconNames.STAR_EMPTY} onClick={toggleFavorite} />;
};
