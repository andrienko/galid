import React from 'react';
import { Checkbox } from '@blueprintjs/core';

interface BooleanFieldProps {
  value: string;
  label: string;
  onChange: (newValue: string) => void;
}

export const BooleanField: React.FC<BooleanFieldProps> = ({ label, value, onChange }) => {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.checked ? 'true' : 'false'),
    [onChange]
  );
  return <Checkbox checked={value === 'true'} label={label} onChange={handleChange} />;
};
