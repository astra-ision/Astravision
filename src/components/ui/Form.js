'use client';

import { useState, useEffect, useCallback } from 'react';

// Form input component with validation
export function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  placeholder,
  className = '',
  inputClassName = '',
  autoComplete = 'on',
  min,
  max,
  pattern,
  options = [],
  multiple = false,
  rows = 3,
  showPasswordToggle = true,
  fullWidth = true,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleTogglePassword = () => {
    setShowPassword(prevState => !prevState);
  };
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            id={name}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            rows={rows}
            className={`block w-full px-3 py-2 border ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-md shadow-sm placeholder-gray-400 ${inputClassName}`}
            {...props}
          />
        );
        
      case 'select':
        return (
          <select
            name={name}
            id={name}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            multiple={multiple}
            className={`block w-full px-3 py-2 border ${error ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-md shadow-sm ${inputClassName}`}
            {...props}
          >
            {placeholder && (
              <option value="">{placeholder}</option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={name}
            id={name}
            checked={value || false}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${inputClassName}`}
            {...props}
          />
        );
        
      case 'radio':
        return (
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${name}-${option.value}`}
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                  disabled={disabled || option.disabled}
                  required={required}
                  className={`h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 ${inputClassName}`}
                  {...props}
                />
                <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
        
      case 'password':
        return (
          <div className="relative">
            <input
              type={inputType}
              name={name}
              id={name}
              value={value || ''}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              placeholder={placeholder}
              required={required}
              autoComplete={autoComplete}
              min={min}
              max={max}
              pattern={pattern}
              className={`block w-full px-3 py-2 ${showPasswordToggle ? 'pr-10' : ''} border ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-md shadow-sm placeholder-gray-400 ${inputClassName}`}
              {...props}
            />
            {showPasswordToggle && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={handleTogglePassword}
                tabIndex="-1"
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        );
        
      case 'file':
        return (
          <input
            type="file"
            name={name}
            id={name}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            multiple={multiple}
            className={`block w-full px-3 py-2 text-sm text-gray-700 bg-white border ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-md shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${inputClassName}`}
            {...props}
          />
        );
        
      default:
        return (
          <input
            type={inputType}
            name={name}
            id={name}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            min={min}
            max={max}
            pattern={pattern}
            className={`block w-full px-3 py-2 border ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-md shadow-sm placeholder-gray-400 ${inputClassName}`}
            {...props}
          />
        );
    }
  };
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      {renderInput()}
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

// Form component with validation
export default function Form({
  initialValues = {},
  validationSchema = null,
  onSubmit,
  onChange,
  children,
  className = '',
  id,
  autoComplete = 'on',
  disabled = false
}) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Validate a single field
  const validateField = useCallback((name, value) => {
    if (!validationSchema) return '';
    
    try {
      // Check if the field has a validation rule
      const fieldSchema = validationSchema[name];
      if (!fieldSchema) return '';
      
      // Required check
      if (fieldSchema.required && (value === undefined || value === null || value === '')) {
        return fieldSchema.required.message || `${name} is required`;
      }
      
      // Min length check
      if (fieldSchema.minLength && value.length < fieldSchema.minLength.value) {
        return fieldSchema.minLength.message || `${name} must be at least ${fieldSchema.minLength.value} characters`;
      }
      
      // Max length check
      if (fieldSchema.maxLength && value.length > fieldSchema.maxLength.value) {
        return fieldSchema.maxLength.message || `${name} must be at most ${fieldSchema.maxLength.value} characters`;
      }
      
      // Min value check (for numeric inputs)
      if (fieldSchema.min && Number(value) < fieldSchema.min.value) {
        return fieldSchema.min.message || `${name} must be at least ${fieldSchema.min.value}`;
      }
      
      // Max value check (for numeric inputs)
      if (fieldSchema.max && Number(value) > fieldSchema.max.value) {
        return fieldSchema.max.message || `${name} must be at most ${fieldSchema.max.value}`;
      }
      
      // Pattern check
      if (fieldSchema.pattern && !new RegExp(fieldSchema.pattern.value).test(value)) {
        return fieldSchema.pattern.message || `${name} is invalid`;
      }
      
      // Email format check
      if (fieldSchema.email && value && !/\S+@\S+\.\S+/.test(value)) {
        return fieldSchema.email.message || `${name} must be a valid email`;
      }
      
      // Custom validation
      if (fieldSchema.validate) {
        const customError = fieldSchema.validate(value, values);
        if (customError) return customError;
      }
      
      return '';
    } catch (error) {
      console.error('Validation error:', error);
      return '';
    }
  }, [validationSchema, values]);
  
  // Validate all fields
  const validateForm = useCallback(() => {
    if (!validationSchema) return {};
    
    const formErrors = {};
    Object.keys(values).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) {
        formErrors[name] = error;
      }
    });
    
    return formErrors;
  }, [validateField, values, validationSchema]);
  
  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different input types
    const inputValue = type === 'checkbox' ? checked : value;
    
    setValues(prevValues => ({
      ...prevValues,
      [name]: inputValue
    }));
    
    if (validationSchema && touched[name]) {
      const error = validateField(name, inputValue);
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: error
      }));
    }
    
    if (onChange) {
      onChange(e);
    }
  }, [onChange, touched, validateField, validationSchema]);
  
  // Handle input blur
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    
    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true
    }));
    
    if (validationSchema) {
      const error = validateField(name, values[name]);
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: error
      }));
    }
  }, [validateField, validationSchema, values]);
  
  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Validate all fields
    const formErrors = validateForm();
    setErrors(formErrors);
    
    // Check if the form is valid
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [onSubmit, validateForm, values]);
  
  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setTouched({});
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);
  
  // Update form values when initialValues change
  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);
  
  return (
    <form
      id={id}
      className={className}
      onSubmit={handleSubmit}
      autoComplete={autoComplete}
      noValidate
    >
      {typeof children === 'function'
        ? children({
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            resetForm,
            disabled
          })
        : children}
    </form>
  );
} 