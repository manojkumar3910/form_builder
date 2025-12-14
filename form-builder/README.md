# Dynamic Form Builder 🚀

A powerful React-based form builder that allows users to create, preview, and export dynamic forms using JSON schema. Built with React, Vite, and a modern validation-ready architecture.

## Features ✨

### Core Functionality
- **Intuitive Form Building**: Drag-and-drop style interface to create complex forms
- **Multiple Field Types**: Text, Email, Password, Number, Textarea, Select, Checkbox, Radio, Date, File
- **Live Preview**: See your form in action as you build it
- **JSON Schema Export**: Export your form as JSON for use in other applications
- **Form Import**: Load previously created forms from JSON files
- **Built-in Validation**: Email validation, min/max length, custom patterns, and more
- **Field Reordering**: Move fields up/down to arrange form layout
- **Auto-save**: Automatically saves to browser localStorage
- **Sample Forms**: Load pre-built contact form templates

### Field Properties
Each field can be customized with:
- Field name and label
- Placeholder text
- Required/optional toggle
- Custom validators with error messages
- Options for select, radio, and checkbox fields
- Rows configuration for textarea fields

### Validation System
- **Built-in Validators**:
  - Email validation
  - Min/Max length
  - Min/Max values (for numbers)
  - Custom regex patterns
- **Custom Error Messages**: Set personalized error messages for each validator
- **Real-time Validation**: Errors display as users interact with the form

## Project Structure

```
form-builder/
├── src/
│   ├── components/
│   │   ├── FormBuilder.jsx      # Main builder interface
│   │   ├── FormField.jsx         # Reusable field component
│   │   ├── FieldEditor.jsx       # Field property editor
│   │   ├── FormPreview.jsx       # Live form preview
│   │   └── FormExporter.jsx      # Export/import functionality
│   ├── utils/
│   │   └── validationSchema.js   # Validation logic and schema utilities
│   ├── styles/
│   │   ├── FormBuilder.css
│   │   ├── FieldEditor.css
│   │   ├── FormField.css
│   │   ├── FormPreview.css
│   │   └── FormExporter.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd form-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## Usage Guide

### Building a Form

1. **Access the Builder Tab**
   - Click the "📝 Builder" tab to start creating your form

2. **Set Form Metadata**
   - Enter a form title and description in the Form Settings section
   - These will be displayed to users when they access the form

3. **Add Fields**
   - Click any button in the "Add Fields" section to add a new field
   - Supported field types: Text, Email, Password, Number, Textarea, Select, Checkbox, Radio, Date, File

4. **Configure Field Properties**
   - Select a field from the Fields list
   - In the right panel, configure:
     - **Field Name**: Unique identifier (required)
     - **Field Label**: Display text for users
     - **Placeholder**: Hint text
     - **Required**: Toggle if field must be filled
     - **Options**: For Select, Radio, and Checkbox types

5. **Add Validators**
   - Click "+ Add Validator" to add validation rules
   - Set custom error messages for better UX
   - Supported validators: Email, Min/Max Length, Min/Max Value, Pattern (Regex)

6. **Organize Fields**
   - Use ↑/↓ buttons to reorder fields
   - Use ✕ button to delete fields

### Previewing Your Form

1. Click the "👁️ Preview" tab
2. See a live preview of your form
3. Test form submission and validation
4. View form data in JSON format
5. Use "Submit" to validate all fields
6. Use "Clear" to reset the form

### Exporting Your Form

1. Click the "📤 Export" tab
2. Choose export format:
   - **Download JSON**: Save schema as `.json` file
   - **Download JS**: Save as JavaScript module (`.js`)
   - **Copy JSON**: Copy schema to clipboard
3. **Import Schema**: Upload previously exported JSON files
4. View full schema and integration code examples

## Schema Format

Forms are represented as JSON schemas with the following structure:

```javascript
{
  "title": "Contact Form",
  "description": "Please fill in your contact information",
  "fields": [
    {
      "id": "1",
      "type": "text",
      "name": "firstName",
      "label": "First Name",
      "required": true,
      "placeholder": "John",
      "validators": []
    },
    {
      "id": "2",
      "type": "email",
      "name": "email",
      "label": "Email",
      "required": true,
      "placeholder": "john@example.com",
      "validators": [
        {
          "type": "email",
          "message": "Please enter a valid email"
        }
      ]
    }
  ]
}
```

## Field Types Reference

| Type | Description | Use Cases |
|------|-------------|-----------|
| **text** | Single-line text input | Names, usernames |
| **email** | Email input with validation | Email addresses |
| **password** | Hidden text input | Passwords, secrets |
| **number** | Numeric input | Ages, quantities |
| **textarea** | Multi-line text | Comments, descriptions |
| **select** | Dropdown selection | Options, categories |
| **checkbox** | Single checkbox | Agreements, toggles |
| **radio** | Radio button group | Exclusive choices |
| **date** | Date picker | Birthdate, deadlines |
| **file** | File upload | Documents, images |

## Validator Types Reference

| Validator | Parameters | Example |
|-----------|-----------|---------|
| **email** | (none) | Validates email format |
| **minLength** | value: number | Minimum characters required |
| **maxLength** | value: number | Maximum characters allowed |
| **pattern** | value: regex string | Custom regex validation |
| **min** | value: number | Minimum numeric value |
| **max** | value: number | Maximum numeric value |

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm lint
```

## Keyboard Shortcuts & Tips

- **Enter key in option input**: Quickly add options without clicking the button
- **Auto-save**: Your form is automatically saved to localStorage
- **Load Sample**: Click "Load Sample" to see a complete contact form example
- **Save As**: Rename your form for better organization

## Integration with Your Application

To use an exported form schema in your React app:

```javascript
import { FormField } from './components/FormField';
import { validateForm } from './utils/validationSchema';

const schema = {
  title: 'My Form',
  fields: [
    {
      id: '1',
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      required: true,
      placeholder: '',
      validators: []
    }
  ]
};

function MyApp() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData, schema);
    if (Object.keys(formErrors).length === 0) {
      console.log('Valid form data:', formData);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.fields.map(field => (
        <FormField
          key={field.id}
          field={field}
          value={formData[field.name]}
          onChange={handleFieldChange}
          error={errors[field.name]}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Data Storage

- **Local Storage**: Forms are auto-saved to browser localStorage with key `formSchema`
- **Export/Import**: Export to JSON for backup and sharing
- **No Backend Required**: All data stays in your browser

## Styling & Customization

The form builder uses CSS custom properties (variables) for easy theming. Modify these in `App.css` or `index.css`:

```css
--primary-color: #3b82f6;
--secondary-color: #8b5cf6;
--danger-color: #ef4444;
--success-color: #10b981;
--bg-color: #f9fafb;
--card-bg: #ffffff;
--border-color: #e5e7eb;
--text-primary: #1f2937;
```

## Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite will automatically use the next available port.

### Node.js Version Error
Ensure you have Node.js 20.19+ or 22.12+ installed.

### Form Not Loading
Clear browser localStorage:
```javascript
localStorage.removeItem('formSchema');
location.reload();
```

## Technologies Used

- **React 19**: UI framework
- **Vite 7**: Build tool and dev server
- **CSS 3**: Modern styling with CSS variables
- **JavaScript ES6+**: Modern JavaScript features

## Features Implemented ✅

- ✅ Reusable form field components
- ✅ Form builder with drag-and-drop feel
- ✅ Live preview functionality
- ✅ JSON schema export/import
- ✅ Comprehensive validation system
- ✅ Custom error messages
- ✅ Auto-save to localStorage
- ✅ Responsive design
- ✅ Multiple field types
- ✅ Field property editor
- ✅ Field reordering
- ✅ Sample form templates
- ✅ Professional UI/UX

## License

MIT License - Feel free to use this project for personal and commercial purposes.

---

Built with ❤️ using React, Vite, and modern JavaScript
