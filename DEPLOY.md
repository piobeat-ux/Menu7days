# 🚀 Инструкция по деплою

## Быстрый старт (5 минут)

### 1. Vercel (самый простой способ)

```bash
# Установите Vercel CLI
npm i -g vercel

# Войдите в аккаунт
vercel login

# Задеплойте проект
vercel

# Следуйте инструкциям в терминале
```

После деплоя получите ссылку вида: `https://your-project.vercel.app`

### 2. Netlify

```bash
# Установите Netlify CLI
npm i -g netlify-cli

# Войдите в аккаунт
netlify login

# Соберите проект
npm run build

# Задеплойте
netlify deploy --prod --dir=dist
```

### 3. GitHub Pages

1. Создайте репозиторий на GitHub
2. Запушьте код:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/sytaja-nedelya.git
   git push -u origin main
   ```

3. В GitHub: Settings → Pages → Source: Deploy from a branch
4. Выберите ветку `gh-pages` (создастся автоматически)
5. Добавьте в `vite.config.js`:
   ```js
   export default defineConfig({
     base: '/sytaja-nedelya/',
     // ... остальной код
   })
   ```

6. Пересоберите и запушьте:
   ```bash
   npm run build
   git add dist
   git commit -m "Build"
   git push
   ```

Ссылка: `https://yourusername.github.io/sytaja-nedelya/`

## Настройка домена

### Vercel

1. Перейдите в Dashboard → ваш проект → Settings → Domains
2. Добавьте свой домен
3. Следуйте инструкциям для настройки DNS

### Netlify

1. Перейдите в Site settings → Domain management
2. Добавьте свой домен
3. Настройте DNS записи

## Проверка после деплоя

1. Откройте ссылку в браузере
2. Проверьте все функции:
   - Переключение языков
   - Навигация между вкладками
   - Трекер воды
   - Меню на 7 дней
   - Список покупок
   - SOS-режим
   - Настройки

3. Проверьте PWA:
   - Откройте DevTools → Application → Manifest
   - Проверьте Service Worker

## Оптимизация

### Уменьшение размера бандла

```bash
# Анализ бандла
npm run build
npx vite-bundle-visualizer
```

### Добавление аналитики

Добавьте в `index.html` перед `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Мониторинг

### Vercel Analytics

Автоматически доступен в Dashboard → Analytics

### Netlify Analytics

Включите в Site settings → Analytics

## Поддержка

Если возникли проблемы:
1. Проверьте консоль браузера (F12)
2. Проверьте логи деплоя
3. Убедитесь, что все зависимости установлены: `npm install`

---

**Готово!** Ваше приложение доступно по ссылке. 🎉
