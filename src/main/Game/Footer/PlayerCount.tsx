import React, { useState } from 'react';
import { GameListField, KnownField } from 'common/types';
import { Tag, RangeSlider, NumberRange, Label } from '@blueprintjs/core';
import { Popover2 as Popover, Classes } from '@blueprintjs/popover2';
import { IconNames } from '@blueprintjs/icons';
import { useTranslation } from 'translation';

interface PlayerCountSelectorProps {
  field: GameListField;
  onChange: (newField: GameListField) => void;
}

const rangeToString = (range: NumberRange): string => {
  const from = range[0];
  const to = range[1];
  if (from === to) {
    return `${from}`;
  }
  return `${from}-${to}`;
};

const stringToRange = (value: string): NumberRange => {
  const rangeStrings = value.split('-');
  if (rangeStrings.length > 1) {
    const from = parseInt(rangeStrings[0], 10);
    const to = parseInt(rangeStrings[1], 10);
    return [from, to];
  }
  const int = parseInt(value, 10);
  return [int, int];
};

export const PlayerCount: React.FC<PlayerCountSelectorProps> = ({ field, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const range = React.useMemo<NumberRange>(() => stringToRange(field.value), [field]);

  const handleChange = React.useCallback(
    (newRange: NumberRange) => onChange({ ...field, value: rangeToString(newRange) }),
    [onChange, field]
  );

  const toggleIsOpen = React.useCallback(() => setIsOpen((s) => !s), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  return (
    <Popover
      isOpen={isOpen}
      popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
      onClose={close}
      autoFocus
      lazy={false}
      content={
        <Label>
          {t(`field:${KnownField.Players.toUpperCase()}`)}
          <RangeSlider min={1} max={8} value={range} onChange={handleChange} />
        </Label>
      }
    >
      <Tag icon={IconNames.USER} minimal large interactive onClick={toggleIsOpen}>
        {field.value}
      </Tag>
    </Popover>
  );
};
