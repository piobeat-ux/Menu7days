import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { desserts } from '../data/mealPlan';

const sosTips = {
  sweetCraving: {
    ru: [
      "Выпей стакан тёплой воды с лимоном — часто жажда маскируется под тягу к сладкому",
      "Съешь горсть ягод — натуральная сладость удовлетворит потребность",
      "Почисти зубы мятной пастой — это «закроет» желание сладкого",
      "Сделай 10 приседаний — эндорфины заменят дофамин от сахара"
    ],
    en: [
      "Drink a glass of warm water with lemon — thirst often masks as sweet cravings",
      "Eat a handful of berries — natural sweetness will satisfy the need",
      "Brush your teeth with mint toothpaste — it will 'close' the sweet desire",
      "Do 10 squats — endorphins will replace dopamine from sugar"
    ],
    es: [
      "Bebe un vaso de agua tibia con limón — la sed a menudo se disfraza de antojo dulce",
      "Come un puñado de bayas — la dulzura natural satisfará la necesidad",
      "Lávate los dientes con pasta de menta — 'cerrará' el deseo de dulce",
      "Haz 10 sentadillas — las endorfinas reemplazarán la dopamina del azúcar"
    ],
    it: [
      "Bevi un bicchiere di acqua tiepida con limone — la sete spesso si maschera da voglia di dolce",
      "Mangia una manciata di bacche — la dolcezza naturale soddisferà il bisogno",
      "Lavati i denti con dentifricio alla menta — 'chiuderà' il desiderio di dolce",
      "Fai 10 squat — le endorfine sostituiranno la dopamina dello zucchero"
    ],
    fr: [
      "Bois un verre d'eau tiède avec du citron — la soif se masque souvent en envie de sucre",
      "Mange une poignée de baies — la douceur naturelle satisfera le besoin",
      "Brosse-toi les dents avec du dentifrice à la menthe — ça 'fermera' l'envie de sucre",
      "Fais 10 squats — les endorphines remplaceront la dopamine du sucre"
    ],
    de: [
      "Trink ein Glas warmes Wasser mit Zitrone — Durst tarnt sich oft als Heißhunger auf Süßes",
      "Iss eine Handvoll Beeren — natürliche Süße wird das Bedürfnis stillen",
      "Putz deine Zähne mit Minz-Zahnpasta — es wird das Verlangen nach Süßem 'schließen'",
      "Mach 10 Kniebeugen — Endorphine ersetzen das Dopamin aus Zucker"
    ]
  },
  emotionalHunger: {
    ru: [
      { question: "Ты действительно голодна? (Не ела 3+ часа)", answer: "Если да — это нормальный голод. Поешь полноценный приём пищи с белком и овощами." },
      { question: "Тебе грустно/скучно/тревожно?", answer: "Это эмоциональный голод. Позвони подруге, прими ванну, прогуляйся 15 минут." },
      { question: "Ты устала?", answer: "Возможно, телу нужен отдых, а не еда. Попробуй лечь на 20 минут." },
      { question: "Ты хочешь награду за тяжёлый день?", answer: "Награда не должна быть в еде. Купи цветы, посмотри сериал, сделай маску." }
    ],
    en: [
      { question: "Are you really hungry? (Haven't eaten for 3+ hours)", answer: "If yes — this is normal hunger. Eat a full meal with protein and vegetables." },
      { question: "Are you sad/bored/anxious?", answer: "This is emotional hunger. Call a friend, take a bath, go for a 15-minute walk." },
      { question: "Are you tired?", answer: "Maybe your body needs rest, not food. Try lying down for 20 minutes." },
      { question: "Do you want a reward for a hard day?", answer: "Reward shouldn't be food. Buy flowers, watch a show, do a face mask." }
    ],
    es: [
      { question: "¿Realmente tienes hambre? (No has comido en 3+ horas)", answer: "Si sí — es hambre normal. Come una comida completa con proteína y verduras." },
      { question: "¿Estás triste/aburrida/ansiosa?", answer: "Es hambre emocional. Llama a una amiga, date un baño, camina 15 minutos." },
      { question: "¿Estás cansada?", answer: "Quizás tu cuerpo necesita descanso, no comida. Intenta acostarte 20 minutos." },
      { question: "¿Quieres una recompensa por un día difícil?", answer: "La recompensa no debe ser comida. Compra flores, mira una serie, ponte una mascarilla." }
    ],
    it: [
      { question: "Hai davvero fame? (Non mangi da 3+ ore)", answer: "Se sì — è fame normale. Mangia un pasto completo con proteine e verdure." },
      { question: "Sei triste/annoiata/ansiosa?", answer: "È fame emotiva. Chiama un'amica, fai un bagno, cammina 15 minuti." },
      { question: "Sei stanca?", answer: "Forse il tuo corpo ha bisogno di riposo, non di cibo. Prova a sdraiarti per 20 minuti." },
      { question: "Vuoi una ricompensa per una giornata difficile?", answer: "La ricompensa non deve essere cibo. Compra fiori, guarda una serie, fai una maschera." }
    ],
    fr: [
      { question: "As-tu vraiment faim? (N'as pas mangé depuis 3+ heures)", answer: "Si oui — c'est de la faim normale. Mange un repas complet avec protéines et légumes." },
      { question: "Es-tu triste/ennuyée/anxieuse?", answer: "C'est de la faim émotionnelle. Appelle une amie, prends un bain, marche 15 minutes." },
      { question: "Es-tu fatiguée?", answer: "Peut-être que ton corps a besoin de repos, pas de nourriture. Essaie de te coucher 20 minutes." },
      { question: "Veux-tu une récompense pour une journée difficile?", answer: "La récompense ne doit pas être de la nourriture. Achète des fleurs, regarde une série, fais un masque." }
    ],
    de: [
      { question: "Hast du wirklich Hunger? (Seit 3+ Stunden nichts gegessen)", answer: "Wenn ja — das ist normaler Hunger. Iss eine volle Mahlzeit mit Protein und Gemüse." },
      { question: "Bist du traurig/ gelangweilt/ ängstlich?", answer: "Das ist emotionaler Hunger. Ruf eine Freundin an, nimm ein Bad, geh 15 Minuten spazieren." },
      { question: "Bist du müde?", answer: "Vielleicht braucht dein Körper Ruhe, nicht Essen. Versuch dich 20 Minuten hinzulegen." },
      { question: "Willst du eine Belohnung für einen harten Tag?", answer: "Belohnung sollte nicht Essen sein. Kauf Blumen, schau eine Serie, mach eine Maske." }
    ]
  },
  weightStall: {
    ru: [
      "Задержка воды: соль, углеводы, фаза цикла могут давать +1-2 кг на весах. Это НЕ жир!",
      "Мышцы тяжелее жира: если ты тренируешься, вес может стоять, но объёмы уходят. Замерь сантиметром!",
      "Плато — нормально: после 2-3 недель тело адаптируется. Продолжай план — через 5-7 дней вес пойдёт вниз.",
      "Стресс повышает кортизол → задержка воды. Попробуй магний перед сном и дыхательные практики."
    ],
    en: [
      "Water retention: salt, carbs, cycle phase can add +1-2 kg on the scale. This is NOT fat!",
      "Muscles are heavier than fat: if you train, weight may stay but measurements decrease. Measure with a tape!",
      "Plateau is normal: after 2-3 weeks the body adapts. Continue the plan — in 5-7 days weight will drop.",
      "Stress raises cortisol → water retention. Try magnesium before bed and breathing exercises."
    ],
    es: [
      "Retención de agua: sal, carbohidratos, fase del ciclo pueden dar +1-2 kg en la báscula. ¡No es grasa!",
      "Los músculos pesan más que la grasa: si entrenas, el peso puede estar pero las medidas bajan. ¡Mide con cinta!",
      "El estancamiento es normal: después de 2-3 semanas el cuerpo se adapta. Continúa — en 5-7 días bajará.",
      "El estrés sube el cortisol → retención de agua. Prueba magnesio antes de dormir y ejercicios de respiración."
    ],
    it: [
      "Ritenzione idrica: sale, carboidrati, fase del ciclo possono dare +1-2 kg sulla bilancia. NON è grasso!",
      "I muscoli pesano più del grasso: se ti alleni, il peso può restare ma le misure scendono. Misura con il metro!",
      "Lo stallo è normale: dopo 2-3 settimane il corpo si adatta. Continua — in 5-7 giorni il peso scenderà.",
      "Lo stress alza il cortisolo → ritenzione idrica. Prova magnesio prima di dormire e esercizi di respirazione."
    ],
    fr: [
      "Rétention d'eau: sel, glucides, phase du cycle peuvent donner +1-2 kg sur la balance. Ce n'est PAS du gras!",
      "Les muscles pèsent plus que le gras: si tu t'entraînes, le poids peut stagner mais les mesures diminuent. Mesure avec un mètre!",
      "Le plateau est normal: après 2-3 semaines le corps s'adapte. Continue — dans 5-7 jours le poids descendra.",
      "Le stress augmente le cortisol → rétention d'eau. Essaie le magnésium avant de dormir et des exercices de respiration."
    ],
    de: [
      "Wassereinlagerung: Salz, Kohlenhydrate, Zyklusphase können +1-2 kg auf der Waage geben. Das ist NICHT Fett!",
      "Muskeln wiegen mehr als Fett: wenn du trainierst, kann das Gewicht bleiben aber die Maße sinken. Miss mit einem Maßband!",
      "Plateau ist normal: nach 2-3 Wochen passt sich der Körper an. Mach weiter — in 5-7 Tagen wird das Gewicht sinken.",
      "Stress erhöht Cortisol → Wassereinlagerung. Versuch Magnesium vor dem Schlafen und Atemübungen."
    ]
  }
};

export default function SosMode() {
  const { t, language } = useLanguage();
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
    const tips = sosTips.sweetCraving[language];
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
        <h1 className="text-2xl font-bold text-gray-800">{t.sos.title}</h1>
        <p className="text-gray-500 text-sm mt-1">{t.sos.subtitle}</p>
      </motion.div>

      {/* Breathing Exercise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 border border-purple-200 mb-4"
      >
        <h3 className="font-semibold text-purple-800 mb-2">{t.sos.breathing}</h3>
        <p className="text-sm text-purple-600 mb-3">{t.sos.breathingDesc}</p>
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
              {t.sos.stop}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setBreathingActive(true)}
            className="w-full py-3 bg-purple-200 text-purple-700 rounded-xl font-medium hover:bg-purple-300 transition-colors"
          >
            {t.sos.startPractice}
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
                <p className="font-semibold text-gray-800">{t.sos.sweetCraving}</p>
                <p className="text-xs text-gray-500">{t.sos.sweetCravingDesc}</p>
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
                    {t.sos.randomTip}
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
                    {sosTips.sweetCraving[language].map((tip, i) => (
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
                <p className="font-semibold text-gray-800">{t.sos.emotionalHunger}</p>
                <p className="text-xs text-gray-500">{t.sos.emotionalHungerDesc}</p>
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
                  {sosTips.emotionalHunger[language].map((item, i) => (
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
                          {t.sos.yes}
                        </button>
                        <button
                          onClick={() => answerEmotional(i, 'no')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            emotionalAnswers[i] === 'no'
                              ? 'bg-blue-500 text-white'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                        >
                          {t.sos.no}
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
                <p className="font-semibold text-gray-800">{t.sos.weightStall}</p>
                <p className="text-xs text-gray-500">{t.sos.weightStallDesc}</p>
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
                  {sosTips.weightStall[language].map((tip, i) => (
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
        <h2 className="font-bold text-gray-800 text-lg mb-3">{t.sos.bonusDesserts}</h2>
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
                      {dessert.calories} {t.common.kcal}
                    </span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                      {dessert.protein}г {t.common.protein}
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
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">{t.menu.ingredients}</h4>
                      <div className="space-y-1 mb-3">
                        {dessert.ingredients.map((ing, i) => (
                          <p key={i} className="text-sm text-gray-700">• {ing}</p>
                        ))}
                      </div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">{t.menu.preparation}</h4>
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
