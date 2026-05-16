import React from 'react';
import FormWrapper from './FormWrapper';

export const TextBox = ({ label, error, helperText, required, ...props }) => {
  return (
    <FormWrapper label={label} error={error} helperText={helperText} required={required}>
      <input
        className={`input-field ${error ? 'border-rose-400 focus:ring-rose-500/10' : ''}`}
        {...props}
      />
    </FormWrapper>
  );
};

export default TextBox;
