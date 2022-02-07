import React from 'react';
import { Alignment, Button, Navbar } from '@blueprintjs/core';

import { GameListEntry, GameListField, KnownField } from 'common/types';
import { useGameField } from 'hooks/useGameField';

import { PlayerCount } from './PlayerCount';
import { Rating } from './Rating';
import { FavoriteButton } from './FavoriteButton';
import { IconNames } from '@blueprintjs/icons';
import { useGameListContext } from 'context/gameList';
import { useConfirmation } from 'popup/useConfirmation';
import { useTranslation } from 'translation';

type GameFooterProps = {
  game: GameListEntry;
  onChange: (newField: GameListField) => void;
};

export const GameFooter: React.FC<GameFooterProps> = ({ game, onChange }) => {
  const favoriteField = useGameField(game, KnownField.Favorite);
  const playersField = useGameField(game, KnownField.Players);
  const ratingField = useGameField(game, KnownField.Rating);

  const { t } = useTranslation();

  const confirm = useConfirmation();
  const { deleteGameById } = useGameListContext();

  const deleteTheGame = React.useCallback(async () => {
    if (await confirm(t('message:DELETE_GAME'), t('message:DELETE_GAME_CONFIRMATION'))) {
      deleteGameById(game.internalId);
    }
  }, [confirm, game.internalId, deleteGameById]);

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        {playersField && <PlayerCount field={playersField} onChange={onChange} />}
        {ratingField && <Rating field={ratingField} onChange={onChange} />}
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        {favoriteField && <FavoriteButton field={favoriteField} onChange={onChange} />}
        <Button icon={IconNames.Delete} onClick={deleteTheGame} />
      </Navbar.Group>
    </Navbar>
  );
};
