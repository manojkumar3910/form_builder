import { useState } from 'react';
import { FIELD_TYPES, createDefaultField } from '../utils/validationSchema';
import { FieldEditor } from './FieldEditor';
import '../styles/FormBuilder.css';

export function FormBuilder({ schema, onSchemaChange }) {
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  const addField = (type) => {
    const newField = createDefaultField(type);
    const updatedFields = [...schema.fields, newField];
    onSchemaChange({ ...schema, fields: updatedFields });
  };

  const updateField = (fieldId, updates) => {
    const updatedFields = schema.fields.map((field) =>
      field.id === fieldId ? { ...field, ...updates } : field
    );
    onSchemaChange({ ...schema, fields: updatedFields });
  };

  const deleteField = (fieldId) => {
    const updatedFields = schema.fields.filter((field) => field.id !== fieldId);
    onSchemaChange({ ...schema, fields: updatedFields });
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }
  };

  const moveField = (fieldId, direction) => {
    const index = schema.fields.findIndex((f) => f.id === fieldId);
    if (direction === 'up' && index > 0) {
      const updatedFields = [...schema.fields];
      [updatedFields[index], updatedFields[index - 1]] = [
        updatedFields[index - 1],
        updatedFields[index],
      ];
      onSchemaChange({ ...schema, fields: updatedFields });
    } else if (direction === 'down' && index < schema.fields.length - 1) {
      const updatedFields = [...schema.fields];
      [updatedFields[index], updatedFields[index + 1]] = [
        updatedFields[index + 1],
        updatedFields[index],
      ];
      onSchemaChange({ ...schema, fields: updatedFields });
    }
  };

  const updateFormMeta = (meta) => {
    onSchemaChange({ ...schema, ...meta });
  };

  const selectedField = schema.fields.find((f) => f.id === selectedFieldId);

  return (
    <div className="form-builder-container">
      <div className="builder-content">
        <div className="builder-panel">
          <div className="form-meta-section">
            <h3>Form Settings</h3>
            <div className="meta-field">
              <label>Form Title</label>
              <input
                type="text"
                value={schema.title || ''}
                onChange={(e) => updateFormMeta({ title: e.target.value })}
                placeholder="Enter form title"
              />
            </div>
            <div className="meta-field">
              <label>Form Description</label>
              <textarea
                value={schema.description || ''}
                onChange={(e) => updateFormMeta({ description: e.target.value })}
                placeholder="Enter form description"
                rows={3}
              />
            </div>
          </div>

          <div className="add-field-section">
            <h3>Add Fields</h3>
            <div className="field-type-buttons">
              {Object.entries(FIELD_TYPES).map(([key, type]) => (
                <button
                  key={type}
                  className="add-field-btn"
                  onClick={() => addField(type)}
                  title={`Add ${type} field`}
                >
                  + {key.charAt(0) + key.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="fields-list-section">
            <h3>Fields ({schema.fields.length})</h3>
            <div className="fields-list">
              {schema.fields.length === 0 ? (
                <p className="no-fields">No fields added yet</p>
              ) : (
                schema.fields.map((field, index) => (
                  <div
                    key={field.id}
                    className={`field-item ${selectedFieldId === field.id ? 'selected' : ''}`}
                    onClick={() => setSelectedFieldId(field.id)}
                  >
                    <div className="field-item-header">
                      <span className="field-type-badge">{field.type}</span>
                      <span className="field-name">{field.name || '(unnamed)'}</span>
                    </div>
                    <div className="field-item-actions">
                      <button
                        className="action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveField(field.id, 'up');
                        }}
                        disabled={index === 0}
                        title="Move up"
                      >
                        ↑
                      </button>
                      <button
                        className="action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveField(field.id, 'down');
                        }}
                        disabled={index === schema.fields.length - 1}
                        title="Move down"
                      >
                        ↓
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteField(field.id);
                        }}
                        title="Delete field"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="editor-panel">
          {selectedField ? (
            <FieldEditor
              field={selectedField}
              onUpdate={(updates) => updateField(selectedFieldId, updates)}
            />
          ) : (
            <div className="no-selection">
              <p>Select a field to edit its properties</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
