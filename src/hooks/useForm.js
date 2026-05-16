import { useState, useCallback } from 'react';
import { validate } from '../utils/validations';

export const useForm = (initialValues = {}, validationSchema = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (validationSchema[name]) {
      const error = validate(value, validationSchema[name]);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [validationSchema]);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    if (validationSchema[name]) {
      const error = validate(values[name], validationSchema[name]);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [validationSchema, values]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach(key => {
      const error = validate(values[key], validationSchema[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setValues
  };
};
