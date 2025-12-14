import { useState, useEffect } from 'react';
import { FormBuilder } from './components/FormBuilder';
import { FormPreview } from './components/FormPreview';
import { FormExporter } from './components/FormExporter';
import './App.css';

const DEFAULT_SCHEMA = {
  title: 'My Form',
  description: 'Create your form by adding fields',
  fields: [],
};

function App() {
  const [schema, setSchema] = useState(DEFAULT_SCHEMA);
  const [activeTab, setActiveTab] = useState('builder');

  // Load schema from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('formSchema');
    if (saved) {
      try {
        setSchema(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved schema:', error);
      }
    }

    // Load schema from URL hash if present
    const hash = window.location.hash;
    if (hash.startsWith('#import=')) {
      try {
        const encoded = hash.substring(8);
        const imported = JSON.parse(atob(encoded));
        setSchema(imported);
        window.location.hash = '';
      } catch (error) {
        console.error('Failed to import schema:', error);
      }
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('formSchema', JSON.stringify(schema));
  }, [schema]);

  const handleSaveAs = () => {
    const name = prompt('Enter form name:', schema.title);
    if (name) {
      setSchema((prev) => ({ ...prev, title: name }));
    }
  };

  const handleLoadSample = () => {
    const sampleSchema = {
      title: 'Contact Form',
      description: 'Please fill in your contact information',
      fields: [
        {
          id: '1',
          type: 'text',
          name: 'firstName',
          label: 'First Name',
          required: true,
          placeholder: 'John',
          validators: [],
        },
        {
          id: '2',
          type: 'text',
          name: 'lastName',
          label: 'Last Name',
          required: true,
          placeholder: 'Doe',
          validators: [],
        },
        {
          id: '3',
          type: 'email',
          name: 'email',
          label: 'Email Address',
          required: true,
          placeholder: 'john@example.com',
          validators: [
            { type: 'email', message: 'Please enter a valid email' },
          ],
        },
        {
          id: '4',
          type: 'select',
          name: 'subject',
          label: 'Subject',
          required: true,
          placeholder: '',
          validators: [],
          options: [
            { id: 'opt1', value: 'general', label: 'General Inquiry' },
            { id: 'opt2', value: 'support', label: 'Support' },
            { id: 'opt3', value: 'feedback', label: 'Feedback' },
          ],
        },
        {
          id: '5',
          type: 'textarea',
          name: 'message',
          label: 'Message',
          required: true,
          placeholder: 'Your message here...',
          validators: [
            { type: 'minLength', value: 10, message: 'Message must be at least 10 characters' },
          ],
          rows: 5,
        },
      ],
    };
    setSchema(sampleSchema);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form? This cannot be undone.')) {
      setSchema(DEFAULT_SCHEMA);
      localStorage.removeItem('formSchema');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="header-text">
              <h1>Form Builder</h1>
              <p>Design, preview, and export forms seamlessly</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="header-btn" onClick={handleSaveAs} title="Save form with custom name">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              <span>Save As</span>
            </button>
            <button className="header-btn primary" onClick={handleLoadSample} title="Load sample contact form">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
              <span>Load Sample</span>
            </button>
            <button className="header-btn danger" onClick={handleReset} title="Reset form">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              <span>Reset</span>
            </button>
          </div>
        </div>
      </header>

      <div className="app-content">
        <nav className="tab-navigation">
          <div className="tab-nav-inner">
            <button
              className={`tab-btn ${activeTab === 'builder' ? 'active' : ''}`}
              onClick={() => setActiveTab('builder')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>Builder</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>Preview</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'export' ? 'active' : ''}`}
              onClick={() => setActiveTab('export')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span>Export</span>
            </button>
          </div>
        </nav>

        <main className="main-content">
          {activeTab === 'builder' && (
            <FormBuilder schema={schema} onSchemaChange={setSchema} />
          )}
          {activeTab === 'preview' && (
            <FormPreview schema={schema} />
          )}
          {activeTab === 'export' && (
            <FormExporter schema={schema} />
          )}
        </main>
      </div>

      <footer className="app-footer">
        <div className="footer-content">
          <span>Form Builder • Built with React</span>
          <span>{schema.fields.length} field{schema.fields.length !== 1 ? 's' : ''}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
