import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { desserts, sosTips } from '../data/mealPlan';

export default function SosMode() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [randomTip, setRandomTip] = useState<string | null>(null);
  const [emotionalAnswers, setEmotionalAnswers] = useState<Record<number, string>>({});
  const [likedDesserts, setLikedDesserts] = useState<number[]>(() => {
    const saved = localStorage.getItem('likedDesserts');
    return saved ? JSON.parse(saved) : [];
  });
  const [expandedDessert, setExpandedDessert] = useState<number | null>(null);
  const [breathingActive, setBreathingActive] = useState(false);

  const getRandomTip = () => {
    const tips = sosTips.sweetCraving;
    const randomIndex = Math.floor(Math.random() * tips.length);
    setRandomTip(tips[randomIndex]);
  };

  const toggleLike = (id: number) => {
    const newLiked = likedDesserts.includes(id)
      ? likedDesserts.filter(d => d !== id)
      : [...likedDesserts, id];
    setLikedDesserts(newLiked);
    localStorage.setItem('likedDesserts', JSON.stringify(newLiked));
  };

  const answerEmotional = (index: number, answer: string) => {
    setEmotionalAnswers(prev => ({ ...prev, [index]: answer }));
  };

  return (
    <div className="px-4 pb-4 pt-2 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">🆘 Аптечка от срывов</h1>
        <p className="text-gray-500 text-sm mt-1">Помощь в трудные моменты</p>
      </motion.div>

      {/* Breathing Exercise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-lavender to-purple-50 rounded-2xl p-5 border border-purple-200 mb-4"
      >
        <h3 className="font-semibold text-purple-800 mb-2">🧘 Дыхательная практика</h3>
        <p className="text-sm text-purple-600 mb-3">4-7-8: вдох 4 сек, задержка 7 сек, выдох 8 сек</p>
        {breathingActive ? (
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                scale: [1, 1.3, 1.3, 1],
                opacity: [0.7, 1, 1, 0.7]
              }}
              transition={{
                duration: 19,
                repeat: Infinity,
                times: [0, 0.21, 0.58, 1]
              }}
              className="w-20 h-20 rounded-full bg-purple-300 flex items-center justify-center"
            >
              <span className="text-3xl">🫁</span>
            </motion.div>
            <button
              onClick={() => setBreathingActive(false)}
              className="mt-3 px-4 py-2 bg-purple-200 text-purple-700 rounded-xl text-sm font-medium"
            >
              Остановить
            </button>
          </div>
        ) : (
          <button
            onClick={() => setBreathingActive(true)}
            className="w-full py-3 bg-purple-200 text-purple-700 rounded-xl font-medium hover:bg-purple-300 transition-colors"
          >
            Начать практику
          </button>
        )}
      </motion.div>

      {/* SOS Buttons */}
      <div className="grid grid-cols-1 gap-3 mb-4">
        {/* Sweet Craving */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
        >
          <button
            onClick={() => setActiveSection(activeSection === 'sweet' ? null : 'sweet')}
            className="w-full text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍬</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Хочу сладкого прямо сейчас!</p>
                <p className="text-xs text-gray-500">Быстрые советы и альтернативы</p>
              </div>
              <motion.span
                animate={{ rotate: activeSection === 'sweet' ? 180 : 0 }}
                className="text-gray-400"
              >
                ▾
              </motion.span>
            </div>
          </button>

          <AnimatePresence>
            {activeSection === 'sweet' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={getRandomTip}
                    className="w-full py-2.5 bg-pink-50 text-pink-600 rounded-xl text-sm font-medium hover:bg-pink-100 transition-colors mb-3"
                  >
                    🎲 Случайный совет
                  </button>
                  {randomTip && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-pink-50 rounded-xl p-3 mb-3"
                    >
                      <p className="text-sm text-pink-700">{randomTip}</p>
                    </motion.div>
                  )}
                  <div className="space-y-2">
                    {sosTips.sweetCraving.map((tip, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <p className="text-sm text-gray-600">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Emotional Hunger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
        >
          <button
            onClick={() => setActiveSection(activeSection === 'emotional' ? null : 'emotional')}
            className="w-full text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💭</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Эмоциональный голод</p>
                <p className="text-xs text-gray-500">Разберись в своих чувствах</p>
              </div>
              <motion.span
                animate={{ rotate: activeSection === 'emotional' ? 180 : 0 }}
                className="text-gray-400"
              >
                ▾
              </motion.span>
            </div>
          </button>

          <AnimatePresence>
            {activeSection === 'emotional' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
                  {sosTips.emotionalHunger.map((item, i) => (
                    <div key={i} className="bg-blue-50 rounded-xl p-3">
                      <p className="text-sm font-medium text-blue-800 mb-2">{item.question}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => answerEmotional(i, 'yes')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            emotionalAnswers[i] === 'yes'
                              ? 'bg-blue-500 text-white'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                        >
                          Да
                        </button>
                        <button
                          onClick={() => answerEmotional(i, 'no')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            emotionalAnswers[i] === 'no'
                              ? 'bg-blue-500 text-white'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                        >
                          Нет
                        </button>
                      </div>
                      {emotionalAnswers[i] && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-blue-600 mt-2"
                        >
                          💡 {item.answer}
                        </motion.p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Weight Stall */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
        >
          <button
            onClick={() => setActiveSection(activeSection === 'weight' ? null : 'weight')}
            className="w-full text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚖️</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Почему вес стоит?</p>
                <p className="text-xs text-gray-500">Объяснения и поддержка</p>
              </div>
              <motion.span
                animate={{ rotate: activeSection === 'weight' ? 180 : 0 }}
                className="text-gray-400"
              >
                ▾
              </motion.span>
            </div>
          </button>

          <AnimatePresence>
            {activeSection === 'weight' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
                  {sosTips.weightStall.map((tip, i) => (
                    <div key={i} className="bg-amber-50 rounded-xl p-3 border-l-4 border-amber-400">
                      <p className="text-sm text-amber-800">{tip}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bonus Desserts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="font-bold text-gray-800 text-lg mb-3">🍰 Бонусные десерты</h2>
        <div className="space-y-3">
          {desserts.map((dessert, index) => (
            <motion.div
              key={dessert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{dessert.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{dessert.title}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">
                      {dessert.calories} ккал
                    </span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                      {dessert.protein}г белка
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLike(dessert.id)}
                    className={`text-xl transition-transform ${likedDesserts.includes(dessert.id) ? 'scale-110' : ''}`}
                  >
                    {likedDesserts.includes(dessert.id) ? '❤️' : '🤍'}
                  </button>
                  <button
                    onClick={() => setExpandedDessert(expandedDessert === dessert.id ? null : dessert.id)}
                    className="text-gray-400"
                  >
                    ▾
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {expandedDessert === dessert.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Ингредиенты:</h4>
                      <div className="space-y-1 mb-3">
                        {dessert.ingredients.map((ing, i) => (
                          <p key={i} className="text-sm text-gray-700">• {ing}</p>
                        ))}
                      </div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Приготовление:</h4>
                      <div className="space-y-1.5">
                        {dessert.steps.map((step, i) => (
                          <div key={i} className="flex gap-2">
                            <span className="w-4 h-4 bg-pink-100 text-pink-700 rounded-full text-xs flex items-center justify-center flex-shrink-0">
                              {i + 1}
                            </span>
                            <p className="text-sm text-gray-700">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
