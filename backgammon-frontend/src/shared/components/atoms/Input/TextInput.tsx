import React from 'react';
import { TextInputProps, inputBaseStyles, inputNormalStyles, inputFocusStyles, inputErrorStyles, inputDisabledStyles } from './Input.types';
import { InputWrapper } from './InputWrapper';

/**
 * Text Input Component
 * 
 * یک input متنی با قابلیت‌های:
 * - پشتیبانی از انواع: text, email, number, tel, url, search
 * - آیکون چپ و راست
 * - Label و helper text
 * - نمایش خطا
 * - Dark mode support
 * - Responsive
 * 
 * @example
 * ```tsx
 * <TextInput
 *   type="email"
 *   label="Email"
 *   placeholder="your@email.com"
 *   leftIcon={<EmailIcon />}
 *   error={errors.email}
 * />
 * ```
 */
export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  id,
  type = 'text',
  ...restProps
}) => {
  // ترکیب کلاس‌ها
  const errorStyles = error ? inputErrorStyles : '';
  const widthStyles = fullWidth ? 'w-full' : '';
  const paddingStyles = `${leftIcon ? 'pl-11' : ''} ${rightIcon ? 'pr-11' : ''}`;
  
  const finalClassName = `
    ${inputBaseStyles}
    ${inputNormalStyles}
    ${inputFocusStyles}
    ${errorStyles}
    ${inputDisabledStyles}
    ${widthStyles}
    ${paddingStyles}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // ID منحصر به فرد برای ارتباط label با input
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <InputWrapper
      label={label}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      htmlFor={inputId}
    >
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        {/* Input */}
        <input
          id={inputId}
          type={type}
          className={finalClassName}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...restProps}
        />
        
        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
    </InputWrapper>
  );
};

export default TextInput;
