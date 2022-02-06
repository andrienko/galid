import React from 'react';
import { FormGroup } from '@blueprintjs/core';
import { DateInput, TimePrecision } from '@blueprintjs/datetime';
import { parse, format } from 'date-fns';

const esDateFormat = `yyyyMMdd'T'000000`;
const esDateTimeFormat = `yyyyMMdd'T'HHmmss`;

const displayDateFormat = `dd.MM.yyyy`;
const displayDateTimeFormat = `dd.MM.yyyy HH:mm:ss`;

const parseTheDate = (date: string, pickTime: boolean): Date =>
  parse(date, pickTime ? esDateTimeFormat : esDateFormat, new Date());

const formatTheDate = (date: Date, pickTime: boolean): string => {
  return format(date, pickTime ? esDateTimeFormat : esDateFormat);
};

interface DateFieldProps {
  value: string;
  label: string;
  pickTime?: boolean;
  onChange: (newValue: string) => void;
}

const minDate = new Date(1940, 0, 0);
const maxDate = new Date();

export const DateField: React.FC<DateFieldProps> = ({ label, value, onChange, pickTime = false }) => {
  const dateValue = React.useMemo(() => parseTheDate(value, pickTime), [value, pickTime]);

  const handleChange = React.useCallback(
    (newDate: Date) => onChange(formatTheDate(newDate, pickTime)),
    [onChange, pickTime]
  );

  const formatDisplayedDate = React.useCallback(
    (date: Date) => format(date, pickTime ? displayDateTimeFormat : displayDateFormat),
    [pickTime]
  );

  const parseDisplayedDate = React.useCallback(
    (date: string): Date => parse(date, pickTime ? displayDateTimeFormat : displayDateFormat, new Date()),
    [pickTime]
  );

  return (
    <FormGroup label={label}>
      <DateInput
        minDate={minDate}
        maxDate={maxDate}
        fill
        value={dateValue}
        canClearSelection={false}
        timePrecision={pickTime ? TimePrecision.SECOND : undefined}
        onChange={handleChange}
        formatDate={formatDisplayedDate}
        parseDate={parseDisplayedDate}
      />
    </FormGroup>
  );
};
