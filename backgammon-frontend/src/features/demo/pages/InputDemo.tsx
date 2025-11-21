import { useState } from 'react';
import { TextInput, PasswordInput } from '@shared/components/atoms/Input';
import { EmailIcon } from '@shared/components/atoms/Icon';
import { ThemeToggle } from '@shared/components/organisms/ThemeToggle';

/**
 * Input Demo Page
 * 
 * نمایش تمام حالت‌های Input:
 * - TextInput با انواع type
 * - PasswordInput با show/hide
 * - با validation
 * - با icon
 * - Error states
 * - Disabled states
 */
export default function InputDemo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Email validation
  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  // Password validation
  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('');
      return;
    }
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg p-8 transition-colors relative">
      <ThemeToggle />
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Input Components Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            All possible Input states following SOLID principles
          </p>
        </div>

        {/* Basic Text Input */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Basic Text Input
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              placeholder="Enter your name"
              label="Full Name"
              helperText="Your first and last name"
            />
            <TextInput
              placeholder="Username"
              label="Username"
              helperText="Choose a unique username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </section>

        {/* Email Input with Validation */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Email with Validation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              type="email"
              placeholder="your@email.com"
              label="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              error={emailError}
              leftIcon={<EmailIcon />}
            />
            <TextInput
              type="email"
              placeholder="confirm@email.com"
              label="Confirm Email"
              helperText="Must match the email above"
              leftIcon={<EmailIcon />}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            💡 Fill the left input - validation happens automatically
          </p>
        </section>

        {/* Password Input */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Password Input
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PasswordInput
              placeholder="Enter password"
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              error={passwordError}
              helperText="Must be at least 8 characters"
            />
            <PasswordInput
              placeholder="Confirm password"
              label="Confirm Password"
              helperText="Must match the password above"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            👁️ Click the eye icon to show/hide password
          </p>
        </section>

        {/* Input Types */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Different Input Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              type="tel"
              placeholder="+98 912 345 6789"
              label="Phone Number"
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
            />
            <TextInput
              type="number"
              placeholder="1000"
              label="Amount"
              helperText="Enter amount in Tomans"
              leftIcon={<span className="text-gray-400">💰</span>}
            />
            <TextInput
              type="url"
              placeholder="https://example.com"
              label="Website"
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              }
            />
            <TextInput
              type="search"
              placeholder="Search tournaments..."
              label="Search"
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </div>
        </section>

        {/* Error States */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Error States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              placeholder="username"
              label="Username"
              error="This username is already taken"
              value="john_doe"
            />
            <PasswordInput
              placeholder="password"
              label="Password"
              error="Password is too weak"
              value="123"
            />
          </div>
        </section>

        {/* Disabled States */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Disabled States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              placeholder="Cannot edit"
              label="Disabled Field"
              disabled
              value="This is disabled"
            />
            <PasswordInput
              placeholder="Cannot edit"
              label="Disabled Password"
              disabled
              value="password123"
            />
          </div>
        </section>

        {/* Full Width */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Full Width
          </h2>
          <TextInput
            fullWidth
            placeholder="This input takes full width"
            label="Full Width Input"
            helperText="Useful for single-column layouts"
          />
        </section>

        {/* Real World Example: Login Form */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Real World Example: Login Form
          </h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl max-w-md mx-auto space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-6">
              Login to Your Account
            </h3>
            <TextInput
              type="email"
              placeholder="your@email.com"
              label="Email"
              fullWidth
              leftIcon={<EmailIcon />}
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              fullWidth
              helperText="At least 8 characters"
            />
            <div className="pt-4">
              <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                Login
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
