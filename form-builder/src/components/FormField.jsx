import { FIELD_TYPES } from '../utils/validationSchema';
import '../styles/FormField.css';

export function FormField({ field, value, onChange, error, isPreview = false }) {
  const handleChange = (e) => {
    let newValue;
    if (e.target.type === 'checkbox') {
      newValue = e.target.checked;
    } else {
      newValue = e.target.value;
    }
    onChange(field.name, newValue);
  };

  const handleRadioChange = (e) => {
    onChange(field.name, e.target.value);
  };

  const commonProps = {
    id: field.id,
    name: field.name,
    className: `form-input ${error ? 'error' : ''}`,
    placeholder: field.placeholder,
  };

  const labelElement = field.label && (
    <label htmlFor={field.id} className="form-label">
      {field.label}
      {field.required && <span className="required-asterisk">*</span>}
    </label>
  );

  const renderField = () => {
    switch (field.type) {
      case FIELD_TYPES.TEXT:
      case FIELD_TYPES.EMAIL:
      case FIELD_TYPES.PASSWORD:
      case FIELD_TYPES.NUMBER:
      case FIELD_TYPES.DATE:
        return (
          <input
            {...commonProps}
            type={field.type}
            value={value || ''}
            onChange={handleChange}
          />
        );

      case FIELD_TYPES.TEXTAREA:
        return (
          <textarea
            {...commonProps}
            value={value || ''}
            onChange={handleChange}
            rows={field.rows || 4}
          />
        );

      case FIELD_TYPES.SELECT:
        return (
          <select
            {...commonProps}
            value={value || ''}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            {field.options?.map((option) => (
              <option key={option.id || option.value} value={option.value}>
                {option.label || option.value}
              </option>
            ))}
          </select>
        );

      case FIELD_TYPES.CHECKBOX:
        // For group of checkboxes with options
        if (field.options && field.options.length > 0) {
          return (
            <div className="checkbox-container">
              {field.options.map((option) => (
                <div key={option.id || option.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    id={`${field.id}-${option.value}`}
                    name={field.name}
                    value={option.value}
                    checked={(value && value.includes(option.value)) || false}
                    onChange={(e) => {
                      const newValue = value || [];
                      if (e.target.checked) {
                        onChange(field.name, [...newValue, option.value]);
                      } else {
                        onChange(field.name, newValue.filter(v => v !== option.value));
                      }
                    }}
                  />
                  <label htmlFor={`${field.id}-${option.value}`}>
                    {option.label || option.value}
                  </label>
                </div>
              ))}
            </div>
          );
        }
        // Single checkbox
        return (
          <div className="checkbox-container">
            <input
              {...commonProps}
              type="checkbox"
              checked={value || false}
              onChange={handleChange}
            />
            {field.label && <label htmlFor={field.id}>{field.label}</label>}
          </div>
        );

      case FIELD_TYPES.RADIO:
        return (
          <div className="radio-container">
            {field.options?.map((option) => (
              <div key={option.id || option.value} className="radio-option">
                <input
                  type="radio"
                  id={`${field.id}-${option.value}`}
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleRadioChange}
                />
                <label htmlFor={`${field.id}-${option.value}`}>
                  {option.label || option.value}
                </label>
              </div>
            ))}
          </div>
        );

      case FIELD_TYPES.FILE:
        return (
          <input
            {...commonProps}
            type="file"
            onChange={(e) => onChange(field.name, e.target.files[0])}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="form-field-wrapper">
      {field.type !== FIELD_TYPES.CHECKBOX && field.type !== FIELD_TYPES.RADIO && labelElement}
      {renderField()}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
