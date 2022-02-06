import React from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

interface StringFieldProps {
  value: string;
  label: string;
  onChange: (newValue: string) => void;
}

export const StringField: React.FC<StringFieldProps> = ({ label, value, onChange }) => {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value),
    [onChange]
  );
  return (
    <FormGroup label={label}>
      <InputGroup value={value} onChange={handleChange} />
    </FormGroup>
  );
};
