// Reference: https://github.com/Aloshi/EmulationStation/blob/master/GAMELISTS.md

import React from 'react';
import { GameListField, KnownField } from 'common/types';
import { knownFields } from 'common/constants';
import { useTranslation } from 'logic/translationContext';
import { StringField } from 'components/fields/StringField';
import { TextAreaField } from 'components/fields/TextAreaField';
import { DateField } from 'components/fields/DateField';
import { UnknownField } from 'components/fields/UnknownField';

interface GameFieldProps {
  field: GameListField;
  onChange: (newField: GameListField) => void;
}

const stringFields: string[] = [KnownField.Name];
const textAreaFields: string[] = [KnownField.Desc];
const dateFields: string[] = [KnownField.ReleaseDate];
const dateTimeFields: string[] = [KnownField.LastPlayed];

export const GameField: React.FC<GameFieldProps> = ({ field, onChange }) => {
  const { t } = useTranslation();

  const label = knownFields.includes(field.name as KnownField) ? t(`field:${field.name.toUpperCase()}`) : field.name;

  const handleChange = React.useCallback(
    (newValue: string) => {
      onChange({ ...field, value: newValue });
    },
    [field, onChange]
  );

  if (stringFields.includes(field.name)) {
    return <StringField value={field.value} label={label} onChange={handleChange} />;
  } else if (textAreaFields.includes(field.name)) {
    return <TextAreaField value={field.value} label={label} onChange={handleChange} />;
  } else if (dateFields.includes(field.name)) {
    return <DateField value={field.value} label={label} onChange={handleChange} />;
  } else if (dateTimeFields.includes(field.name)) {
    return <DateField value={field.value} label={label} onChange={handleChange} pickTime />;
  }

  return <UnknownField value={field.value} label={label} onChange={handleChange} />;
};
