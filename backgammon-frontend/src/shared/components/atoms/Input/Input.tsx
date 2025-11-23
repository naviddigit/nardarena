import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';

interface InputProps {
  type?: string;
  name?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leftIcon?: React.ReactNode;
  label?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  type = 'text',
  name,
  placeholder, 
  value, 
  onChange, 
  leftIcon,
  label,
  error,
  disabled = false,
  fullWidth = true
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const isEmail = type === 'email';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary z-10">
            {leftIcon}
          </div>
        )}
        
        {/* Email Icon */}
        {isEmail && !leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary z-10">
            <FiMail size={20} />
          </div>
        )}
        
        {/* Password Icon */}
        {isPassword && !leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary z-10">
            <FiLock size={20} />
          </div>
        )}

        {/* Input Field */}
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full h-12 px-4 rounded-xl
            bg-surface border border-border-color
            text-text-primary placeholder:text-text-tertiary
            transition-all duration-200 outline-none
            hover:border-purple-500/50
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
            disabled:opacity-50 disabled:cursor-not-allowed
            ${leftIcon || isPassword || isEmail ? 'pl-12' : ''}
            ${isPassword ? 'pr-12' : ''}
            ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20' : ''}
          `}
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition z-10"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-danger-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};