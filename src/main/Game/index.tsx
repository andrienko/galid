import React from 'react';
import classNames from 'classnames';

import styled from 'styled-components';
import 'styled-components/macro';

import { GameListEntry, GameListField } from 'common/types';

import { GameForm } from './Form';
import { GameFooter } from './Footer';

const GameWrapper = styled.div`
  background: #eee;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .fixed {
    flex: 0;
  }
  .stretching {
    overflow: auto;
    flex: 1 1 auto;
  }
`;

interface GameViewProps {
  game: GameListEntry;
  onChange: (newGame: GameListEntry) => void;
  className?: string;
}

export const Game: React.FC<GameViewProps> = ({ game, className, onChange: changeGame }) => {
  const changeField = React.useCallback(
    (newField: GameListField) => {
      const newFields = game.fields.map((field) => (field.internalId === newField.internalId ? newField : field));
      changeGame({ ...game, fields: newFields });
    },
    [changeGame, game]
  );

  return (
    <GameWrapper className={classNames(className, 'scrollbars')}>
      <div className="stretching scrollbars">
        <GameForm fields={game.fields} onChange={changeField} />
      </div>
      <div className="fixed">
        <GameFooter game={game} onChange={changeField} />
      </div>
    </GameWrapper>
  );
};

export { NoGameView } from './NoGameView';
