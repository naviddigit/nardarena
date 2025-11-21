import { useState } from 'react';
import { Button } from '@shared/components/atoms/Button';
import { EmailIcon, GoogleIcon } from '@shared/components/atoms/Icon';
import { ThemeToggle } from '@shared/components/organisms/ThemeToggle';

/**
 * Button Demo Page
 * 
 * این صفحه تمام حالت‌های Button را نمایش می‌دهد:
 * - تمام variant ها
 * - تمام size ها
 * - با آیکون
 * - Loading state
 * - Disabled state
 * - Full width
 */
export default function ButtonDemo() {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg p-8 transition-colors relative">
      <ThemeToggle />
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Button Component Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            All possible Button states following SOLID principles
          </p>
        </div>

        {/* Variants */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Variants
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="gradient">Gradient</Button>
          </div>
        </section>

        {/* Sizes */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Sizes
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* With Icons */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            With Icons
          </h2>
          <div className="flex flex-wrap gap-4">
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
        </section>

        {/* Loading State */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Loading State
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button isLoading>Loading</Button>
            <Button variant="gradient" isLoading>
              Processing
            </Button>
            <Button 
              isLoading={loading} 
              onClick={handleLoadingClick}
              variant="outline"
            >
              {loading ? 'Loading...' : 'Click Me'}
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            💡 Click the last button - it will show loading for 2 seconds
          </p>
        </section>

        {/* Disabled State */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Disabled State
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button disabled>Disabled</Button>
            <Button disabled variant="gradient">
              Disabled Gradient
            </Button>
            <Button disabled variant="outline" leftIcon={<EmailIcon />}>
              Disabled with Icon
            </Button>
          </div>
        </section>

        {/* Full Width */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Full Width
          </h2>
          <div className="space-y-4">
            <Button fullWidth variant="primary">
              Full Width Primary
            </Button>
            <Button fullWidth variant="gradient" size="lg">
              Full Width Gradient Large
            </Button>
          </div>
        </section>

        {/* Combinations */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Combinations
          </h2>
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
            <Button variant="outline" fullWidth>
              View Details
            </Button>
            <Button variant="ghost" size="sm">
              Learn More
            </Button>
            <Button variant="gradient" leftIcon={<span>🏆</span>}>
              Join Tournament
            </Button>
          </div>
        </section>

        {/* Real World Examples */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Real World Examples
          </h2>
          
          {/* Login Form Example */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Login Form Example
            </h3>
            <Button variant="gradient" fullWidth size="lg">
              Login
            </Button>
            <Button variant="secondary" fullWidth leftIcon={<GoogleIcon />}>
              Sign in with Google
            </Button>
            <div className="flex gap-4">
              <Button variant="ghost" fullWidth>
                Forgot Password?
              </Button>
              <Button variant="outline" fullWidth>
                Register
              </Button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
