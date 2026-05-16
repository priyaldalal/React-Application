export const validate = (value, rules) => {
  let error = '';

  if (!rules) return '';

  for (const rule of rules) {
    if (rule.required && (value === '' || value === null || value === undefined || (Array.isArray(value) && value.length === 0))) {
      error = rule.message || 'This field is required';
      break;
    }

    if (value) {
      if (rule.pattern && !rule.pattern.test(value)) {
        error = rule.message || 'Invalid format';
        break;
      }

      if (rule.minLength && value.length < rule.minLength) {
        error = rule.message || `Minimum ${rule.minLength} characters required`;
        break;
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        error = rule.message || `Maximum ${rule.maxLength} characters allowed`;
        break;
      }

      if (rule.min !== undefined && Number(value) < rule.min) {
        error = rule.message || `Value must be at least ${rule.min}`;
        break;
      }

      if (rule.max !== undefined && Number(value) > rule.max) {
        error = rule.message || `Value must be at most ${rule.max}`;
        break;
      }

      if (rule.custom && !rule.custom(value)) {
        error = rule.message || 'Validation failed';
        break;
      }
    }
  }

  return error;
};

export const commonRules = {
  required: (msg) => ({ required: true, message: msg || 'Field is required' }),
  email: (msg) => ({ 
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
    message: msg || 'Invalid email address' 
  }),
  phone: (msg) => ({ 
    pattern: /^\d{10,15}$/, 
    message: msg || 'Phone number must be between 10-15 digits' 
  }),
  minLength: (len, msg) => ({ minLength: len, message: msg || `At least ${len} characters required` }),
  maxLength: (len, msg) => ({ maxLength: len, message: msg || `No more than ${len} characters allowed` }),
};
