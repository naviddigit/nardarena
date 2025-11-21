import React from 'react';
import { motion } from 'framer-motion';

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leftIcon?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  type, 
  placeholder, 
  value, 
  onChange, 
  leftIcon,
  error 
}) => {
  return (
    <div className="w-full">
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3.5 rounded-xl transition outline-none bg-white dark:bg-white/5 border ${error ? 'border-red-400' : 'border-gray-300/50 dark:border-white/10'} text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-400 shadow-sm dark:shadow-none ${leftIcon ? 'pl-10' : ''}`}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};