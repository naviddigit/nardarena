/**
 * Input Demo Page
 * صفحه دمو کامپوننت Input
 */

import { useState } from 'react';
import { TextInput, PasswordInput } from '@shared/components/atoms/Input';
import { EmailIcon } from '@shared/components/atoms/Icon';

const InputDemo = () => {
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
    <div className="space-y-8 p-8 bg-white dark:bg-gray-900 rounded-2xl">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Input Components</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Reusable text and password input components with validation
        </p>
      </div>

      {/* Basic Text Input */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Basic Text Input</h3>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Email with Validation */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Email with Validation</h3>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <p className="text-sm text-gray-500 dark:text-gray-400">
            💡 Fill the left input - validation happens automatically
          </p>
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Password Input</h3>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <p className="text-sm text-gray-500 dark:text-gray-400">
            👁️ Click the eye icon to show/hide password
          </p>
        </div>
      </div>

      {/* Different Input Types */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Different Input Types</h3>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Error States */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Error States</h3>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Disabled States */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Disabled States</h3>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Full Width */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Full Width</h3>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <TextInput
            fullWidth
            placeholder="This input takes full width"
            label="Full Width Input"
            helperText="Useful for single-column layouts"
          />
        </div>
      </div>

      {/* Usage Example */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Usage Example</h3>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white text-center">
            Login Form
          </h4>
          <div className="max-w-md mx-auto space-y-4">
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
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Code Example</h3>
        <pre className="p-4 bg-gray-900 text-green-400 rounded-xl overflow-x-auto text-sm">
{`import { TextInput, PasswordInput } from '@shared/components/atoms/Input';

const [email, setEmail] = useState('');

<TextInput
  type="email"
  placeholder="your@email.com"
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  leftIcon={<EmailIcon />}
/>

<PasswordInput
  placeholder="Password"
  label="Password"
  helperText="At least 8 characters"
/>`}
        </pre>
      </div>

      {/* Props Documentation */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Props</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Default</th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">type</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">string</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">'text'</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Input type (text, email, tel, etc.)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">label</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">string</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Label text</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">error</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">string</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Error message to display</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">helperText</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">string</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Helper text below input</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">leftIcon</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">ReactNode</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Icon on the left side</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">disabled</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">boolean</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">false</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Disable the input</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">fullWidth</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">boolean</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">false</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Take full width of container</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InputDemo;
