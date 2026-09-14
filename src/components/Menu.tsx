import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mealPlan, Meal } from '../data/mealPlan';

interface MenuProps {
  onAddToShopping: (ingredients: string[]) => void;
}

export default function Menu({ onAddToShopping }: MenuProps) {
  const [currentDay, setCurrentDay] = useState(() => {
    return parseInt(localStorage.getItem('currentDay') || '1');
  });
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
  const [cookedMeals, setCookedMeals] = useState<string[]>(() => {
    const saved = localStorage.getItem('cookedMeals');
    return saved ? JSON.parse(saved) : [];
  });
  const [ingredientChecks, setIngredientChecks] = useState<Record<string, boolean>>({});

  const dayPlan = mealPlan[currentDay - 1];
  const mealTypeLabels = {
    breakfast: { label: 'Завтрак', emoji: '🌅', color: 'from-amber-50 to-yellow-50 border-amber-200' },
    lunch: { label: 'Обед', emoji: '☀️', color: 'from-green-50 to-emerald-50 border-green-200' },
    snack: { label: 'Перекус', emoji: '🍎', color: 'from-blue-50 to-sky-50 border-blue-200' },
    dinner: { label: 'Ужин', emoji: '🌙', color: 'from-purple-50 to-indigo-50 border-purple-200' }
  };

  const setDay = (day: number) => {
    setCurrentDay(day);
    localStorage.setItem('currentDay', day.toString());
    setExpandedMeal(null);
  };

  const toggleCooked = (mealId: string) => {
    const newCooked = cookedMeals.includes(mealId)
      ? cookedMeals.filter(id => id !== mealId)
      : [...cookedMeals, mealId];
    setCookedMeals(newCooked);
    localStorage.setItem('cookedMeals', JSON.stringify(newCooked));
  };

  const toggleIngredient = (key: string) => {
    setIngredientChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isCooked = (meal: Meal) => {
    return cookedMeals.includes(`${currentDay}-${meal.type}`);
  };

  return (
    <div className="px-4 pb-4 pt-2 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h1 className="text-2xl font-bold text-gray-800">📅 Меню на неделю</h1>
        <p className="text-gray-500 text-sm mt-1">1600 ккал • 100-120г белка</p>
      </motion.div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 mb-4">
        {mealPlan.map((day) => (
          <motion.button
            key={day.dayNumber}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDay(day.dayNumber)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              currentDay === day.dayNumber
                ? 'bg-green-500 text-white shadow-md shadow-green-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300'
            }`}
          >
            День {day.dayNumber}
          </motion.button>
        ))}
      </div>

      {/* Meals */}
      <div className="space-y-3">
        {dayPlan?.meals.map((meal, index) => {
          const typeInfo = mealTypeLabels[meal.type];
          const mealId = `${currentDay}-${meal.type}`;
          const isExpanded = expandedMeal === mealId;
          const cooked = isCooked(meal);

          return (
            <motion.div
              key={mealId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-r ${typeInfo.color} rounded-2xl border overflow-hidden ${cooked ? 'opacity-75' : ''}`}
            >
              {/* Meal Header */}
              <div
                className="p-4 cursor-pointer"
                onClick={() => setExpandedMeal(isExpanded ? null : mealId)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-3xl">{meal.image}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {typeInfo.emoji} {typeInfo.label}
                      </p>
                      <p className={`font-semibold text-gray-800 truncate ${cooked ? 'line-through' : ''}`}>
                        {meal.title}
                      </p>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                          {meal.calories} ккал
                        </span>
                        <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                          {meal.protein}г белка
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {cooked && (
                      <span className="text-green-500 text-xl">✓</span>
                    )}
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="text-gray-400 text-lg"
                    >
                      ▾
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Expanded Recipe */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 border-t border-white/50">
                      {/* Ingredients */}
                      <div className="mt-3">
                        <h4 className="font-semibold text-gray-700 text-sm mb-2">📝 Ингредиенты:</h4>
                        <div className="space-y-1.5">
                          {meal.ingredients.map((ing, i) => {
                            const key = `${mealId}-ing-${i}`;
                            const checked = ingredientChecks[key];
                            return (
                              <label
                                key={i}
                                className="flex items-center gap-2 cursor-pointer group"
                              >
                                <input
                                  type="checkbox"
                                  checked={checked || false}
                                  onChange={() => toggleIngredient(key)}
                                  className="w-4 h-4 rounded text-green-500"
                                />
                                <span className={`text-sm ${checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                  {ing}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Steps */}
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-700 text-sm mb-2">👩‍🍳 Приготовление:</h4>
                        <div className="space-y-2">
                          {meal.steps.map((step, i) => (
                            <div key={i} className="flex gap-2">
                              <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-700 rounded-full text-xs flex items-center justify-center font-medium">
                                {i + 1}
                              </span>
                              <p className="text-sm text-gray-700">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => onAddToShopping(meal.ingredients)}
                          className="flex-1 py-2.5 bg-white/80 text-gray-700 rounded-xl text-sm font-medium hover:bg-white transition-colors border border-gray-200"
                        >
                          🛒 В список покупок
                        </button>
                        <button
                          onClick={() => toggleCooked(mealId)}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            cooked
                              ? 'bg-gray-100 text-gray-500'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          {cooked ? '✓ Готово' : '👨‍🍳 Приготовил(а)'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Day Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
      >
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Итого за день:</span>
          <div className="flex gap-3">
            <span className="text-sm font-semibold text-green-700">
              {dayPlan?.meals.reduce((s, m) => s + m.calories, 0)} ккал
            </span>
            <span className="text-sm font-semibold text-orange-700">
              {dayPlan?.meals.reduce((s, m) => s + m.protein, 0)}г белка
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
