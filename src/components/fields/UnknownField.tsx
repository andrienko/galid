import React from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

interface UnknownFieldProps {
  value: string;
  label: string;
  onChange: (newValue: string) => void;
}

export const UnknownField: React.FC<UnknownFieldProps> = ({ label, value, onChange }) => {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value),
    [onChange]
  );
  return (
    <FormGroup label={label}>
      <InputGroup type="text" value={value} onChange={handleChange} />
    </FormGroup>
  );
};
