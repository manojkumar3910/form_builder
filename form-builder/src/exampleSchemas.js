// Example Form Schemas for the Dynamic Form Builder

// ==========================================
// 1. BASIC CONTACT FORM
// ==========================================
export const contactFormSchema = {
  title: 'Contact Us',
  description: 'Please fill in your contact information and we\'ll get back to you soon.',
  fields: [
    {
      id: '1',
      type: 'text',
      name: 'fullName',
      label: 'Full Name',
      required: true,
      placeholder: 'John Doe',
      validators: [],
    },
    {
      id: '2',
      type: 'email',
      name: 'email',
      label: 'Email Address',
      required: true,
      placeholder: 'john@example.com',
      validators: [
        {
          type: 'email',
          message: 'Please enter a valid email address',
        },
      ],
    },
    {
      id: '3',
      type: 'text',
      name: 'phone',
      label: 'Phone Number',
      required: false,
      placeholder: '+1 (555) 123-4567',
      validators: [
        {
          type: 'pattern',
          value: '^[+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$',
          message: 'Please enter a valid phone number',
        },
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
        { id: '1', value: 'general', label: 'General Inquiry' },
        { id: '2', value: 'support', label: 'Technical Support' },
        { id: '3', value: 'sales', label: 'Sales Question' },
        { id: '4', value: 'feedback', label: 'Feedback' },
      ],
    },
    {
      id: '5',
      type: 'textarea',
      name: 'message',
      label: 'Message',
      required: true,
      placeholder: 'Tell us how we can help...',
      validators: [
        {
          type: 'minLength',
          value: 10,
          message: 'Message must be at least 10 characters',
        },
        {
          type: 'maxLength',
          value: 1000,
          message: 'Message must not exceed 1000 characters',
        },
      ],
      rows: 5,
    },
    {
      id: '6',
      type: 'checkbox',
      name: 'subscribe',
      label: 'Subscribe to our newsletter',
      required: false,
      placeholder: '',
      validators: [],
    },
  ],
};

// ==========================================
// 2. USER REGISTRATION FORM
// ==========================================
export const registrationFormSchema = {
  title: 'Create Your Account',
  description: 'Sign up to get started with our platform',
  fields: [
    {
      id: '1',
      type: 'text',
      name: 'username',
      label: 'Username',
      required: true,
      placeholder: 'johndoe',
      validators: [
        {
          type: 'minLength',
          value: 3,
          message: 'Username must be at least 3 characters',
        },
        {
          type: 'maxLength',
          value: 20,
          message: 'Username must not exceed 20 characters',
        },
        {
          type: 'pattern',
          value: '^[a-zA-Z0-9_-]+$',
          message: 'Username can only contain letters, numbers, underscores, and hyphens',
        },
      ],
    },
    {
      id: '2',
      type: 'email',
      name: 'email',
      label: 'Email Address',
      required: true,
      placeholder: 'john@example.com',
      validators: [
        {
          type: 'email',
          message: 'Please enter a valid email address',
        },
      ],
    },
    {
      id: '3',
      type: 'password',
      name: 'password',
      label: 'Password',
      required: true,
      placeholder: '••••••••',
      validators: [
        {
          type: 'minLength',
          value: 8,
          message: 'Password must be at least 8 characters',
        },
      ],
    },
    {
      id: '4',
      type: 'password',
      name: 'confirmPassword',
      label: 'Confirm Password',
      required: true,
      placeholder: '••••••••',
      validators: [
        {
          type: 'minLength',
          value: 8,
          message: 'Password must be at least 8 characters',
        },
      ],
    },
    {
      id: '5',
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      required: true,
      placeholder: 'John',
      validators: [],
    },
    {
      id: '6',
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      required: true,
      placeholder: 'Doe',
      validators: [],
    },
    {
      id: '7',
      type: 'date',
      name: 'dateOfBirth',
      label: 'Date of Birth',
      required: false,
      placeholder: '',
      validators: [],
    },
    {
      id: '8',
      type: 'checkbox',
      name: 'termsAgree',
      label: 'I agree to the Terms of Service',
      required: true,
      placeholder: '',
      validators: [],
    },
    {
      id: '9',
      type: 'checkbox',
      name: 'privacyAgree',
      label: 'I agree to the Privacy Policy',
      required: true,
      placeholder: '',
      validators: [],
    },
  ],
};

// ==========================================
// 3. JOB APPLICATION FORM
// ==========================================
export const jobApplicationSchema = {
  title: 'Job Application Form',
  description: 'Apply for a position at our company',
  fields: [
    {
      id: '1',
      type: 'text',
      name: 'fullName',
      label: 'Full Name',
      required: true,
      placeholder: 'John Doe',
      validators: [],
    },
    {
      id: '2',
      type: 'email',
      name: 'email',
      label: 'Email Address',
      required: true,
      placeholder: 'john@example.com',
      validators: [
        {
          type: 'email',
          message: 'Please enter a valid email',
        },
      ],
    },
    {
      id: '3',
      type: 'text',
      name: 'phone',
      label: 'Phone Number',
      required: true,
      placeholder: '+1 (555) 123-4567',
      validators: [],
    },
    {
      id: '4',
      type: 'select',
      name: 'position',
      label: 'Position Applied For',
      required: true,
      placeholder: '',
      validators: [],
      options: [
        { id: '1', value: 'frontend', label: 'Frontend Developer' },
        { id: '2', value: 'backend', label: 'Backend Developer' },
        { id: '3', value: 'fullstack', label: 'Full Stack Developer' },
        { id: '4', value: 'designer', label: 'UI/UX Designer' },
        { id: '5', value: 'pm', label: 'Product Manager' },
      ],
    },
    {
      id: '5',
      type: 'number',
      name: 'yearsExperience',
      label: 'Years of Experience',
      required: true,
      placeholder: '5',
      validators: [
        {
          type: 'min',
          value: 0,
          message: 'Years must be 0 or greater',
        },
        {
          type: 'max',
          value: 60,
          message: 'Years must be less than 60',
        },
      ],
    },
    {
      id: '6',
      type: 'textarea',
      name: 'coverLetter',
      label: 'Cover Letter',
      required: true,
      placeholder: 'Tell us why you\'re interested in this position...',
      validators: [
        {
          type: 'minLength',
          value: 50,
          message: 'Cover letter must be at least 50 characters',
        },
      ],
      rows: 6,
    },
    {
      id: '7',
      type: 'file',
      name: 'resume',
      label: 'Upload Resume',
      required: true,
      placeholder: '',
      validators: [],
    },
    {
      id: '8',
      type: 'radio',
      name: 'workType',
      label: 'Preferred Work Type',
      required: true,
      placeholder: '',
      validators: [],
      options: [
        { id: '1', value: 'remote', label: 'Remote' },
        { id: '2', value: 'onsite', label: 'On-site' },
        { id: '3', value: 'hybrid', label: 'Hybrid' },
      ],
    },
    {
      id: '9',
      type: 'checkbox',
      name: 'availableNow',
      label: 'Available to start immediately',
      required: false,
      placeholder: '',
      validators: [],
    },
  ],
};

// ==========================================
// 4. FEEDBACK SURVEY FORM
// ==========================================
export const feedbackFormSchema = {
  title: 'Customer Feedback Survey',
  description: 'Help us improve by sharing your feedback',
  fields: [
    {
      id: '1',
      type: 'text',
      name: 'name',
      label: 'Your Name',
      required: false,
      placeholder: 'John Doe',
      validators: [],
    },
    {
      id: '2',
      type: 'email',
      name: 'email',
      label: 'Email Address',
      required: false,
      placeholder: 'john@example.com',
      validators: [
        {
          type: 'email',
          message: 'Invalid email format',
        },
      ],
    },
    {
      id: '3',
      type: 'select',
      name: 'category',
      label: 'Feedback Category',
      required: true,
      placeholder: '',
      validators: [],
      options: [
        { id: '1', value: 'product', label: 'Product Quality' },
        { id: '2', value: 'service', label: 'Customer Service' },
        { id: '3', value: 'website', label: 'Website Experience' },
        { id: '4', value: 'other', label: 'Other' },
      ],
    },
    {
      id: '4',
      type: 'radio',
      name: 'rating',
      label: 'How would you rate your experience?',
      required: true,
      placeholder: '',
      validators: [],
      options: [
        { id: '1', value: '5', label: '⭐ Excellent' },
        { id: '2', value: '4', label: '⭐ Good' },
        { id: '3', value: '3', label: '⭐ Average' },
        { id: '4', value: '2', label: '⭐ Poor' },
        { id: '5', value: '1', label: '⭐ Very Poor' },
      ],
    },
    {
      id: '5',
      type: 'textarea',
      name: 'comments',
      label: 'Additional Comments',
      required: false,
      placeholder: 'Please share any additional feedback...',
      validators: [
        {
          type: 'maxLength',
          value: 500,
          message: 'Comments must not exceed 500 characters',
        },
      ],
      rows: 4,
    },
    {
      id: '6',
      type: 'checkbox',
      name: 'followUp',
      label: 'May we contact you to discuss your feedback?',
      required: false,
      placeholder: '',
      validators: [],
    },
  ],
};

// ==========================================
// USAGE EXAMPLE
// ==========================================
/*
import { contactFormSchema } from './exampleSchemas';
import { FormField } from './components/FormField';
import { validateForm } from './utils/validationSchema';
import { useState } from 'react';

function MyForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData, contactFormSchema);
    
    if (Object.keys(formErrors).length === 0) {
      console.log('Form submitted:', formData);
      // Send to backend
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{contactFormSchema.title}</h2>
      <p>{contactFormSchema.description}</p>
      
      {contactFormSchema.fields.map(field => (
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
*/
