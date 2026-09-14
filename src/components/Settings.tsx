import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { plateMethod, habitTracker } from '../data/mealPlan';
import { languageNames, languageFlags, Language } from '../i18n/translations';

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();
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

  const languages: Language[] = ['ru', 'en', 'es', 'it', 'fr', 'de'];

  const habitLabels = [t.settings.habits.water, t.settings.habits.sleep, t.settings.habits.movement, t.settings.habits.protein];

  return (
    <div className="px-4 pb-4 pt-2 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">{t.settings.title}</h1>
        <p className="text-gray-500 text-sm mt-1">{t.settings.subtitle}</p>
      </motion.div>

      {/* Language Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-4"
      >
        <h3 className="font-semibold text-gray-800 mb-4">{t.settings.language}</h3>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                language === lang
                  ? 'bg-green-500 text-white shadow-md shadow-green-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span className="text-lg">{languageFlags[lang]}</span>
              <span>{languageNames[lang]}</span>
              {language === lang && <span className="ml-auto">✓</span>}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-4"
      >
        <h3 className="font-semibold text-gray-800 mb-4">{t.settings.profile}</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 font-medium">{t.settings.name}</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={t.settings.namePlaceholder}
              className="w-full mt-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium">{t.settings.weight}</label>
            <input
              type="number"
              value={userWeight}
              onChange={(e) => setUserWeight(e.target.value)}
              placeholder="65"
              className="w-full mt-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium">{t.settings.goal}</label>
            <select
              value={userGoal}
              onChange={(e) => setUserGoal(e.target.value)}
              className="w-full mt-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
            >
              <option value="lose">{t.settings.goals.lose}</option>
              <option value="maintain">{t.settings.goals.maintain}</option>
              <option value="gain">{t.settings.goals.gain}</option>
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
          <h3 className="font-semibold text-gray-800">{t.settings.plateMethod}</h3>
          <button
            onClick={() => setShowPlate(!showPlate)}
            className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full font-medium"
          >
            {showPlate ? t.settings.hide : t.settings.show}
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
                <circle cx="100" cy="100" r="95" fill="#f0f0f0" stroke="#ddd" strokeWidth="2" />
                <path
                  d="M 100 5 A 95 95 0 0 0 100 195 L 100 100 Z"
                  fill={activeSector === 'vegetables' ? '#66BB6A' : plateMethod.vegetables.color}
                  opacity={activeSector === 'vegetables' ? 1 : 0.7}
                  className="cursor-pointer transition-opacity"
                  onMouseEnter={() => setActiveSector('vegetables')}
                  onMouseLeave={() => setActiveSector(null)}
                  onClick={() => setActiveSector(activeSector === 'vegetables' ? null : 'vegetables')}
                />
                <path
                  d="M 100 5 A 95 95 0 0 1 195 100 L 100 100 Z"
                  fill={activeSector === 'protein' ? '#FF8A65' : plateMethod.protein.color}
                  opacity={activeSector === 'protein' ? 1 : 0.7}
                  className="cursor-pointer transition-opacity"
                  onMouseEnter={() => setActiveSector('protein')}
                  onMouseLeave={() => setActiveSector(null)}
                  onClick={() => setActiveSector(activeSector === 'protein' ? null : 'protein')}
                />
                <path
                  d="M 195 100 A 95 95 0 0 1 100 195 L 100 100 Z"
                  fill={activeSector === 'carbs' ? '#FFCA28' : plateMethod.carbs.color}
                  opacity={activeSector === 'carbs' ? 1 : 0.7}
                  className="cursor-pointer transition-opacity"
                  onMouseEnter={() => setActiveSector('carbs')}
                  onMouseLeave={() => setActiveSector(null)}
                  onClick={() => setActiveSector(activeSector === 'carbs' ? null : 'carbs')}
                />
                <text x="55" y="105" textAnchor="middle" className="text-xs fill-white font-medium" fontSize="11">
                  {t.plate.vegetables}
                </text>
                <text x="55" y="120" textAnchor="middle" className="text-xs fill-white font-medium" fontSize="10">
                  50%
                </text>
                <text x="140" y="60" textAnchor="middle" className="text-xs fill-white font-medium" fontSize="11">
                  {t.plate.protein}
                </text>
                <text x="140" y="75" textAnchor="middle" className="text-xs fill-white font-medium" fontSize="10">
                  25%
                </text>
                <text x="140" y="145" textAnchor="middle" className="text-xs fill-white font-medium" fontSize="11">
                  {t.plate.carbs}
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
        <h3 className="font-semibold text-gray-800 mb-3">{t.settings.mealPrepTimer}</h3>
        <p className="text-xs text-gray-500 mb-4">{t.settings.timerDesc}</p>
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
                {t.settings.start}
              </button>
            ) : (
              <button
                onClick={() => setTimerRunning(false)}
                className="px-6 py-2.5 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-colors"
              >
                {t.settings.pause}
              </button>
            )}
            <button
              onClick={resetTimer}
              className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              {t.settings.reset}
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
        <h3 className="font-semibold text-gray-800 mb-4">{t.settings.habitTracker}</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-xs text-gray-500 pb-2 pr-2"></th>
                {habitTracker.days.map(day => (
                  <th key={day} className="text-center text-xs text-gray-500 pb-2 px-1">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habitLabels.map((habitLabel, habitIndex) => (
                <tr key={habitIndex}>
                  <td className="text-xs text-gray-700 py-2 pr-2 whitespace-nowrap">{habitLabel}</td>
                  {habitTracker.days.map(day => {
                    const key = getHabitKey(habitTracker.habits[habitIndex], day);
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
        className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-5 border border-blue-200 mb-4"
      >
        <h3 className="font-semibold text-blue-800 mb-3">{t.settings.mealPrepGuide}</h3>
        <div className="space-y-3">
          <div className="bg-white/70 rounded-xl p-3">
            <p className="text-sm font-medium text-blue-800">{t.settings.guideSteps.planning}</p>
            <p className="text-xs text-blue-600 mt-1">{t.settings.guideSteps.planningDesc}</p>
          </div>
          <div className="bg-white/70 rounded-xl p-3">
            <p className="text-sm font-medium text-blue-800">{t.settings.guideSteps.shopping}</p>
            <p className="text-xs text-blue-600 mt-1">{t.settings.guideSteps.shoppingDesc}</p>
          </div>
          <div className="bg-white/70 rounded-xl p-3">
            <p className="text-sm font-medium text-blue-800">{t.settings.guideSteps.cooking}</p>
            <p className="text-xs text-blue-600 mt-1">{t.settings.guideSteps.cookingDesc}</p>
          </div>
          <div className="bg-white/70 rounded-xl p-3">
            <p className="text-sm font-medium text-blue-800">{t.settings.guideSteps.storage}</p>
            <p className="text-xs text-blue-600 mt-1">{t.settings.guideSteps.storageDesc}</p>
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
        <h3 className="font-semibold text-red-800 mb-2">{t.settings.resetData}</h3>
        <p className="text-xs text-red-600 mb-3">{t.settings.resetDesc}</p>
        <button
          onClick={() => {
            if (confirm(t.settings.confirmDelete)) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
        >
          {t.settings.deleteAll}
        </button>
      </motion.div>
    </div>
  );
}
