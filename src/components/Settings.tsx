import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { plateMethod, habitTracker } from '../data/mealPlan';

export default function Settings() {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || '';
  });
  const [userWeight, setUserWeight] = useState(() => {
    return localStorage.getItem('userWeight') || '';
  });
  const [userGoal, setUserGoal] = useState(() => {
    return localStorage.getItem('userGoal') || 'maintain';
  });
  const [habits, setHabits] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : {};
  });
  const [showPlate, setShowPlate] = useState(false);
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [mealPrepTimer, setMealPrepTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('userWeight', userWeight);
  }, [userWeight]);

  useEffect(() => {
    localStorage.setItem('userGoal', userGoal);
  }, [userGoal]);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning) {
      interval = setInterval(() => {
        setMealPrepTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const toggleHabit = (key: string) => {
    setHabits(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setMealPrepTimer(0);
  };

  const getHabitKey = (habit: string, day: string) => `${habit}-${day}`;

  return (
    <div className="px-4 pb-4 pt-2 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">⚙️ Настройки и обучение</h1>
        <p className="text-gray-500 text-sm mt-1">Персонализация и полезные гайды</p>
      </motion.div>

      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-4"
      >
        <h3 className="font-semibold text-gray-800 mb-4">👤 Профиль</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 font-medium">Имя</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Как тебя зовут?"
              className="w-full mt-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium">Текущий вес (кг)</label>
            <input
              type="number"
              value={userWeight}
              onChange={(e) => setUserWeight(e.target.value)}
              placeholder="65"
              className="w-full mt-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium">Цель</label>
            <select
              value={userGoal}
              onChange={(e) => setUserGoal(e.target.value)}
              className="w-full mt-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
            >
              <option value="lose">Снижение веса</option>
              <option value="maintain">Поддержание формы</option>
              <option value="gain">Набор мышечной массы</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Plate Method */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-4"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">🍽️ Метод тарелки</h3>
          <button
            onClick={() => setShowPlate(!showPlate)}
            className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full font-medium"
          >
            {showPlate ? 'Скрыть' : 'Показать'}
          </button>
        </div>

        {showPlate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            {/* Interactive Plate */}
            <div className="relative w-56 h-56 mx-auto mb-4">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Plate circle */}
                <circle cx="100" cy="100" r="95" fill="#f0f0f0" stroke="#ddd" strokeWidth="2" />

                {/* Vegetables - 50% (left half) */}
                <path
                  d="M 100 5 A 95 95 0 0 0 100 195 L 100 100 Z"
                  fill={activeSector === 'vegetables' ? '#66BB6A' : plateMethod.vegetables.color}
                  opacity={activeSector === 'vegetables' ? 1 : 0.7}
                  className="cursor-pointer transition-opacity"
                  onMouseEnter={() => setActiveSector('vegetables')}
                  onMouseLeave={() => setActiveSector(null)}
                  onClick={() => setActiveSector(activeSector === 'vegetables' ? null : 'vegetables')}
                />

                {/* Protein - 25% (top right) */}
                <path
                  d="M 100 5 A 95 95 0 0 1 195 100 L 100 100 Z"
                  fill={activeSector === 'protein' ? '#FF8A65' : plateMethod.protein.color}
                  opacity={activeSector === 'protein' ? 1 : 0.7}
                  className="cursor-pointer transition-opacity"
                  onMouseEnter={() => setActiveSector('protein')}
                  onMouseLeave={() => setActiveSector(null)}
                  onClick={() => setActiveSector(activeSector === 'protein' ? null : 'protein')}
                />

                {/* Carbs - 25% (bottom right) */}
                <path
                  d="M 195 100 A 95 95 0 0 1 100 195 L 100 100 Z"
                  fill={activeSector === 'carbs' ? '#FFCA28' : plateMethod.carbs.color}
                  opacity={activeSector === 'carbs' ? 1 : 0.7}
                  className="cursor-pointer transition-opacity"
                  onMouseEnter={() => setActiveSector('carbs')}
                  onMouseLeave={() => setActiveSector(null)}
                  onClick={() => setActiveSector(activeSector === 'carbs' ? null : 'carbs')}
                />

                {/* Labels */}
                <text x="55" y="105" textAnchor="middle" className="text-xs fill-white font-medium" fontSize="11">
                  Овощи
                </text>
                <text x="55" y="120" textAnchor="middle" className="text-xs fill-white font-medium" fontSize="10">
                  50%
                </text>
                <text x="140" y="60" textAnchor="middle" className="text-xs fill-white font-medium" fontSize="11">
                  Белок
                </text>
                <text x="140" y="75" textAnchor="middle" className="text-xs fill-white font-medium" fontSize="10">
                  25%
                </text>
                <text x="140" y="145" textAnchor="middle" className="text-xs fill-white font-medium" fontSize="11">
                  Углеводы
                </text>
                <text x="140" y="160" textAnchor="middle" className="text-xs fill-white font-medium" fontSize="10">
                  25%
                </text>
              </svg>
            </div>

            {/* Active Sector Info */}
            {activeSector && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-xl p-3 mb-3"
              >
                <p className="font-medium text-gray-800 text-sm">
                  {plateMethod[activeSector as keyof typeof plateMethod].label}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {plateMethod[activeSector as keyof typeof plateMethod].examples}
                </p>
              </motion.div>
            )}

            {/* Legend */}
            <div className="flex justify-center gap-4">
              {Object.entries(plateMethod).map(([key, value]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: value.color }} />
                  <span className="text-xs text-gray-600">{value.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Meal Prep Timer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-4"
      >
        <h3 className="font-semibold text-gray-800 mb-3">⏱️ Meal Prep Таймер</h3>
        <p className="text-xs text-gray-500 mb-4">Отслеживай время готовки</p>
        <div className="text-center">
          <p className="text-4xl font-mono font-bold text-gray-800 mb-4">
            {formatTime(mealPrepTimer)}
          </p>
          <div className="flex gap-2 justify-center">
            {!timerRunning ? (
              <button
                onClick={() => setTimerRunning(true)}
                className="px-6 py-2.5 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
              >
                ▶ Старт
              </button>
            ) : (
              <button
                onClick={() => setTimerRunning(false)}
                className="px-6 py-2.5 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-colors"
              >
                ⏸ Пауза
              </button>
            )}
            <button
              onClick={resetTimer}
              className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              ↺ Сброс
            </button>
          </div>
        </div>
      </motion.div>

      {/* Habit Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-4"
      >
        <h3 className="font-semibold text-gray-800 mb-4">📊 Трекер привычек</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-xs text-gray-500 pb-2 pr-2">Привычка</th>
                {habitTracker.days.map(day => (
                  <th key={day} className="text-center text-xs text-gray-500 pb-2 px-1">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habitTracker.habits.map(habit => (
                <tr key={habit}>
                  <td className="text-xs text-gray-700 py-2 pr-2 whitespace-nowrap">{habit}</td>
                  {habitTracker.days.map(day => {
                    const key = getHabitKey(habit, day);
                    const done = habits[key];
                    return (
                      <td key={day} className="text-center py-2 px-1">
                        <button
                          onClick={() => toggleHabit(key)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                            done
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          {done ? '✓' : ''}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Meal Prep Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-sky to-blue-50 rounded-2xl p-5 border border-blue-200 mb-4"
      >
        <h3 className="font-semibold text-blue-800 mb-3">📖 Meal Prep Гайд</h3>
        <div className="space-y-3">
          <div className="bg-white/70 rounded-xl p-3">
            <p className="text-sm font-medium text-blue-800">🕐 Воскресенье — Планирование</p>
            <p className="text-xs text-blue-600 mt-1">Составь меню, проверь запасы, напиши список покупок</p>
          </div>
          <div className="bg-white/70 rounded-xl p-3">
            <p className="text-sm font-medium text-blue-800">🛒 Понедельник — Закупка</p>
            <p className="text-xs text-blue-600 mt-1">Купи все продукты на неделю за один раз</p>
          </div>
          <div className="bg-white/70 rounded-xl p-3">
            <p className="text-sm font-medium text-blue-800">👩‍🍳 Среда — Большая готовка</p>
            <p className="text-xs text-blue-600 mt-1">Приготовь основу: крупы, запечённое мясо, нарезанные овощи</p>
          </div>
          <div className="bg-white/70 rounded-xl p-3">
            <p className="text-sm font-medium text-blue-800">📦 Хранение</p>
            <p className="text-xs text-blue-600 mt-1">Используй контейнеры, подписывай даты. Готовая еда — 3 дня в холодильнике</p>
          </div>
        </div>
      </motion.div>

      {/* Reset Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-red-50 rounded-2xl p-5 border border-red-200"
      >
        <h3 className="font-semibold text-red-800 mb-2">⚠️ Сброс данных</h3>
        <p className="text-xs text-red-600 mb-3">Удалить весь прогресс и настройки</p>
        <button
          onClick={() => {
            if (confirm('Точно удалить все данные? Это действие необратимо.')) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
        >
          Удалить все данные
        </button>
      </motion.div>
    </div>
  );
}
