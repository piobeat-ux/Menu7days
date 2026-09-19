import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { languageNames, languageFlags, Language } from '../i18n/translations';

interface WelcomeScreenProps {
  onComplete: (name: string) => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const { t, language, setLanguage } = useLanguage();
  const [name, setName] = useState('');
  const [step, setStep] = useState(0);
  const [showLangPicker, setShowLangPicker] = useState(false);

  const slides = [
    t.welcome.slide1,
    t.welcome.slide2,
    t.welcome.slide3
  ];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    }
  };

  const handleStart = () => {
    onComplete(name.trim() || '');
  };

  const languages: Language[] = ['ru', 'en', 'es', 'it', 'fr', 'de'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 flex flex-col items-center justify-center px-6 max-w-lg mx-auto relative">
      {/* Language Picker */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowLangPicker(!showLangPicker)}
          className="flex items-center gap-1 px-3 py-1.5 bg-white/80 backdrop-blur rounded-full border border-gray-200 text-sm shadow-sm"
        >
          <span>{languageFlags[language]}</span>
          <span className="text-xs text-gray-600">{language.toUpperCase()}</span>
        </button>
        {showLangPicker && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-10 right-0 bg-white rounded-xl shadow-lg border border-gray-100 p-2 min-w-[140px] z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setShowLangPicker(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  language === lang ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span>{languageFlags[lang]}</span>
                <span>{languageNames[lang]}</span>
                {language === lang && <span className="ml-auto text-green-500">✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </div>

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
          {step === 0 ? '🥗' : step === 1 ? '💪' : '📱'}
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
                placeholder={t.welcome.namePlaceholder}
                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl text-center text-sm focus:outline-none focus:border-green-400 shadow-sm"
              />
            </div>
            <button
              onClick={handleStart}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-green-200 hover:from-green-600 hover:to-green-700 transition-all"
            >
              {t.welcome.start}
            </button>
          </motion.div>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-green-200 hover:from-green-600 hover:to-green-700 transition-all"
          >
            {t.welcome.next}
          </button>
        )}
        {step < slides.length - 1 && (
          <button
            onClick={handleStart}
            className="w-full py-3 text-gray-400 text-sm hover:text-gray-600 transition-colors"
          >
            {t.welcome.skip}
          </button>
        )}
      </div>
    </div>
  );
}
