import React, { useState } from 'react';
import { GameListField, KnownField } from 'common/types';
import { Slider, ProgressBar, Intent, Label } from '@blueprintjs/core';
import { Popover2 as Popover, Classes } from '@blueprintjs/popover2';
import 'styled-components/macro';
import { useTranslation } from 'translation';

interface RatingFieldProps {
  field: GameListField;
  onChange: (newField: GameListField) => void;
}

export const Rating: React.FC<RatingFieldProps> = ({ field, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleIsOpen = React.useCallback(() => setIsOpen((s) => !s), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const { t } = useTranslation();

  const rating = React.useMemo<number>(() => parseFloat(field.value), [field]);
  const intent = React.useMemo<Intent>(() => {
    if (rating <= 0.25) {
      return Intent.DANGER;
    }
    if (rating <= 0.5) {
      return Intent.WARNING;
    }
    if (rating >= 0.8) {
      return Intent.SUCCESS;
    }
    return Intent.PRIMARY;
  }, [rating]);

  const handleChange = React.useCallback(
    (value: number) => onChange({ ...field, value: value.toFixed(4) }),
    [onChange, field]
  );

  return (
    <Popover
      isOpen={isOpen}
      popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
      onClose={close}
      autoFocus
      lazy={false}
      content={
        <Label>
          {t(`field:${KnownField.Rating.toUpperCase()}`)}
          <Slider min={0} max={1} value={rating} stepSize={0.05} onChange={handleChange} />
        </Label>
      }
    >
      <div onClick={toggleIsOpen} css="margin-left: 6px; width: 64px; &:hover{ opacity: 0.9;} &:active {opacity: 1}">
        <ProgressBar value={rating} animate={false} intent={intent} />
      </div>
    </Popover>
  );
};
