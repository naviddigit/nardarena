/**
 * Toggle Demo Page
 * صفحه دمو کامپوننت Toggle
 */

import { useState } from 'react';
import { Toggle } from '@shared/components/atoms/Toggle';

const ToggleDemo = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(true);
  const [checked5, setChecked5] = useState(false);

  return (
    <div className="space-y-8 p-8 bg-white dark:bg-gray-900 rounded-2xl">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Toggle Component</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Reusable toggle/switch component with different sizes and colors
        </p>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Sizes</h3>
        <div className="flex items-center gap-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <Toggle
              checked={checked1}
              onChange={setChecked1}
              size="sm"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Toggle
              checked={checked2}
              onChange={setChecked2}
              size="md"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Medium (Default)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Toggle
              checked={checked3}
              onChange={setChecked3}
              size="lg"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Large</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Colors</h3>
        <div className="flex items-center gap-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <Toggle
              checked={checked2}
              onChange={setChecked2}
              color="green"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Green (Default)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Toggle
              checked={checked4}
              onChange={setChecked4}
              color="purple"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Purple</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Toggle
              checked={checked5}
              onChange={setChecked5}
              color="blue"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Blue</span>
          </div>
        </div>
      </div>

      {/* States */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">States</h3>
        <div className="flex items-center gap-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <Toggle
              checked={false}
              onChange={() => {}}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Unchecked</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Toggle
              checked={true}
              onChange={() => {}}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Checked</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Toggle
              checked={false}
              onChange={() => {}}
              disabled
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Disabled Off</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Toggle
              checked={true}
              onChange={() => {}}
              disabled
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Disabled On</span>
          </div>
        </div>
      </div>

      {/* Usage Example */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Usage Example</h3>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Receive email notifications for new messages
              </p>
            </div>
            <Toggle
              checked={checked1}
              onChange={setChecked1}
              color="green"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Enable push notifications on your device
              </p>
            </div>
            <Toggle
              checked={checked2}
              onChange={setChecked2}
              color="purple"
            />
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Code Example</h3>
        <pre className="p-4 bg-gray-900 text-green-400 rounded-xl overflow-x-auto text-sm">
{`import { Toggle } from '@shared/components/atoms/Toggle';

const [enabled, setEnabled] = useState(false);

<Toggle
  checked={enabled}
  onChange={setEnabled}
  size="md"
  color="green"
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
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">checked</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">boolean</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Toggle state (on/off)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">onChange</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">(checked: boolean) =&gt; void</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Callback when toggled</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">disabled</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">boolean</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">false</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Disable the toggle</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">size</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">'sm' | 'md' | 'lg'</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">'md'</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Size of the toggle</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">color</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">'green' | 'purple' | 'blue'</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">'green'</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Color when checked</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ToggleDemo;
