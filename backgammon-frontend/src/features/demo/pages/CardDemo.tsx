/**
 * Card Demo Page
 * صفحه نمایش کامپوننت کارت
 * 
 * Showcases all Card variants, sizes, and responsive design
 * نمایش همه حالت‌ها، سایزها و طراحی ریسپانسیو
 */

import { Card } from '@shared/components/molecules/Card';
import { Avatar } from '@shared/components/atoms/Avatar';
import { Badge } from '@shared/components/atoms/Badge';
import { Button } from '@shared/components/atoms/Button';
import { Divider } from '@shared/components/atoms/Divider';
import { ThemeToggle } from '@shared/components/organisms/ThemeToggle';

export const CardDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8 relative">
      <ThemeToggle />

      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Header - هدر */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Card Component
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            Versatile card component for displaying grouped content (Fully Responsive)
          </p>
        </div>

        {/* Variants - حالت‌های مختلف */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Variants - حالت‌های مختلف
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="elevated">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Elevated Card</h3>
              <p className="text-sm">Card with shadow effect for depth and separation.</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Outlined Card</h3>
              <p className="text-sm">Card with border for subtle definition.</p>
            </Card>
            <Card variant="filled">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Filled Card</h3>
              <p className="text-sm">Card with filled background for emphasis.</p>
            </Card>
          </div>
        </section>

        {/* Sizes - سایزها */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Sizes - سایزها
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card size="sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Small Card</h3>
              <p className="text-sm">Compact card with minimal padding.</p>
            </Card>
            <Card size="md">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Medium Card</h3>
              <p className="text-sm">Standard card with balanced padding.</p>
            </Card>
            <Card size="lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Large Card</h3>
              <p className="text-sm">Spacious card with generous padding.</p>
            </Card>
          </div>
        </section>

        {/* With Header and Footer */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            With Header and Footer - با هدر و فوتر
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card
              header="Card with Header"
              footer={
                <div className="flex gap-2">
                  <Button size="sm">Action</Button>
                  <Button size="sm" variant="outline">Cancel</Button>
                </div>
              }
            >
              <p>This card includes both a header and footer section for better content organization.</p>
            </Card>
            <Card
              header="User Profile"
              footer={<span className="text-sm text-gray-500 dark:text-gray-400">Last updated: 2 hours ago</span>}
            >
              <div className="flex items-center gap-4">
                <Avatar
                  src="https://i.pravatar.cc/150?img=31"
                  size="lg"
                  status="online"
                  alt="User"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pro Player</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* With Images */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Cards with Images - کارت‌ها با تصویر
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              image="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400"
              imageAlt="Game Board"
              header="Backgammon Tournament"
              footer={
                <div className="flex justify-between items-center">
                  <Badge color="success" size="sm">Live</Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-400">50 players</span>
                </div>
              }
            >
              <p className="text-sm">Join the ultimate backgammon championship and compete with players worldwide.</p>
            </Card>
            <Card
              image="https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=400"
              imageAlt="Board Games"
              header="Weekly Challenge"
              footer={
                <Button size="sm" fullWidth>Join Now</Button>
              }
            >
              <p className="text-sm">Participate in weekly challenges and earn exclusive rewards.</p>
            </Card>
            <Card
              image="https://images.unsplash.com/photo-1606503153255-59d665566d57?w=400"
              imageAlt="Gaming"
              header="Pro Lessons"
              footer={
                <div className="flex items-center gap-2">
                  <Badge color="purple" size="sm" variant="subtle">Premium</Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-400">$49/month</span>
                </div>
              }
            >
              <p className="text-sm">Learn from professional players with exclusive video lessons.</p>
            </Card>
          </div>
        </section>

        {/* Clickable and Hoverable */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Clickable and Hoverable - کلیک‌پذیر و قابل hover
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              clickable
              hoverable
              onClick={() => alert('Card clicked!')}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Clickable Card</h3>
              <p className="text-sm">Click this card to trigger an action. Hover to see the scale effect.</p>
            </Card>
            <Card
              hoverable
              onClick={() => alert('Game details opened!')}
              clickable
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">Active Game</h3>
                <Badge color="success" pulse size="xs">Live</Badge>
              </div>
              <p className="text-sm mb-4">Click to view game details and join the match.</p>
              <div className="flex items-center gap-2">
                <Avatar src="https://i.pravatar.cc/150?img=32" size="sm" alt="Player 1" />
                <span className="text-sm text-gray-600 dark:text-gray-400">vs</span>
                <Avatar src="https://i.pravatar.cc/150?img=33" size="sm" alt="Player 2" />
              </div>
            </Card>
          </div>
        </section>

        {/* Loading State */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Loading State - حالت لودینگ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card loading />
            <Card loading variant="outlined" />
            <Card loading variant="filled" />
          </div>
        </section>

        {/* Real World Examples - Responsive Grid */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Real World Examples - مثال‌های واقعی (Responsive)
          </h2>

          {/* Game Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card
                key={i}
                hoverable
                clickable
                onClick={() => alert(`Game ${i} selected`)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Game #{i}</h3>
                  <Badge color={i % 2 === 0 ? 'success' : 'warning'} size="xs">
                    {i % 2 === 0 ? 'Active' : 'Waiting'}
                  </Badge>
                </div>
                <Divider spacing="sm" />
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Players:</span>
                    <span className="font-medium">2/{i + 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prize:</span>
                    <span className="font-medium text-green-600">${i * 100}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Divider spacing="lg">More Examples</Divider>

          {/* User Stats Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card header="Your Statistics" variant="outlined">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-500">142</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Games</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-green-500">98</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Wins</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-2xl sm:text-3xl font-bold text-blue-500">69%</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Win Rate</p>
                </div>
              </div>
            </Card>

            <Card header="Leaderboard" variant="filled">
              <div className="space-y-3">
                {[1, 2, 3].map((rank) => (
                  <div key={rank} className="flex items-center gap-3">
                    <span className="text-xl font-bold text-gray-400 w-6">#{rank}</span>
                    <Avatar
                      src={`https://i.pravatar.cc/150?img=${30 + rank}`}
                      size="sm"
                      alt={`Rank ${rank}`}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Player {rank}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{1500 - rank * 50} points</p>
                    </div>
                    {rank === 1 && <Badge color="warning" size="xs">👑</Badge>}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CardDemo;
