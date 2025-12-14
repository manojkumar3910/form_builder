// Validation schema utilities
export const FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  DATE: 'date',
  FILE: 'file',
};

export const VALIDATORS = {
  required: (value) => {
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return value !== null && value !== undefined;
  },
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  minLength: (min) => (value) => value.length >= min,
  maxLength: (max) => (value) => value.length <= max,
  pattern: (pattern) => (value) => new RegExp(pattern).test(value),
  min: (min) => (value) => Number(value) >= min,
  max: (max) => (value) => Number(value) <= max,
};

export const validateField = (value, field) => {
  const errors = [];
  
  if (field.required && !VALIDATORS.required(value)) {
    errors.push(`${field.label || field.name} is required`);
    return errors;
  }

  if (value && field.validators) {
    field.validators.forEach((validator) => {
      if (validator.type === 'email' && !VALIDATORS.email(value)) {
        errors.push(validator.message || 'Invalid email format');
      } else if (validator.type === 'minLength' && !VALIDATORS.minLength(validator.value)(value)) {
        errors.push(validator.message || `Minimum length is ${validator.value}`);
      } else if (validator.type === 'maxLength' && !VALIDATORS.maxLength(validator.value)(value)) {
        errors.push(validator.message || `Maximum length is ${validator.value}`);
      } else if (validator.type === 'pattern' && !VALIDATORS.pattern(validator.value)(value)) {
        errors.push(validator.message || 'Invalid format');
      } else if (validator.type === 'min' && !VALIDATORS.min(validator.value)(value)) {
        errors.push(validator.message || `Minimum value is ${validator.value}`);
      } else if (validator.type === 'max' && !VALIDATORS.max(validator.value)(value)) {
        errors.push(validator.message || `Maximum value is ${validator.value}`);
      }
    });
  }

  return errors;
};

export const validateForm = (formData, schema) => {
  const errors = {};
  
  schema.fields.forEach((field) => {
    const fieldErrors = validateField(formData[field.name] || '', field);
    if (fieldErrors.length > 0) {
      errors[field.name] = fieldErrors[0];
    }
  });

  return errors;
};

export const createDefaultField = (type) => {
  const fieldId = Date.now().toString();
  const baseField = {
    id: fieldId,
    type,
    name: `field_${fieldId}`,
    label: type.charAt(0).toUpperCase() + type.slice(1) + ' Field',
    required: false,
    placeholder: '',
    validators: [],
  };

  switch (type) {
    case FIELD_TYPES.SELECT:
    case FIELD_TYPES.RADIO:
    case FIELD_TYPES.CHECKBOX:
      return { ...baseField, options: [] };
    default:
      return baseField;
  }
};
