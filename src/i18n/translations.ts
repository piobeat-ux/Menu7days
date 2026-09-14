export type Language = 'ru' | 'en' | 'es' | 'it' | 'fr' | 'de';

export const languageNames: Record<Language, string> = {
  ru: 'Русский',
  en: 'English',
  es: 'Español',
  it: 'Italiano',
  fr: 'Français',
  de: 'Deutsch'
};

export const languageFlags: Record<Language, string> = {
  ru: '🇷🇺',
  en: '🇬🇧',
  es: '🇪🇸',
  it: '🇮🇹',
  fr: '🇫🇷',
  de: '🇩🇪'
};

export interface Translations {
  // Welcome Screen
  welcome: {
    title: string;
    subtitle: string;
    description: string;
    slide1: { title: string; subtitle: string; description: string };
    slide2: { title: string; subtitle: string; description: string };
    slide3: { title: string; subtitle: string; description: string };
    namePlaceholder: string;
    start: string;
    next: string;
    skip: string;
  };
  // Dashboard
  dashboard: {
    greeting: { morning: string; day: string; evening: string };
    today: string;
    dayOf: string;
    caloriesToday: string;
    proteinToday: string;
    goal: string;
    waterTracker: string;
    glasses: string;
    done: string;
    proteinDay: string;
    snack: string;
    main: string;
    whatToday: string;
    openMenu: string;
  };
  // Menu
  menu: {
    title: string;
    subtitle: string;
    day: string;
    mealTypes: {
      breakfast: string;
      lunch: string;
      snack: string;
      dinner: string;
    };
    ingredients: string;
    preparation: string;
    addToList: string;
    cooked: string;
    iCooked: string;
    totalDay: string;
  };
  // Shopping
  shopping: {
    title: string;
    bought: string;
    loadDay: string;
    clearBought: string;
    addOwn: string;
    productPlaceholder: string;
    ownProducts: string;
    categories: {
      protein: string;
      grains: string;
      vegetables: string;
      fruits: string;
      dairy: string;
      oils: string;
      other: string;
    };
  };
  // SOS
  sos: {
    title: string;
    subtitle: string;
    breathing: string;
    breathingDesc: string;
    startPractice: string;
    stop: string;
    sweetCraving: string;
    sweetCravingDesc: string;
    randomTip: string;
    emotionalHunger: string;
    emotionalHungerDesc: string;
    yes: string;
    no: string;
    weightStall: string;
    weightStallDesc: string;
    bonusDesserts: string;
  };
  // Settings
  settings: {
    title: string;
    subtitle: string;
    profile: string;
    name: string;
    namePlaceholder: string;
    weight: string;
    goal: string;
    goals: { lose: string; maintain: string; gain: string };
    plateMethod: string;
    show: string;
    hide: string;
    mealPrepTimer: string;
    timerDesc: string;
    start: string;
    pause: string;
    reset: string;
    habitTracker: string;
    habits: { water: string; sleep: string; movement: string; protein: string };
    mealPrepGuide: string;
    guideSteps: {
      planning: string;
      planningDesc: string;
      shopping: string;
      shoppingDesc: string;
      cooking: string;
      cookingDesc: string;
      storage: string;
      storageDesc: string;
    };
    resetData: string;
    resetDesc: string;
    deleteAll: string;
    confirmDelete: string;
    language: string;
  };
  // Plate
  plate: {
    protein: string;
    carbs: string;
    vegetables: string;
  };
  // Common
  common: {
    kcal: string;
    protein: string;
    calories: string;
  };
}

export const translations: Record<Language, Translations> = {
  ru: {
    welcome: {
      title: 'Сытая Неделя',
      subtitle: '1600 ккал в день',
      description: '7 дней вкусного и сбалансированного питания с рецептами',
      slide1: { title: 'Сытая Неделя', subtitle: '1600 ккал в день', description: '7 дней вкусного и сбалансированного питания с рецептами' },
      slide2: { title: '100-120г белка', subtitle: 'Каждый день', description: 'Достаточное количество белка для здоровья и сытости' },
      slide3: { title: 'Всё в одном месте', subtitle: 'Удобно и просто', description: 'Меню, список покупок, рецепты и поддержка — в одном приложении' },
      namePlaceholder: 'Как тебя зовут? (необязательно)',
      start: 'Начать 🚀',
      next: 'Далее →',
      skip: 'Пропустить'
    },
    dashboard: {
      greeting: { morning: 'Доброе утро', day: 'Добрый день', evening: 'Добрый вечер' },
      today: 'Сегодня',
      dayOf: 'День {n} из 7',
      caloriesToday: 'Калории сегодня',
      proteinToday: 'Белок сегодня',
      goal: 'цель: 100-120г',
      waterTracker: '💧 Трекер воды',
      glasses: '{n}/8 стаканов',
      done: '🎉 Отлично! Норма выполнена!',
      proteinDay: '🥩 Белок за день',
      snack: '+15г (перекус)',
      main: '+30г (осн.)',
      whatToday: '🍽️ Что ем сегодня',
      openMenu: 'Открыть полное меню →'
    },
    menu: {
      title: '📅 Меню на неделю',
      subtitle: '1600 ккал • 100-120г белка',
      day: 'День',
      mealTypes: { breakfast: 'Завтрак', lunch: 'Обед', snack: 'Перекус', dinner: 'Ужин' },
      ingredients: '📝 Ингредиенты:',
      preparation: '👩‍🍳 Приготовление:',
      addToList: '🛒 В список покупок',
      cooked: '✓ Готово',
      iCooked: '👨‍🍳 Приготовил(а)',
      totalDay: 'Итого за день:'
    },
    shopping: {
      title: '🛒 Список покупок',
      bought: '{n} из {total} куплено',
      loadDay: '📅 Загрузить продукты на день:',
      clearBought: '🗑️ Очистить купленное',
      addOwn: '➕ Добавить свой',
      productPlaceholder: 'Название продукта...',
      ownProducts: '📝 Свои продукты:',
      categories: { protein: 'Белки', grains: 'Крупы и бакалея', vegetables: 'Овощи и зелень', fruits: 'Фрукты и ягоды', dairy: 'Молочные', oils: 'Масла и соусы', other: 'Прочее' }
    },
    sos: {
      title: '🆘 Аптечка от срывов',
      subtitle: 'Помощь в трудные моменты',
      breathing: '🧘 Дыхательная практика',
      breathingDesc: '4-7-8: вдох 4 сек, задержка 7 сек, выдох 8 сек',
      startPractice: 'Начать практику',
      stop: 'Остановить',
      sweetCraving: 'Хочу сладкого прямо сейчас!',
      sweetCravingDesc: 'Быстрые советы и альтернативы',
      randomTip: '🎲 Случайный совет',
      emotionalHunger: 'Эмоциональный голод',
      emotionalHungerDesc: 'Разберись в своих чувствах',
      yes: 'Да',
      no: 'Нет',
      weightStall: 'Почему вес стоит?',
      weightStallDesc: 'Объяснения и поддержка',
      bonusDesserts: '🍰 Бонусные десерты'
    },
    settings: {
      title: '⚙️ Настройки и обучение',
      subtitle: 'Персонализация и полезные гайды',
      profile: '👤 Профиль',
      name: 'Имя',
      namePlaceholder: 'Как тебя зовут?',
      weight: 'Текущий вес (кг)',
      goal: 'Цель',
      goals: { lose: 'Снижение веса', maintain: 'Поддержание формы', gain: 'Набор мышечной массы' },
      plateMethod: '🍽️ Метод тарелки',
      show: 'Показать',
      hide: 'Скрыть',
      mealPrepTimer: '⏱️ Meal Prep Таймер',
      timerDesc: 'Отслеживай время готовки',
      start: '▶ Старт',
      pause: '⏸ Пауза',
      reset: '↺ Сброс',
      habitTracker: '📊 Трекер привычек',
      habits: { water: 'Вода 8 стаканов', sleep: 'Сон 7-8 часов', movement: 'Движение 30 мин', protein: 'Белок 100г+' },
      mealPrepGuide: '📖 Meal Prep Гайд',
      guideSteps: {
        planning: '🕐 Воскресенье — Планирование',
        planningDesc: 'Составь меню, проверь запасы, напиши список покупок',
        shopping: '🛒 Понедельник — Закупка',
        shoppingDesc: 'Купи все продукты на неделю за один раз',
        cooking: '👩‍🍳 Среда — Большая готовка',
        cookingDesc: 'Приготовь основу: крупы, запечённое мясо, нарезанные овощи',
        storage: '📦 Хранение',
        storageDesc: 'Используй контейнеры, подписывай даты. Готовая еда — 3 дня в холодильнике'
      },
      resetData: '⚠️ Сброс данных',
      resetDesc: 'Удалить весь прогресс и настройки',
      deleteAll: 'Удалить все данные',
      confirmDelete: 'Точно удалить все данные? Это действие необратимо.',
      language: '🌐 Язык'
    },
    plate: { protein: 'Белок', carbs: 'Углеводы', vegetables: 'Овощи' },
    common: { kcal: 'ккал', protein: 'белка', calories: 'калории' }
  },
  en: {
    welcome: {
      title: 'Full Week',
      subtitle: '1600 kcal per day',
      description: '7 days of delicious and balanced meals with recipes',
      slide1: { title: 'Full Week', subtitle: '1600 kcal per day', description: '7 days of delicious and balanced meals with recipes' },
      slide2: { title: '100-120g protein', subtitle: 'Every day', description: 'Enough protein for health and satiety' },
      slide3: { title: 'All in one place', subtitle: 'Easy and simple', description: 'Menu, shopping list, recipes and support — all in one app' },
      namePlaceholder: 'What is your name? (optional)',
      start: 'Start 🚀',
      next: 'Next →',
      skip: 'Skip'
    },
    dashboard: {
      greeting: { morning: 'Good morning', day: 'Good afternoon', evening: 'Good evening' },
      today: 'Today',
      dayOf: 'Day {n} of 7',
      caloriesToday: 'Calories today',
      proteinToday: 'Protein today',
      goal: 'goal: 100-120g',
      waterTracker: '💧 Water tracker',
      glasses: '{n}/8 glasses',
      done: '🎉 Great! Goal achieved!',
      proteinDay: '🥩 Protein for the day',
      snack: '+15g (snack)',
      main: '+30g (meal)',
      whatToday: "🍽️ What I'm eating today",
      openMenu: 'Open full menu →'
    },
    menu: {
      title: '📅 Weekly menu',
      subtitle: '1600 kcal • 100-120g protein',
      day: 'Day',
      mealTypes: { breakfast: 'Breakfast', lunch: 'Lunch', snack: 'Snack', dinner: 'Dinner' },
      ingredients: '📝 Ingredients:',
      preparation: '👩‍🍳 Preparation:',
      addToList: '🛒 Add to shopping list',
      cooked: '✓ Done',
      iCooked: '👨‍🍳 I cooked it',
      totalDay: 'Total for the day:'
    },
    shopping: {
      title: '🛒 Shopping list',
      bought: '{n} of {total} bought',
      loadDay: '📅 Load products for day:',
      clearBought: '🗑️ Clear bought items',
      addOwn: '➕ Add your own',
      productPlaceholder: 'Product name...',
      ownProducts: '📝 Your products:',
      categories: { protein: 'Proteins', grains: 'Grains & pantry', vegetables: 'Vegetables & greens', fruits: 'Fruits & berries', dairy: 'Dairy', oils: 'Oils & sauces', other: 'Other' }
    },
    sos: {
      title: '🆘 SOS Kit',
      subtitle: 'Help in difficult moments',
      breathing: '🧘 Breathing exercise',
      breathingDesc: '4-7-8: inhale 4 sec, hold 7 sec, exhale 8 sec',
      startPractice: 'Start practice',
      stop: 'Stop',
      sweetCraving: 'I want something sweet right now!',
      sweetCravingDesc: 'Quick tips and alternatives',
      randomTip: '🎲 Random tip',
      emotionalHunger: 'Emotional hunger',
      emotionalHungerDesc: 'Understand your feelings',
      yes: 'Yes',
      no: 'No',
      weightStall: 'Why is the weight stuck?',
      weightStallDesc: 'Explanations and support',
      bonusDesserts: '🍰 Bonus desserts'
    },
    settings: {
      title: '⚙️ Settings & Learning',
      subtitle: 'Personalization and useful guides',
      profile: '👤 Profile',
      name: 'Name',
      namePlaceholder: 'What is your name?',
      weight: 'Current weight (kg)',
      goal: 'Goal',
      goals: { lose: 'Weight loss', maintain: 'Maintain shape', gain: 'Muscle gain' },
      plateMethod: '🍽️ Plate method',
      show: 'Show',
      hide: 'Hide',
      mealPrepTimer: '⏱️ Meal Prep Timer',
      timerDesc: 'Track your cooking time',
      start: '▶ Start',
      pause: '⏸ Pause',
      reset: '↺ Reset',
      habitTracker: '📊 Habit tracker',
      habits: { water: '8 glasses of water', sleep: '7-8 hours of sleep', movement: '30 min of movement', protein: '100g+ protein' },
      mealPrepGuide: '📖 Meal Prep Guide',
      guideSteps: {
        planning: '🕐 Sunday — Planning',
        planningDesc: 'Plan your menu, check supplies, write shopping list',
        shopping: '🛒 Monday — Shopping',
        shoppingDesc: 'Buy all products for the week at once',
        cooking: '👩‍🍳 Wednesday — Big cooking',
        cookingDesc: 'Prepare basics: grains, baked meat, chopped vegetables',
        storage: '📦 Storage',
        storageDesc: 'Use containers, label dates. Ready food — 3 days in fridge'
      },
      resetData: '⚠️ Reset data',
      resetDesc: 'Delete all progress and settings',
      deleteAll: 'Delete all data',
      confirmDelete: 'Are you sure you want to delete all data? This action cannot be undone.',
      language: '🌐 Language'
    },
    plate: { protein: 'Protein', carbs: 'Carbs', vegetables: 'Vegetables' },
    common: { kcal: 'kcal', protein: 'protein', calories: 'calories' }
  },
  es: {
    welcome: {
      title: 'Semana Llena',
      subtitle: '1600 kcal al día',
      description: '7 días de comida deliciosa y equilibrada con recetas',
      slide1: { title: 'Semana Llena', subtitle: '1600 kcal al día', description: '7 días de comida deliciosa y equilibrada con recetas' },
      slide2: { title: '100-120g de proteína', subtitle: 'Cada día', description: 'Suficiente proteína para la salud y la saciedad' },
      slide3: { title: 'Todo en un solo lugar', subtitle: 'Fácil y simple', description: 'Menú, lista de compras, recetas y apoyo — todo en una app' },
      namePlaceholder: '¿Cómo te llamas? (opcional)',
      start: 'Empezar 🚀',
      next: 'Siguiente →',
      skip: 'Saltar'
    },
    dashboard: {
      greeting: { morning: 'Buenos días', day: 'Buenas tardes', evening: 'Buenas noches' },
      today: 'Hoy',
      dayOf: 'Día {n} de 7',
      caloriesToday: 'Calorías hoy',
      proteinToday: 'Proteína hoy',
      goal: 'meta: 100-120g',
      waterTracker: '💧 Control de agua',
      glasses: '{n}/8 vasos',
      done: '🎉 ¡Genial! ¡Meta cumplida!',
      proteinDay: '🥩 Proteína del día',
      snack: '+15g (snack)',
      main: '+30g (comida)',
      whatToday: '🍽️ Lo que como hoy',
      openMenu: 'Abrir menú completo →'
    },
    menu: {
      title: '📅 Menú semanal',
      subtitle: '1600 kcal • 100-120g de proteína',
      day: 'Día',
      mealTypes: { breakfast: 'Desayuno', lunch: 'Almuerzo', snack: 'Snack', dinner: 'Cena' },
      ingredients: '📝 Ingredientes:',
      preparation: '👩‍🍳 Preparación:',
      addToList: '🛒 Añadir a la lista',
      cooked: '✓ Hecho',
      iCooked: '👨‍🍳 Lo cociné',
      totalDay: 'Total del día:'
    },
    shopping: {
      title: '🛒 Lista de compras',
      bought: '{n} de {total} comprado',
      loadDay: '📅 Cargar productos del día:',
      clearBought: '🗑️ Borrar comprados',
      addOwn: '➕ Añadir propio',
      productPlaceholder: 'Nombre del producto...',
      ownProducts: '📝 Tus productos:',
      categories: { protein: 'Proteínas', grains: 'Cereales y despensa', vegetables: 'Verduras y greens', fruits: 'Frutas y bayas', dairy: 'Lácteos', oils: 'Aceites y salsas', other: 'Otros' }
    },
    sos: {
      title: '🆘 Kit de emergencia',
      subtitle: 'Ayuda en momentos difíciles',
      breathing: '🧘 Ejercicio de respiración',
      breathingDesc: '4-7-8: inhala 4 seg, mantén 7 seg, exhala 8 seg',
      startPractice: 'Empezar práctica',
      stop: 'Parar',
      sweetCraving: '¡Quiero algo dulce ahora!',
      sweetCravingDesc: 'Consejos rápidos y alternativas',
      randomTip: '🎲 Consejo aleatorio',
      emotionalHunger: 'Hambre emocional',
      emotionalHungerDesc: 'Entiende tus sentimientos',
      yes: 'Sí',
      no: 'No',
      weightStall: '¿Por qué el peso se estanca?',
      weightStallDesc: 'Explicaciones y apoyo',
      bonusDesserts: '🍰 Postres extra'
    },
    settings: {
      title: '⚙️ Ajustes y aprendizaje',
      subtitle: 'Personalización y guías útiles',
      profile: '👤 Perfil',
      name: 'Nombre',
      namePlaceholder: '¿Cómo te llamas?',
      weight: 'Peso actual (kg)',
      goal: 'Objetivo',
      goals: { lose: 'Perder peso', maintain: 'Mantener forma', gain: 'Ganar músculo' },
      plateMethod: '🍽️ Método del plato',
      show: 'Mostrar',
      hide: 'Ocultar',
      mealPrepTimer: '⏱️ Temporizador Meal Prep',
      timerDesc: 'Controla tu tiempo de cocina',
      start: '▶ Iniciar',
      pause: '⏸ Pausa',
      reset: '↺ Reiniciar',
      habitTracker: '📊 Control de hábitos',
      habits: { water: '8 vasos de agua', sleep: '7-8 horas de sueño', movement: '30 min de movimiento', protein: '100g+ proteína' },
      mealPrepGuide: '📖 Guía Meal Prep',
      guideSteps: {
        planning: '🕐 Domingo — Planificación',
        planningDesc: 'Planifica tu menú, revisa suministros, escribe lista',
        shopping: '🛒 Lunes — Compras',
        shoppingDesc: 'Compra todos los productos de la semana de una vez',
        cooking: '👩‍🍳 Miércoles — Cocina grande',
        cookingDesc: 'Prepara bases: cereales, carne al horno, verduras cortadas',
        storage: '📦 Almacenamiento',
        storageDesc: 'Usa recipientes, etiqueta fechas. Comida lista — 3 días en nevera'
      },
      resetData: '⚠️ Resetear datos',
      resetDesc: 'Borrar todo el progreso y ajustes',
      deleteAll: 'Borrar todos los datos',
      confirmDelete: '¿Seguro que quieres borrar todos los datos? Esta acción no se puede deshacer.',
      language: '🌐 Idioma'
    },
    plate: { protein: 'Proteína', carbs: 'Carbohidratos', vegetables: 'Verduras' },
    common: { kcal: 'kcal', protein: 'proteína', calories: 'calorías' }
  },
  it: {
    welcome: {
      title: 'Settimana Piena',
      subtitle: '1600 kcal al giorno',
      description: '7 giorni di pasti deliziosi ed equilibrati con ricette',
      slide1: { title: 'Settimana Piena', subtitle: '1600 kcal al giorno', description: '7 giorni di pasti deliziosi ed equilibrati con ricette' },
      slide2: { title: '100-120g di proteine', subtitle: 'Ogni giorno', description: 'Abbastanza proteine per salute e sazietà' },
      slide3: { title: 'Tutto in un posto', subtitle: 'Facile e semplice', description: 'Menu, lista della spesa, ricette e supporto — tutto in un\'app' },
      namePlaceholder: 'Come ti chiami? (opzionale)',
      start: 'Inizia 🚀',
      next: 'Avanti →',
      skip: 'Salta'
    },
    dashboard: {
      greeting: { morning: 'Buongiorno', day: 'Buon pomeriggio', evening: 'Buonasera' },
      today: 'Oggi',
      dayOf: 'Giorno {n} di 7',
      caloriesToday: 'Calorie oggi',
      proteinToday: 'Proteine oggi',
      goal: 'obiettivo: 100-120g',
      waterTracker: '💧 Tracker acqua',
      glasses: '{n}/8 bicchieri',
      done: '🎉 Ottimo! Obiettivo raggiunto!',
      proteinDay: '🥩 Proteine del giorno',
      snack: '+15g (spuntino)',
      main: '+30g (pasto)',
      whatToday: '🍽️ Cosa mangio oggi',
      openMenu: 'Apri menu completo →'
    },
    menu: {
      title: '📅 Menu settimanale',
      subtitle: '1600 kcal • 100-120g di proteine',
      day: 'Giorno',
      mealTypes: { breakfast: 'Colazione', lunch: 'Pranzo', snack: 'Spuntino', dinner: 'Cena' },
      ingredients: '📝 Ingredienti:',
      preparation: '👩‍🍳 Preparazione:',
      addToList: '🛒 Aggiungi alla lista',
      cooked: '✓ Fatto',
      iCooked: '👨‍🍳 L\'ho cucinato',
      totalDay: 'Totale del giorno:'
    },
    shopping: {
      title: '🛒 Lista della spesa',
      bought: '{n} di {total} comprato',
      loadDay: '📅 Carica prodotti del giorno:',
      clearBought: '🗑️ Cancella comprati',
      addOwn: '➕ Aggiungi tuo',
      productPlaceholder: 'Nome prodotto...',
      ownProducts: '📝 I tuoi prodotti:',
      categories: { protein: 'Proteine', grains: 'Cereali e dispensa', vegetables: 'Verdure e erbe', fruits: 'Frutta e bacche', dairy: 'Latticini', oils: 'Oli e salse', other: 'Altro' }
    },
    sos: {
      title: '🆘 Kit di emergenza',
      subtitle: 'Aiuto nei momenti difficili',
      breathing: '🧘 Esercizio di respirazione',
      breathingDesc: '4-7-8: inspira 4 sec, trattieni 7 sec, espira 8 sec',
      startPractice: 'Inizia pratica',
      stop: 'Ferma',
      sweetCraving: 'Voglio qualcosa di dolce ora!',
      sweetCravingDesc: 'Consigli veloci e alternative',
      randomTip: '🎲 Consiglio casuale',
      emotionalHunger: 'Fame emotiva',
      emotionalHungerDesc: 'Comprendi i tuoi sentimenti',
      yes: 'Sì',
      no: 'No',
      weightStall: 'Perché il peso è fermo?',
      weightStallDesc: 'Spiegazioni e supporto',
      bonusDesserts: '🍰 Dolci extra'
    },
    settings: {
      title: '⚙️ Impostazioni e apprendimento',
      subtitle: 'Personalizzazione e guide utili',
      profile: '👤 Profilo',
      name: 'Nome',
      namePlaceholder: 'Come ti chiami?',
      weight: 'Peso attuale (kg)',
      goal: 'Obiettivo',
      goals: { lose: 'Perdita di peso', maintain: 'Mantenimento', gain: 'Aumento muscolare' },
      plateMethod: '🍽️ Metodo del piatto',
      show: 'Mostra',
      hide: 'Nascondi',
      mealPrepTimer: '⏱️ Timer Meal Prep',
      timerDesc: 'Traccia il tuo tempo di cottura',
      start: '▶ Avvia',
      pause: '⏸ Pausa',
      reset: '↺ Reset',
      habitTracker: '📊 Tracker abitudini',
      habits: { water: '8 bicchieri d\'acqua', sleep: '7-8 ore di sonno', movement: '30 min di movimento', protein: '100g+ proteine' },
      mealPrepGuide: '📖 Guida Meal Prep',
      guideSteps: {
        planning: '🕐 Domenica — Pianificazione',
        planningDesc: 'Pianifica il menu, controlla scorte, scrivi lista',
        shopping: '🛒 Lunedì — Spesa',
        shoppingDesc: 'Compra tutti i prodotti della settimana in una volta',
        cooking: '👩‍🍳 Mercoledì — Cucina grande',
        cookingDesc: 'Prepara basi: cereali, carne al forno, verdure tagliate',
        storage: '📦 Conservazione',
        storageDesc: 'Usa contenitori, etichetta date. Cibo pronto — 3 giorni in frigo'
      },
      resetData: '⚠️ Resetta dati',
      resetDesc: 'Cancella tutto il progresso e impostazioni',
      deleteAll: 'Cancella tutti i dati',
      confirmDelete: 'Sei sicuro di voler cancellare tutti i dati? Questa azione non può essere annullata.',
      language: '🌐 Lingua'
    },
    plate: { protein: 'Proteine', carbs: 'Carboidrati', vegetables: 'Verdure' },
    common: { kcal: 'kcal', protein: 'proteine', calories: 'calorie' }
  },
  fr: {
    welcome: {
      title: 'Semaine Rassasiée',
      subtitle: '1600 kcal par jour',
      description: '7 jours de repas délicieux et équilibrés avec recettes',
      slide1: { title: 'Semaine Rassasiée', subtitle: '1600 kcal par jour', description: '7 jours de repas délicieux et équilibrés avec recettes' },
      slide2: { title: '100-120g de protéines', subtitle: 'Chaque jour', description: 'Assez de protéines pour la santé et la satiété' },
      slide3: { title: 'Tout en un seul endroit', subtitle: 'Facile et simple', description: 'Menu, liste de courses, recettes et soutien — tout dans une app' },
      namePlaceholder: 'Comment tu t\'appelles? (optionnel)',
      start: 'Commencer 🚀',
      next: 'Suivant →',
      skip: 'Passer'
    },
    dashboard: {
      greeting: { morning: 'Bonjour', day: 'Bon après-midi', evening: 'Bonsoir' },
      today: 'Aujourd\'hui',
      dayOf: 'Jour {n} sur 7',
      caloriesToday: 'Calories aujourd\'hui',
      proteinToday: 'Protéines aujourd\'hui',
      goal: 'objectif: 100-120g',
      waterTracker: '💧 Suivi de l\'eau',
      glasses: '{n}/8 verres',
      done: '🎉 Super! Objectif atteint!',
      proteinDay: '🥩 Protéines du jour',
      snack: '+15g (collation)',
      main: '+30g (repas)',
      whatToday: '🍽️ Ce que je mange aujourd\'hui',
      openMenu: 'Ouvrir le menu complet →'
    },
    menu: {
      title: '📅 Menu de la semaine',
      subtitle: '1600 kcal • 100-120g de protéines',
      day: 'Jour',
      mealTypes: { breakfast: 'Petit-déjeuner', lunch: 'Déjeuner', snack: 'Collation', dinner: 'Dîner' },
      ingredients: '📝 Ingrédients:',
      preparation: '👩‍🍳 Préparation:',
      addToList: '🛒 Ajouter à la liste',
      cooked: '✓ Fait',
      iCooked: '👨‍🍳 Je l\'ai cuisiné',
      totalDay: 'Total du jour:'
    },
    shopping: {
      title: '🛒 Liste de courses',
      bought: '{n} sur {total} acheté',
      loadDay: '📅 Charger produits du jour:',
      clearBought: '🗑️ Effacer achetés',
      addOwn: '➕ Ajouter le tien',
      productPlaceholder: 'Nom du produit...',
      ownProducts: '📝 Tes produits:',
      categories: { protein: 'Protéines', grains: 'Céréales et épicerie', vegetables: 'Légumes et herbes', fruits: 'Fruits et baies', dairy: 'Produits laitiers', oils: 'Huiles et sauces', other: 'Autres' }
    },
    sos: {
      title: '🆘 Trousse d\'urgence',
      subtitle: 'Aide dans les moments difficiles',
      breathing: '🧘 Exercice de respiration',
      breathingDesc: '4-7-8: inspire 4 sec, retiens 7 sec, expire 8 sec',
      startPractice: 'Commencer la pratique',
      stop: 'Arrêter',
      sweetCraving: 'Je veux du sucré maintenant!',
      sweetCravingDesc: 'Conseils rapides et alternatives',
      randomTip: '🎲 Conseil aléatoire',
      emotionalHunger: 'Faim émotionnelle',
      emotionalHungerDesc: 'Comprends tes sentiments',
      yes: 'Oui',
      no: 'Non',
      weightStall: 'Pourquoi le poids stagne?',
      weightStallDesc: 'Explications et soutien',
      bonusDesserts: '🍰 Desserts bonus'
    },
    settings: {
      title: '⚙️ Paramètres et apprentissage',
      subtitle: 'Personnalisation et guides utiles',
      profile: '👤 Profil',
      name: 'Nom',
      namePlaceholder: 'Comment tu t\'appelles?',
      weight: 'Poids actuel (kg)',
      goal: 'Objectif',
      goals: { lose: 'Perte de poids', maintain: 'Maintien', gain: 'Prise de muscle' },
      plateMethod: '🍽️ Méthode de l\'assiette',
      show: 'Afficher',
      hide: 'Masquer',
      mealPrepTimer: '⏱️ Minuteur Meal Prep',
      timerDesc: 'Suis ton temps de cuisson',
      start: '▶ Démarrer',
      pause: '⏸ Pause',
      reset: '↺ Réinitialiser',
      habitTracker: '📊 Suivi des habitudes',
      habits: { water: '8 verres d\'eau', sleep: '7-8 heures de sommeil', movement: '30 min de mouvement', protein: '100g+ protéines' },
      mealPrepGuide: '📖 Guide Meal Prep',
      guideSteps: {
        planning: '🕐 Dimanche — Planification',
        planningDesc: 'Planifie ton menu, vérifie les stocks, écris la liste',
        shopping: '🛒 Lundi — Courses',
        shoppingDesc: 'Achète tous les produits de la semaine en une fois',
        cooking: '👩‍🍳 Mercredi — Grande cuisine',
        cookingDesc: 'Prépare les bases: céréales, viande au four, légumes coupés',
        storage: '📦 Stockage',
        storageDesc: 'Utilise des contenants, étiquette les dates. Nourriture prête — 3 jours au frigo'
      },
      resetData: '⚠️ Réinitialiser les données',
      resetDesc: 'Supprimer tout le progrès et paramètres',
      deleteAll: 'Supprimer toutes les données',
      confirmDelete: 'Es-tu sûr de vouloir supprimer toutes les données? Cette action est irréversible.',
      language: '🌐 Langue'
    },
    plate: { protein: 'Protéines', carbs: 'Glucides', vegetables: 'Légumes' },
    common: { kcal: 'kcal', protein: 'protéines', calories: 'calories' }
  },
  de: {
    welcome: {
      title: 'Satte Woche',
      subtitle: '1600 kcal pro Tag',
      description: '7 Tage leckeres und ausgewogenes Essen mit Rezepten',
      slide1: { title: 'Satte Woche', subtitle: '1600 kcal pro Tag', description: '7 Tage leckeres und ausgewogenes Essen mit Rezepten' },
      slide2: { title: '100-120g Protein', subtitle: 'Jeden Tag', description: 'Genug Protein für Gesundheit und Sättigung' },
      slide3: { title: 'Alles an einem Ort', subtitle: 'Einfach und praktisch', description: 'Menü, Einkaufsliste, Rezepte und Unterstützung — alles in einer App' },
      namePlaceholder: 'Wie heißt du? (optional)',
      start: 'Starten 🚀',
      next: 'Weiter →',
      skip: 'Überspringen'
    },
    dashboard: {
      greeting: { morning: 'Guten Morgen', day: 'Guten Tag', evening: 'Guten Abend' },
      today: 'Heute',
      dayOf: 'Tag {n} von 7',
      caloriesToday: 'Kalorien heute',
      proteinToday: 'Protein heute',
      goal: 'Ziel: 100-120g',
      waterTracker: '💧 Wasser-Tracker',
      glasses: '{n}/8 Gläser',
      done: '🎉 Super! Ziel erreicht!',
      proteinDay: '🥩 Protein des Tages',
      snack: '+15g (Snack)',
      main: '+30g (Mahlzeit)',
      whatToday: '🍽️ Was ich heute esse',
      openMenu: 'Vollständiges Menü öffnen →'
    },
    menu: {
      title: '📅 Wochenmenü',
      subtitle: '1600 kcal • 100-120g Protein',
      day: 'Tag',
      mealTypes: { breakfast: 'Frühstück', lunch: 'Mittagessen', snack: 'Snack', dinner: 'Abendessen' },
      ingredients: '📝 Zutaten:',
      preparation: '👩‍🍳 Zubereitung:',
      addToList: '🛒 Zur Einkaufsliste',
      cooked: '✓ Fertig',
      iCooked: '👨‍🍳 Ich habe gekocht',
      totalDay: 'Gesamt am Tag:'
    },
    shopping: {
      title: '🛒 Einkaufsliste',
      bought: '{n} von {total} gekauft',
      loadDay: '📅 Produkte für Tag laden:',
      clearBought: '🗑️ Gekaufte löschen',
      addOwn: '➕ Eigene hinzufügen',
      productPlaceholder: 'Produktname...',
      ownProducts: '📝 Deine Produkte:',
      categories: { protein: 'Proteine', grains: 'Getreide & Vorrat', vegetables: 'Gemüse & Kräuter', fruits: 'Obst & Beeren', dairy: 'Milchprodukte', oils: 'Öle & Saucen', other: 'Sonstiges' }
    },
    sos: {
      title: '🆘 SOS-Kit',
      subtitle: 'Hilfe in schwierigen Momenten',
      breathing: '🧘 Atemübung',
      breathingDesc: '4-7-8: einatmen 4 Sek, halten 7 Sek, ausatmen 8 Sek',
      startPractice: 'Praxis starten',
      stop: 'Stoppen',
      sweetCraving: 'Ich will jetzt etwas Süßes!',
      sweetCravingDesc: 'Schnelle Tipps und Alternativen',
      randomTip: '🎲 Zufälliger Tipp',
      emotionalHunger: 'Emotionaler Hunger',
      emotionalHungerDesc: 'Verstehe deine Gefühle',
      yes: 'Ja',
      no: 'Nein',
      weightStall: 'Warum steht das Gewicht still?',
      weightStallDesc: 'Erklärungen und Unterstützung',
      bonusDesserts: '🍰 Bonus-Desserts'
    },
    settings: {
      title: '⚙️ Einstellungen & Lernen',
      subtitle: 'Personalisierung und nützliche Anleitungen',
      profile: '👤 Profil',
      name: 'Name',
      namePlaceholder: 'Wie heißt du?',
      weight: 'Aktuelles Gewicht (kg)',
      goal: 'Ziel',
      goals: { lose: 'Gewichtsverlust', maintain: 'Form halten', gain: 'Muskelaufbau' },
      plateMethod: '🍽️ Teller-Methode',
      show: 'Anzeigen',
      hide: 'Verbergen',
      mealPrepTimer: '⏱️ Meal Prep Timer',
      timerDesc: 'Verfolge deine Kochzeit',
      start: '▶ Start',
      pause: '⏸ Pause',
      reset: '↺ Zurücksetzen',
      habitTracker: '📊 Gewohnheits-Tracker',
      habits: { water: '8 Gläser Wasser', sleep: '7-8 Stunden Schlaf', movement: '30 Min Bewegung', protein: '100g+ Protein' },
      mealPrepGuide: '📖 Meal Prep Anleitung',
      guideSteps: {
        planning: '🕐 Sonntag — Planung',
        planningDesc: 'Plane dein Menü, prüfe Vorräte, schreibe Liste',
        shopping: '🛒 Montag — Einkauf',
        shoppingDesc: 'Kaufe alle Produkte der Woche auf einmal',
        cooking: '👩‍🍳 Mittwoch — Großes Kochen',
        cookingDesc: 'Bereite Grundlagen vor: Getreide, Fleisch im Ofen, geschnittenes Gemüse',
        storage: '📦 Lagerung',
        storageDesc: 'Benutze Behälter, beschrifte Daten. Fertiges Essen — 3 Tage im Kühlschrank'
      },
      resetData: '⚠️ Daten zurücksetzen',
      resetDesc: 'Allen Fortschritt und Einstellungen löschen',
      deleteAll: 'Alle Daten löschen',
      confirmDelete: 'Bist du sicher, dass du alle Daten löschen willst? Diese Aktion kann nicht rückgängig gemacht werden.',
      language: '🌐 Sprache'
    },
    plate: { protein: 'Protein', carbs: 'Kohlenhydrate', vegetables: 'Gemüse' },
    common: { kcal: 'kcal', protein: 'Protein', calories: 'Kalorien' }
  }
};
