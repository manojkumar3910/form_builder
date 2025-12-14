import { useState } from 'react';
import { FIELD_TYPES } from '../utils/validationSchema';
import '../styles/FieldEditor.css';

export function FieldEditor({ field, onUpdate }) {
  const [optionInput, setOptionInput] = useState('');

  const handleBasicChange = (key, value) => {
    onUpdate({ [key]: value });
  };

  const addValidator = (type) => {
    const validators = [...(field.validators || [])];
    validators.push({ type, value: '', message: '' });
    onUpdate({ validators });
  };

  const updateValidator = (index, key, value) => {
    const validators = [...field.validators];
    validators[index] = { ...validators[index], [key]: value };
    onUpdate({ validators });
  };

  const removeValidator = (index) => {
    const validators = field.validators.filter((_, i) => i !== index);
    onUpdate({ validators });
  };

  const addOption = () => {
    if (!optionInput.trim()) return;
    const options = [...(field.options || [])];
    options.push({
      id: Date.now().toString(),
      value: optionInput.trim(),
      label: optionInput.trim(),
    });
    onUpdate({ options });
    setOptionInput('');
  };

  const updateOption = (index, key, value) => {
    const options = [...field.options];
    options[index] = { ...options[index], [key]: value };
    onUpdate({ options });
  };

  const removeOption = (index) => {
    const options = field.options.filter((_, i) => i !== index);
    onUpdate({ options });
  };

  const isSelectType =
    field.type === FIELD_TYPES.SELECT ||
    field.type === FIELD_TYPES.RADIO ||
    field.type === FIELD_TYPES.CHECKBOX;

  return (
    <div className="field-editor">
      <h3>Edit Field</h3>

      <div className="editor-section">
        <label>Field Name *</label>
        <input
          type="text"
          value={field.name}
          onChange={(e) => handleBasicChange('name', e.target.value)}
          placeholder="e.g., email, first_name"
        />
        <small>Must be unique and alphanumeric</small>
      </div>

      <div className="editor-section">
        <label>Field Label</label>
        <input
          type="text"
          value={field.label}
          onChange={(e) => handleBasicChange('label', e.target.value)}
          placeholder="Display label for users"
        />
      </div>

      <div className="editor-section">
        <label>Placeholder</label>
        <input
          type="text"
          value={field.placeholder}
          onChange={(e) => handleBasicChange('placeholder', e.target.value)}
          placeholder="Hint text"
        />
      </div>

      <div className="editor-section checkbox-section">
        <input
          type="checkbox"
          id="required"
          checked={field.required}
          onChange={(e) => handleBasicChange('required', e.target.checked)}
        />
        <label htmlFor="required">Required Field</label>
      </div>

      {field.type === 'textarea' && (
        <div className="editor-section">
          <label>Rows</label>
          <input
            type="number"
            min="1"
            max="20"
            value={field.rows || 4}
            onChange={(e) => handleBasicChange('rows', parseInt(e.target.value))}
          />
        </div>
      )}

      {isSelectType && (
        <div className="editor-section">
          <label>Options</label>
          <div className="options-input">
            <input
              type="text"
              value={optionInput}
              onChange={(e) => setOptionInput(e.target.value)}
              placeholder="Enter option value"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addOption();
                }
              }}
            />
            <button onClick={addOption} className="add-option-btn">
              Add
            </button>
          </div>

          <div className="options-list">
            {field.options?.map((option, index) => (
              <div key={option.id} className="option-item">
                <input
                  type="text"
                  value={option.label}
                  onChange={(e) => updateOption(index, 'label', e.target.value)}
                  placeholder="Display label"
                />
                <input
                  type="text"
                  value={option.value}
                  onChange={(e) => updateOption(index, 'value', e.target.value)}
                  placeholder="Value"
                />
                <button
                  onClick={() => removeOption(index)}
                  className="remove-option-btn"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="editor-section">
        <label>Validators</label>
        <div className="validators-list">
          {field.validators?.map((validator, index) => (
            <div key={index} className="validator-item">
              <select
                value={validator.type}
                onChange={(e) => updateValidator(index, 'type', e.target.value)}
              >
                <option value="email">Email</option>
                <option value="minLength">Min Length</option>
                <option value="maxLength">Max Length</option>
                <option value="pattern">Pattern</option>
                <option value="min">Min Value</option>
                <option value="max">Max Value</option>
              </select>
              {(validator.type === 'minLength' ||
                validator.type === 'maxLength' ||
                validator.type === 'min' ||
                validator.type === 'max' ||
                validator.type === 'pattern') && (
                <input
                  type="text"
                  value={validator.value}
                  onChange={(e) => updateValidator(index, 'value', e.target.value)}
                  placeholder="Value"
                />
              )}
              <input
                type="text"
                value={validator.message}
                onChange={(e) => updateValidator(index, 'message', e.target.value)}
                placeholder="Error message"
              />
              <button
                onClick={() => removeValidator(index)}
                className="remove-validator-btn"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() =>
            addValidator(
              field.type === 'email'
                ? 'email'
                : 'minLength'
            )
          }
          className="add-validator-btn"
        >
          + Add Validator
        </button>
      </div>
    </div>
  );
}
