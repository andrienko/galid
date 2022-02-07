// Reference: https://github.com/Aloshi/EmulationStation/blob/master/GAMELISTS.md

import React from 'react';
import { GameListField, KnownField } from 'common/types';
import { knownFields } from 'common/constants';

import { useTranslation } from 'translation';
import { StringField } from 'main/Game/Form/Field/StringField';
import { TextAreaField } from 'main/Game/Form/Field/TextAreaField';
import { DateField } from 'main/Game/Form/Field/DateField';
import { BooleanField } from 'main/Game/Form/Field/BooleanField';
import { UnknownField } from 'main/Game/Form/Field/UnknownField';

interface GameFieldProps {
  field: GameListField;
  onChange: (newField: GameListField) => void;
}

const textAreaFields: string[] = [KnownField.Desc];
const dateFields: string[] = [KnownField.ReleaseDate];
const dateTimeFields: string[] = [KnownField.LastPlayed];
const booleanFields: string[] = [KnownField.Favorite];

export const Field: React.FC<GameFieldProps> = ({ field, onChange }) => {
  const { t } = useTranslation();

  const isKnownField = knownFields.includes(field.name as KnownField);
  const label = isKnownField ? t(`field:${field.name.toUpperCase()}`) : field.name;

  const handleChange = React.useCallback(
    (newValue: string) => {
      onChange({ ...field, value: newValue });
    },
    [field, onChange]
  );

  if (textAreaFields.includes(field.name)) {
    return <TextAreaField value={field.value} label={label} onChange={handleChange} />;
  } else if (dateFields.includes(field.name)) {
    return <DateField value={field.value} label={label} onChange={handleChange} />;
  } else if (dateTimeFields.includes(field.name)) {
    return <DateField value={field.value} label={label} onChange={handleChange} pickTime />;
  } else if (booleanFields.includes(field.name)) {
    return <BooleanField value={field.value} label={label} onChange={handleChange} />;
  } else if (isKnownField) {
    return <StringField value={field.value} label={label} onChange={handleChange} />;
  }
  return <UnknownField value={field.value} label={label} onChange={handleChange} />;
};
