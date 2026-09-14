import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { shoppingCategories, mealPlan } from '../data/mealPlan';

interface ShoppingListProps {
  newItems: string[];
  onClearNewItems: () => void;
}

export default function ShoppingList({ newItems, onClearNewItems }: ShoppingListProps) {
  const { t } = useLanguage();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('checkedShoppingItems');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [customItems, setCustomItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('customShoppingItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [newCustomItem, setNewCustomItem] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAddInput, setShowAddInput] = useState(false);

  useEffect(() => {
    if (newItems.length > 0) {
      onClearNewItems();
    }
  }, [newItems]);

  useEffect(() => {
    localStorage.setItem('checkedShoppingItems', JSON.stringify([...checkedItems]));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem('customShoppingItems', JSON.stringify(customItems));
  }, [customItems]);

  const toggleItem = (item: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(item)) {
      newChecked.delete(item);
    } else {
      newChecked.add(item);
    }
    setCheckedItems(newChecked);
  };

  const clearChecked = () => {
    setCheckedItems(new Set());
  };

  const addCustomItem = () => {
    if (newCustomItem.trim()) {
      setCustomItems(prev => [...prev, newCustomItem.trim()]);
      setNewCustomItem('');
      setShowAddInput(false);
    }
  };

  const removeCustomItem = (item: string) => {
    setCustomItems(prev => prev.filter(i => i !== item));
    const newChecked = new Set(checkedItems);
    newChecked.delete(item);
    setCheckedItems(newChecked);
  };

  const loadDayProducts = (day: number) => {
    const dayPlan = mealPlan[day - 1];
    if (dayPlan) {
      const allIngredients = dayPlan.meals.flatMap(m => m.ingredients);
      const uniqueIngredients = [...new Set(allIngredients)];
      const newChecked = new Set(checkedItems);
      uniqueIngredients.forEach(ing => newChecked.delete(ing));
      setCheckedItems(newChecked);
      const categoryItems = shoppingCategories.flatMap(c => c.items);
      const newCustom = uniqueIngredients.filter(ing => !categoryItems.some(ci => ing.includes(ci.split(' ')[0])));
      setCustomItems(prev => [...new Set([...prev, ...newCustom])]);
    }
  };

  const getTotalItems = () => {
    let total = customItems.length;
    shoppingCategories.forEach(cat => {
      total += cat.items.length;
    });
    return total;
  };

  const getCheckedCount = () => checkedItems.size;

  const categoryKeys: (keyof typeof t.shopping.categories)[] = ['protein', 'grains', 'vegetables', 'fruits', 'dairy', 'oils', 'other'];

  return (
    <div className="px-4 pb-4 pt-2 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h1 className="text-2xl font-bold text-gray-800">{t.shopping.title}</h1>
        <p className="text-gray-500 text-sm mt-1">
          {t.shopping.bought.replace('{n}', getCheckedCount().toString()).replace('{total}', getTotalItems().toString())}
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(getCheckedCount() / getTotalItems()) * 100}%` }}
          className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500"
        />
      </div>

      {/* Load Day Products */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-4"
      >
        <p className="text-sm text-gray-600 mb-2 font-medium">{t.shopping.loadDay}</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {[1, 2, 3, 4, 5, 6, 7].map(day => (
            <button
              key={day}
              onClick={() => loadDayProducts(day)}
              className="flex-shrink-0 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
            >
              {t.menu.day} {day}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={clearChecked}
          className="flex-1 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
        >
          {t.shopping.clearBought}
        </button>
        <button
          onClick={() => setShowAddInput(!showAddInput)}
          className="flex-1 py-2.5 bg-green-50 text-green-600 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors"
        >
          {t.shopping.addOwn}
        </button>
      </div>

      {/* Add Custom Item */}
      <AnimatePresence>
        {showAddInput && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={newCustomItem}
                onChange={(e) => setNewCustomItem(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomItem()}
                placeholder={t.shopping.productPlaceholder}
                className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
                autoFocus
              />
              <button
                onClick={addCustomItem}
                className="px-4 py-2.5 bg-green-500 text-white rounded-xl text-sm font-medium"
              >
                OK
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Items */}
      {customItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-4"
        >
          <h3 className="font-semibold text-gray-700 text-sm mb-3">{t.shopping.ownProducts}</h3>
          <div className="space-y-2">
            {customItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <button
                  onClick={() => toggleItem(item)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    checkedItems.has(item)
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300'
                  }`}
                >
                  {checkedItems.has(item) && <span className="text-white text-xs">✓</span>}
                </button>
                <span className={`flex-1 text-sm ${checkedItems.has(item) ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {item}
                </span>
                <button
                  onClick={() => removeCustomItem(item)}
                  className="text-gray-400 hover:text-red-400 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Categories */}
      <div className="space-y-3">
        {shoppingCategories.map((category, catIndex) => {
          const isExpanded = activeCategory === category.name;
          const categoryChecked = category.items.filter(item => checkedItems.has(item)).length;
          const categoryLabel = t.shopping.categories[categoryKeys[catIndex]];

          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + catIndex * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setActiveCategory(isExpanded ? null : category.name)}
                className="w-full p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.emoji}</span>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 text-sm">{categoryLabel}</p>
                    <p className="text-xs text-gray-500">
                      {categoryChecked}/{category.items.length} {t.shopping.bought.split(' ').pop()}
                    </p>
                  </div>
                </div>
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  className="text-gray-400"
                >
                  ▾
                </motion.span>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-2">
                      {category.items.map((item, i) => {
                        const isChecked = checkedItems.has(item);
                        return (
                          <motion.div
                            key={i}
                            layout
                            className="flex items-center gap-3"
                          >
                            <button
                              onClick={() => toggleItem(item)}
                              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                                isChecked
                                  ? 'bg-green-500 border-green-500'
                                  : 'border-gray-300 hover:border-green-400'
                              }`}
                            >
                              {isChecked && (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="text-white text-xs"
                                >
                                  ✓
                                </motion.span>
                              )}
                            </button>
                            <span className={`text-sm flex-1 ${isChecked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                              {item}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
