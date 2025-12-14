import { useState } from 'react';
import '../styles/FormExporter.css';

export function FormExporter({ schema }) {
  const [copied, setCopied] = useState(false);

  const exportAsJson = () => {
    const jsonString = JSON.stringify(schema, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${schema.title || 'form'}-schema.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportAsCode = () => {
    const jsCode = `export const formSchema = ${JSON.stringify(schema, null, 2)};`;
    const blob = new Blob([jsCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${schema.title || 'form'}-schema.js`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const jsonString = JSON.stringify(schema, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const importSchema = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          window.location.hash = '#import=' + btoa(JSON.stringify(imported));
          window.location.reload();
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="form-exporter">
      <h3>Export & Import</h3>

      <div className="export-section">
        <h4>Export Schema</h4>
        <div className="export-buttons">
          <button onClick={exportAsJson} className="export-btn json">
            📥 Download JSON
          </button>
          <button onClick={exportAsCode} className="export-btn code">
            📥 Download JS
          </button>
          <button onClick={copyToClipboard} className={`export-btn copy ${copied ? 'copied' : ''}`}>
            {copied ? '✓ Copied!' : '📋 Copy JSON'}
          </button>
        </div>
      </div>

      <div className="export-section">
        <h4>Import Schema</h4>
        <label className="file-input-label">
          📤 Choose JSON File
          <input
            type="file"
            accept=".json"
            onChange={importSchema}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      <div className="export-section">
        <h4>Schema Preview</h4>
        <div className="schema-preview">
          <pre>{JSON.stringify(schema, null, 2)}</pre>
        </div>
      </div>

      <div className="export-section">
        <h4>Import Code</h4>
        <p className="code-hint">Use this in your React app:</p>
        <div className="code-block">
          <pre>{`import { FormField } from './components/FormField';
import { validateForm } from './utils/validationSchema';

const schema = ${JSON.stringify(schema, null, 2)};

// In your component:
<FormField field={schema.fields[0]} value={formData.fieldName} onChange={handleChange} />`}</pre>
        </div>
      </div>
    </div>
  );
}
