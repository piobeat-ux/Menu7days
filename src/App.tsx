import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';
import Menu from './components/Menu';
import ShoppingList from './components/ShoppingList';
import SosMode from './components/SosMode';
import Settings from './components/Settings';
import WelcomeScreen from './components/WelcomeScreen';

type Tab = 'home' | 'menu' | 'shopping' | 'sos' | 'settings';

const tabs: { id: Tab; label: string; emoji: string }[] = [
  { id: 'home', label: 'Главная', emoji: '🏠' },
  { id: 'menu', label: 'Меню', emoji: '📅' },
  { id: 'shopping', label: 'Покупки', emoji: '🛒' },
  { id: 'sos', label: 'SOS', emoji: '🆘' },
  { id: 'settings', label: 'Ещё', emoji: '⚙️' }
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [shoppingNewItems, setShoppingNewItems] = useState<string[]>([]);
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('onboardingComplete');
  });

  const handleWelcomeComplete = (name: string) => {
    localStorage.setItem('onboardingComplete', 'true');
    localStorage.setItem('userName', name);
    setShowWelcome(false);
  };

  const handleAddToShopping = (ingredients: string[]) => {
    setShoppingNewItems(prev => [...prev, ...ingredients]);
    setActiveTab('shopping');
  };

  const handleClearNewItems = () => {
    setShoppingNewItems([]);
  };

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard onNavigateToMenu={() => setActiveTab('menu')} />;
      case 'menu':
        return <Menu onAddToShopping={handleAddToShopping} />;
      case 'shopping':
        return <ShoppingList newItems={shoppingNewItems} onClearNewItems={handleClearNewItems} />;
      case 'sos':
        return <SosMode />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col max-w-lg mx-auto relative">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 scrollbar-hide pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/95 backdrop-blur-lg border-t border-gray-100 z-50 safe-bottom">
        <div className="flex items-center justify-around px-2 pt-2 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'text-green-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <motion.span
                animate={{ scale: activeTab === tab.id ? 1.15 : 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-xl mb-0.5"
              >
                {tab.emoji}
              </motion.span>
              <span className={`text-[10px] font-medium ${
                activeTab === tab.id ? 'text-green-600' : 'text-gray-400'
              }`}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute -top-0.5 w-8 h-0.5 bg-green-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default App;
