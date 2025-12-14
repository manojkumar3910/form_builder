import { useState } from 'react';
import { FormField } from './FormField';
import { validateForm } from '../utils/validationSchema';
import '../styles/FormPreview.css';

export function FormPreview({ schema }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    // Clear error for this field on change
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData, schema);

    if (Object.keys(formErrors).length === 0) {
      setSubmitted(true);
      console.log('Form submitted:', formData);
      // Reset after 2 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({});
      }, 2000);
    } else {
      setErrors(formErrors);
    }
  };

  const handleReset = () => {
    setFormData({});
    setErrors({});
    setSubmitted(false);
  };

  if (schema.fields.length === 0) {
    return (
      <div className="form-preview">
        <div className="empty-preview">
          <p>No fields to preview. Add fields in the builder to see a preview here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-preview">
      <form onSubmit={handleSubmit} className="preview-form">
        {schema.title && <h2>{schema.title}</h2>}
        {schema.description && <p className="form-description">{schema.description}</p>}

        {submitted && (
          <div className="success-message">
            ✓ Form submitted successfully!
          </div>
        )}

        <div className="form-fields">
          {schema.fields.map((field) => (
            <FormField
              key={field.id}
              field={field}
              value={formData[field.name]}
              onChange={handleFieldChange}
              error={errors[field.name]}
              isPreview={true}
            />
          ))}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button type="button" onClick={handleReset} className="reset-btn">
            Clear
          </button>
        </div>
      </form>

      <div className="form-data-display">
        <h4>Form Data (JSON)</h4>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}
