/**
 * Avatar Upload Component - Minimals Design
 * کامپوننت آپلود آواتار با طراحی Minimals
 */

import { useState, useRef } from 'react';
import { FiCamera, FiX } from 'react-icons/fi';

interface AvatarUploadProps {
  currentAvatar?: string | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
}

export const AvatarUpload = ({ currentAvatar, onChange, disabled = false }: AvatarUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentAvatar || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 3MB)
      if (file.size > 3 * 1024 * 1024) {
        alert('File size must be less than 3MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      onChange(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Avatar Circle */}
      <div className="relative">
        <div 
          className={`w-36 h-36 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center border-4 border-gray-200 dark:border-gray-600 ${
            !disabled && 'cursor-pointer hover:border-purple-500 transition-colors'
          }`}
          onClick={handleClick}
        >
          {preview ? (
            <img 
              src={preview} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <FiCamera size={32} />
              <span className="text-xs mt-2">Upload photo</span>
            </div>
          )}
        </div>

        {/* Upload Button Overlay */}
        {!disabled && (
          <button
            type="button"
            onClick={handleClick}
            className="absolute bottom-0 right-0 w-10 h-10 bg-gray-800 dark:bg-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
          >
            <FiCamera className="text-white dark:text-gray-800" size={18} />
          </button>
        )}

        {/* Remove Button */}
        {preview && !disabled && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-0 right-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
          >
            <FiX className="text-white" size={16} />
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />

      {/* Helper Text */}
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center max-w-xs">
        Allowed *.jpeg, *.jpg, *.png, *.gif
        <br />
        max size of 3 Mb
      </p>
    </div>
  );
};
