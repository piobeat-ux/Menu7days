import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { motivationalQuotes, mealPlan } from '../data/mealPlan';

interface DashboardProps {
  onNavigateToMenu: () => void;
}

export default function Dashboard({ onNavigateToMenu }: DashboardProps) {
  const [waterCount, setWaterCount] = useState(() => {
    const saved = localStorage.getItem('waterCount');
    return saved ? parseInt(saved) : 0;
  });
  const [proteinProgress, setProteinProgress] = useState(() => {
    const saved = localStorage.getItem('proteinProgress');
    return saved ? parseInt(saved) : 0;
  });
  const [quote, setQuote] = useState('');
  const [greeting, setGreeting] = useState('');

  const currentDay = parseInt(localStorage.getItem('currentDay') || '1');
  const todayMeals = mealPlan[currentDay - 1]?.meals || [];
  const totalProtein = todayMeals.reduce((sum, m) => sum + m.protein, 0);
  const totalCalories = todayMeals.reduce((sum, m) => sum + m.calories, 0);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Доброе утро');
    else if (hour < 18) setGreeting('Добрый день');
    else setGreeting('Добрый вечер');

    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setQuote(motivationalQuotes[dayOfYear % motivationalQuotes.length]);
  }, []);

  useEffect(() => {
    localStorage.setItem('waterCount', waterCount.toString());
  }, [waterCount]);

  useEffect(() => {
    localStorage.setItem('proteinProgress', proteinProgress.toString());
  }, [proteinProgress]);

  const addWater = () => {
    if (waterCount < 8) setWaterCount(prev => prev + 1);
  };

  const removeWater = () => {
    if (waterCount > 0) setWaterCount(prev => prev - 1);
  };

  const addProtein = (amount: number) => {
    setProteinProgress(prev => Math.min(prev + amount, 120));
  };

  return (
    <div className="px-4 pb-4 pt-2 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">
          {greeting}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Сегодня День {currentDay} из 7</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200"
        >
          <p className="text-xs text-green-600 font-medium">Калории сегодня</p>
          <p className="text-2xl font-bold text-green-800 mt-1">{totalCalories}</p>
          <p className="text-xs text-green-600">ккал</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200"
        >
          <p className="text-xs text-orange-600 font-medium">Белок сегодня</p>
          <p className="text-2xl font-bold text-orange-800 mt-1">{totalProtein}г</p>
          <p className="text-xs text-orange-600">цель: 100-120г</p>
        </motion.div>
      </div>

      {/* Water Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">💧 Трекер воды</h3>
          <span className="text-sm text-gray-500">{waterCount}/8 стаканов</span>
        </div>
        <div className="flex gap-2 justify-center flex-wrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.85 }}
              onClick={() => i < waterCount ? removeWater() : addWater()}
              className={`relative w-10 h-14 rounded-lg border-2 transition-all duration-300 overflow-hidden ${
                i < waterCount
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {i < waterCount && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400 to-blue-300 rounded-b-md"
                />
              )}
              <span className="relative z-10 text-lg">
                {i < waterCount ? '💧' : '🥛'}
              </span>
            </motion.button>
          ))}
        </div>
        {waterCount === 8 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-green-600 text-sm mt-3 font-medium"
          >
            🎉 Отлично! Норма выполнена!
          </motion.p>
        )}
      </motion.div>

      {/* Protein Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">🥩 Белок за день</h3>
          <span className="text-sm text-gray-500">{proteinProgress}/120г</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-4 mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((proteinProgress / 120) * 100, 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => addProtein(15)}
            className="flex-1 py-2 bg-orange-50 text-orange-600 rounded-xl text-sm font-medium hover:bg-orange-100 transition-colors"
          >
            +15г (перекус)
          </button>
          <button
            onClick={() => addProtein(30)}
            className="flex-1 py-2 bg-orange-50 text-orange-600 rounded-xl text-sm font-medium hover:bg-orange-100 transition-colors"
          >
            +30г (осн.)
          </button>
          <button
            onClick={() => setProteinProgress(0)}
            className="py-2 px-3 bg-gray-50 text-gray-500 rounded-xl text-sm hover:bg-gray-100 transition-colors"
          >
            ↺
          </button>
        </div>
      </motion.div>

      {/* Today's Menu Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">🍽️ Что ем сегодня</h3>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">День {currentDay}</span>
        </div>
        <div className="space-y-2">
          {todayMeals.map((meal, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
              <span className="text-2xl">{meal.image}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{meal.title}</p>
                <p className="text-xs text-gray-500">{meal.calories} ккал • {meal.protein}г белка</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onNavigateToMenu}
          className="w-full mt-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-sm"
        >
          Открыть полное меню →
        </button>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100"
      >
        <p className="text-sm text-gray-700 italic text-center leading-relaxed">
          "{quote}"
        </p>
      </motion.div>
    </div>
  );
}
