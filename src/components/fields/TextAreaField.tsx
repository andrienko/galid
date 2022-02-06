import React from 'react';
import { FormGroup, TextArea } from '@blueprintjs/core';
import 'styled-components/macro';

interface TextAreaFieldProps {
  value: string;
  label: string;
  onChange: (newValue: string) => void;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, value, onChange }) => {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.currentTarget.value),
    [onChange]
  );
  return (
    <FormGroup label={label}>
      <TextArea css="resize: vertical;" rows={10} fill value={value} onChange={handleChange} />
    </FormGroup>
  );
};
