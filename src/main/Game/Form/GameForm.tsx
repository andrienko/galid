import React from 'react';
import { GameListField, KnownField } from 'common/types';
import { Field } from 'main/Game/Form/Field';
import styled from 'styled-components';

const GameFormWrapper = styled.div`
  padding: 20px;
`;

interface GameFieldsProps {
  fields: GameListField[];
  onChange: (newField: GameListField) => void;
}

// Fields, for which we display control manually (without enumeration)
const controlledFields: KnownField[] = [KnownField.Favorite, KnownField.Players, KnownField.Rating];

export const GameForm: React.FC<GameFieldsProps> = ({ fields, onChange }) => {
  const renderedFields = React.useMemo(
    () => fields.filter((field) => !controlledFields.includes(field.name as KnownField)),
    [fields]
  );
  return (
    <GameFormWrapper>
      {renderedFields.map((field) => {
        return <Field key={field.internalId} field={field} onChange={onChange} />;
      })}
    </GameFormWrapper>
  );
};
