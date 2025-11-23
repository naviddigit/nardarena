/**
 * Button Demo Page
 * صفحه دمو کامپوننت Button
 */

import { useState } from 'react';
import { Button } from '@shared/components/atoms/Button';
import { EmailIcon, GoogleIcon } from '@shared/components/atoms/Icon';

const ButtonDemo = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-8 p-8 bg-white dark:bg-gray-900 rounded-2xl">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Button Component</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Reusable button component with different variants, sizes, and states
        </p>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Variants</h3>
        <div className="flex flex-wrap gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="gradient">Gradient</Button>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Sizes</h3>
        <div className="flex flex-wrap gap-4 items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <Button size="sm">Small</Button>
          <Button size="md">Medium (Default)</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      {/* With Icons */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">With Icons</h3>
        <div className="flex flex-wrap gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <Button leftIcon={<EmailIcon />}>
            Email
          </Button>
          <Button rightIcon={<span>→</span>} variant="outline">
            Next
          </Button>
          <Button 
            leftIcon={<GoogleIcon />}
            variant="secondary"
          >
            Sign in with Google
          </Button>
          <Button 
            leftIcon={<span>🎮</span>} 
            rightIcon={<span>▶</span>}
            variant="gradient"
            size="lg"
          >
            Start Game
          </Button>
        </div>
      </div>

      {/* Loading State */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Loading State</h3>
        <div className="flex flex-wrap gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <Button isLoading>Loading</Button>
          <Button variant="gradient" isLoading>
            Processing
          </Button>
          <Button 
            isLoading={loading} 
            onClick={handleLoadingClick}
            variant="outline"
          >
            {loading ? 'Loading...' : 'Click Me (2s)'}
          </Button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 px-6">
          💡 Click the last button - it will show loading for 2 seconds
        </p>
      </div>

      {/* Disabled State */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Disabled State</h3>
        <div className="flex flex-wrap gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <Button disabled>Disabled Primary</Button>
          <Button disabled variant="gradient">
            Disabled Gradient
          </Button>
          <Button disabled variant="outline" leftIcon={<EmailIcon />}>
            Disabled with Icon
          </Button>
          <Button disabled variant="secondary">
            Disabled Secondary
          </Button>
        </div>
      </div>

      {/* Full Width */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Full Width</h3>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-4">
          <Button fullWidth variant="primary">
            Full Width Primary
          </Button>
          <Button fullWidth variant="gradient" size="lg">
            Full Width Gradient Large
          </Button>
          <Button fullWidth variant="outline">
            Full Width Outline
          </Button>
        </div>
      </div>

      {/* Combinations */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Combinations</h3>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="primary" size="sm" leftIcon={<span>💰</span>}>
              Deposit
            </Button>
            <Button variant="secondary" size="md">
              Cancel
            </Button>
            <Button variant="gradient" size="lg" rightIcon={<span>→</span>}>
              Continue
            </Button>
            <Button variant="outline" leftIcon={<EmailIcon />}>
              Email Support
            </Button>
            <Button variant="ghost" size="sm">
              Learn More
            </Button>
            <Button variant="gradient" leftIcon={<span>🏆</span>}>
              Join Tournament
            </Button>
          </div>
        </div>
      </div>

      {/* Usage Example */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Usage Example</h3>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white text-center mb-4">
            Login Form Buttons
          </h4>
          <div className="max-w-md mx-auto space-y-3">
            <Button variant="gradient" fullWidth size="lg">
              Login
            </Button>
            <Button variant="secondary" fullWidth leftIcon={<GoogleIcon />}>
              Sign in with Google
            </Button>
            <div className="flex gap-3">
              <Button variant="ghost" fullWidth size="sm">
                Forgot Password?
              </Button>
              <Button variant="outline" fullWidth size="sm">
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Code Example</h3>
        <pre className="p-4 bg-gray-900 text-green-400 rounded-xl overflow-x-auto text-sm">
{`import { Button } from '@shared/components/atoms/Button';

<Button 
  variant="gradient"
  size="lg"
  leftIcon={<Icon />}
  isLoading={loading}
  onClick={handleClick}
>
  Click Me
</Button>`}
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
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">variant</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">'primary'</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Button style variant</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">size</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">'sm' | 'md' | 'lg'</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">'md'</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Button size</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">leftIcon</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">ReactNode</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Icon on the left side</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">rightIcon</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">ReactNode</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Icon on the right side</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">isLoading</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">boolean</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">false</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Show loading spinner</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">disabled</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">boolean</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">false</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Disable the button</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">fullWidth</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">boolean</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">false</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Take full width of container</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">onClick</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">() =&gt; void</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Click handler</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo;
