import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { mealPlan } from '../data/mealPlan';
import { getTranslatedMealTitle } from '../data/mealPlanI18n';

interface DashboardProps {
  onNavigateToMenu: () => void;
}

const motivationalQuotes = {
  ru: [
    "Каждый приём пищи — это шаг к лучшей версии себя 💪",
    "Ты не на диете. Ты заботишься о себе 🌿",
    "Дисциплина — это мост между целями и достижениями 🌉",
    "Маленькие шаги каждый день = большие результаты 🏆",
    "Твоё тело — твой дом. Заботься о нём 🏡",
    "Не идеальность, а последовательность имеет значение ✨",
    "Ты сильнее, чем думаешь 💚",
    "Еда — это топливо, а не враг ⚡",
    "Сегодня ты делаешь выбор, которым завтра будешь гордиться 🌟",
    "Прогресс, а не совершенство 🎯"
  ],
  en: [
    "Every meal is a step towards a better version of yourself 💪",
    "You're not on a diet. You're taking care of yourself 🌿",
    "Discipline is the bridge between goals and achievements 🌉",
    "Small steps every day = big results 🏆",
    "Your body is your home. Take care of it 🏡",
    "Not perfection, but consistency matters ✨",
    "You are stronger than you think 💚",
    "Food is fuel, not the enemy ⚡",
    "Today you make a choice you'll be proud of tomorrow 🌟",
    "Progress, not perfection 🎯"
  ],
  es: [
    "Cada comida es un paso hacia tu mejor versión 💪",
    "No estás a dieta. Te estás cuidando 🌿",
    "La disciplina es el puente entre metas y logros 🌉",
    "Pequeños pasos cada día = grandes resultados 🏆",
    "Tu cuerpo es tu hogar. Cuídalo 🏡",
    "No la perfección, sino la consistencia importa ✨",
    "Eres más fuerte de lo que crees 💚",
    "La comida es combustible, no el enemigo ⚡",
    "Hoy tomas una decisión de la que estarás orgulloso mañana 🌟",
    "Progreso, no perfección 🎯"
  ],
  it: [
    "Ogni pasto è un passo verso la tua versione migliore 💪",
    "Non sei a dieta. Ti stai prendendo cura di te 🌿",
    "La disciplina è il ponte tra obiettivi e risultati 🌉",
    "Piccoli passi ogni giorno = grandi risultati 🏆",
    "Il tuo corpo è la tua casa. Abbi cura di lui 🏡",
    "Non la perfezione, ma la costanza conta ✨",
    "Sei più forte di quanto pensi 💚",
    "Il cibo è carburante, non il nemico ⚡",
    "Oggi fai una scelta di cui sarai orgoglioso domani 🌟",
    "Progresso, non perfezione 🎯"
  ],
  fr: [
    "Chaque repas est un pas vers ta meilleure version 💪",
    "Tu n'es pas au régime. Tu prends soin de toi 🌿",
    "La discipline est le pont entre les objectifs et les résultats 🌉",
    "De petits pas chaque jour = de grands résultats 🏆",
    "Ton corps est ta maison. Prends-en soin 🏡",
    "Pas la perfection, mais la constance compte ✨",
    "Tu es plus fort(e) que tu ne le penses 💚",
    "La nourriture est du carburant, pas l'ennemi ⚡",
    "Aujourd'hui tu fais un choix dont tu seras fier(e) demain 🌟",
    "Le progrès, pas la perfection 🎯"
  ],
  de: [
    "Jede Mahlzeit ist ein Schritt zu deiner besten Version 💪",
    "Du bist nicht auf Diät. Du kümmerst dich um dich 🌿",
    "Disziplin ist die Brücke zwischen Zielen und Ergebnissen 🌉",
    "Kleine Schritte jeden Tag = große Ergebnisse 🏆",
    "Dein Körper ist dein Zuhause. Pass gut auf ihn auf 🏡",
    "Nicht Perfektion, sondern Konsequenz zählt ✨",
    "Du bist stärker als du denkst 💚",
    "Essen ist Treibstoff, nicht der Feind ⚡",
    "Heute triffst du eine Wahl, auf die du morgen stolz sein wirst 🌟",
    "Fortschritt, nicht Perfektion 🎯"
  ]
};

export default function Dashboard({ onNavigateToMenu }: DashboardProps) {
  const { t, language } = useLanguage();
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
    if (hour < 12) setGreeting(t.dashboard.greeting.morning);
    else if (hour < 18) setGreeting(t.dashboard.greeting.day);
    else setGreeting(t.dashboard.greeting.evening);

    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const quotes = motivationalQuotes[language];
    setQuote(quotes[dayOfYear % quotes.length]);
  }, [t, language]);

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
        <p className="text-gray-500 mt-1">
          {t.dashboard.dayOf.replace('{n}', currentDay.toString())}
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200"
        >
          <p className="text-xs text-green-600 font-medium">{t.dashboard.caloriesToday}</p>
          <p className="text-2xl font-bold text-green-800 mt-1">{totalCalories}</p>
          <p className="text-xs text-green-600">{t.common.kcal}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200"
        >
          <p className="text-xs text-orange-600 font-medium">{t.dashboard.proteinToday}</p>
          <p className="text-2xl font-bold text-orange-800 mt-1">{totalProtein}г</p>
          <p className="text-xs text-orange-600">{t.dashboard.goal}</p>
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
          <h3 className="font-semibold text-gray-800">{t.dashboard.waterTracker}</h3>
          <span className="text-sm text-gray-500">
            {t.dashboard.glasses.replace('{n}', waterCount.toString())}
          </span>
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
            {t.dashboard.done}
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
          <h3 className="font-semibold text-gray-800">{t.dashboard.proteinDay}</h3>
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
            {t.dashboard.snack}
          </button>
          <button
            onClick={() => addProtein(30)}
            className="flex-1 py-2 bg-orange-50 text-orange-600 rounded-xl text-sm font-medium hover:bg-orange-100 transition-colors"
          >
            {t.dashboard.main}
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
          <h3 className="font-semibold text-gray-800">{t.dashboard.whatToday}</h3>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            {t.menu.day} {currentDay}
          </span>
        </div>
        <div className="space-y-2">
          {todayMeals.map((meal, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
              <span className="text-2xl">{meal.image}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {getTranslatedMealTitle(currentDay, meal.type, language)}
                </p>
                <p className="text-xs text-gray-500">{meal.calories} {t.common.kcal} • {meal.protein}г {t.common.protein}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onNavigateToMenu}
          className="w-full mt-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-sm"
        >
          {t.dashboard.openMenu}
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
