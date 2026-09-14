import { useState } from 'react';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onComplete: (name: string) => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [name, setName] = useState('');
  const [step, setStep] = useState(0);

  const slides = [
    {
      emoji: '🥗',
      title: 'Сытая Неделя',
      subtitle: '1600 ккал в день',
      description: '7 дней вкусного и сбалансированного питания с рецептами'
    },
    {
      emoji: '💪',
      title: '100-120г белка',
      subtitle: 'Каждый день',
      description: 'Достаточное количество белка для здоровья и сытости'
    },
    {
      emoji: '📱',
      title: 'Всё в одном месте',
      subtitle: 'Удобно и просто',
      description: 'Меню, список покупок, рецепты и поддержка — в одном приложении'
    }
  ];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    }
  };

  const handleStart = () => {
    onComplete(name.trim() || 'Друг');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 flex flex-col items-center justify-center px-6 max-w-lg mx-auto">
      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step ? 'w-8 bg-green-500' : 'w-2 bg-green-200'
            }`}
          />
        ))}
      </div>

      {/* Slide Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
        className="text-center flex-1 flex flex-col items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-7xl mb-6"
        >
          {slides[step].emoji}
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {slides[step].title}
        </h1>
        <p className="text-lg text-green-600 font-medium mb-3">
          {slides[step].subtitle}
        </p>
        <p className="text-gray-500 text-center max-w-xs">
          {slides[step].description}
        </p>
      </motion.div>

      {/* Bottom Section */}
      <div className="w-full space-y-3 pb-8">
        {step === slides.length - 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как тебя зовут? (необязательно)"
                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl text-center text-sm focus:outline-none focus:border-green-400 shadow-sm"
              />
            </div>
            <button
              onClick={handleStart}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-green-200 hover:from-green-600 hover:to-green-700 transition-all"
            >
              Начать 🚀
            </button>
          </motion.div>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-green-200 hover:from-green-600 hover:to-green-700 transition-all"
          >
            Далее →
          </button>
        )}
        {step < slides.length - 1 && (
          <button
            onClick={handleStart}
            className="w-full py-3 text-gray-400 text-sm hover:text-gray-600 transition-colors"
          >
            Пропустить
          </button>
        )}
      </div>
    </div>
  );
}
