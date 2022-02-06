import React from 'react';
import { GameListEntry, GameListField } from 'types';
import classNames from 'classnames';

import styled from 'styled-components';
import { GameFields } from './GameFields';
import { useTranslation } from 'logic/translationContext';
import { useGameListContext } from 'logic/gameListContext';

const GameWrapper = styled.div`
  background: #eee;
  overflow: auto;
`;

interface GameViewProps {
  game?: GameListEntry;
  onChange: (newGame: GameListEntry) => void;
  className?: string;
}

export const GameView: React.FC<GameViewProps> = ({ game, className, onChange }) => {
  const { t } = useTranslation();
  const { selectedGame } = useGameListContext();
  const handleFieldsChange = React.useCallback(
    (newFields: GameListField[]) => {
      if (!game) {
        throw new Error('Game is empty in handleFieldsChange');
      }
      const newGame = { ...game, fields: newFields };
      onChange(newGame);
    },
    [game, onChange]
  );
  return (
    <GameWrapper className={classNames(className, 'scrollbars')}>
      {game ? <GameFields fields={game.fields} onChange={handleFieldsChange} /> : t('message:GAME_NOT_SELECTED')}
    </GameWrapper>
  );
};
