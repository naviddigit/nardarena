import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Input Wrapper Component
 * 
 * این کامپوننت wrapper مشترک برای تمام input ها است.
 * مسئول نمایش label, error و helperText است.
 * 
 * این کامپوننت طبق اصل DRY (Don't Repeat Yourself) ساخته شده
 * تا از تکرار کد جلوگیری کند.
 */
interface InputWrapperProps {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
  htmlFor?: string; // برای ارتباط label با input
}

export const InputWrapper: React.FC<InputWrapperProps> = ({
  label,
  error,
  helperText,
  fullWidth,
  children,
  htmlFor,
}) => {
  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={htmlFor}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
        </label>
      )}
      
      {/* Input (children) */}
      {children}
      
      {/* Error Message با انیمیشن */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-sm text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      
      {/* Helper Text - فقط وقتی error نیست */}
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
};
