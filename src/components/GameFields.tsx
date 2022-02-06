import React from 'react';
import { GameListField } from 'types';
import { GameField } from './fields';
import styled from 'styled-components';

const GameFieldsWrapper = styled.div`
  padding: 20px;
`;

interface GameFieldsProps {
  fields: GameListField[];
  onChange: (newFields: GameListField[]) => void;
}

export const GameFields: React.FC<GameFieldsProps> = ({ fields, onChange }) => {
  const changeField = React.useCallback(
    (newField) => onChange(fields.map((field) => (field.internalId === newField.internalId ? newField : field))),
    [onChange, fields]
  );
  return (
    <GameFieldsWrapper>
      {fields.map((field) => {
        return <GameField key={field.internalId} field={field} onChange={changeField} />;
      })}
    </GameFieldsWrapper>
  );
};
