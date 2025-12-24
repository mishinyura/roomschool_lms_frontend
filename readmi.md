src/
├── assets/              # Глобальная статика (шрифты, общие стили, лого)
│   ├── fonts/
│   ├── icons/           # SVG иконки
│   └── styles/          # Глобальные SCSS/CSS (reset, variables, mixins)
│
├── api/                 # (Бывшая services/api) Все запросы к серверу
│   ├── httpClient.js    # Настройка axios (интерцепторы, хедеры с токеном)
│   ├── authApi.js       # Логин, рефреш токена
│   ├── tasksApi.js      # Запросы по задачам
│   └── ...
│
├── components/          # UI-KIT (Глупые компоненты без бизнес-логики)
│   ├── ui/              # Кнопки, инпуты, чекбоксы, модалки (базовые кирпичики)
│   │   ├── AppButton.vue
│   │   ├── AppInput.vue
│   │   └── ...
│   └── layout/          # Компоненты сетки (Header, Sidebar, Footer)
│
├── composables/         # (Новая папка!) Переиспользуемая логика (Vue Composition API)
│   ├── useAuth.js       # Логика проверки прав
│   ├── useTheme.js      # Переключение темы
│   └── ...
│
├── config/              # Константы и конфиги
│   ├── roles.js         # Твои role-config.js
│   └── app.config.js    # URL API и прочее
│
├── layouts/             # Обертки страниц (layouts из Vue Router)
│   ├── DefaultLayout.vue
│   ├── EmptyLayout.vue  # Например, для страницы Логина (без сайдбара)
│   └── ...
│
├── modules/             # (САМОЕ ВАЖНОЕ) Группировка по фичам
│   ├── auth/            # Всё про авторизацию
│   │   ├── components/  # Форма логина
│   │   └── store.js     # Стор авторизации
│   ├── profile/         # Всё про профиль
│   │   ├── components/  # ProfileCardInfo.vue переедет сюда
│   │   └── views/       # ProfileView.vue (можно хранить views тут или отдельно)
│   ├── tasks/           # Всё про задачи
│   │   ├── components/  # TaskCard, TaskCheck
│   │   └── ...
│   └── webinars/        # Всё про вебинары
│       └── components/  # WebinarsCard.vue переедет сюда
│
├── router/              # Роутинг
│   ├── index.js         # Главный файл
│   ├── middleware/      # (Новая!) Защита роутов (твои beforeEach проверки)
│   └── routes.js        # Список путей (чтобы не захламлять index.js)
│
├── stores/              # Глобальные сторы (Pinia), если они общие для всего аппа
│   └── globalStore.js
│
├── utils/               # (Бывшая services/scripts) Чистые JS функции
│   ├── dateUtils.js     # Форматирование дат
│   ├── validation.js    # Валидаторы
│   └── jwtUtils.js      # Декодирование токена
│
├── views/               # Страницы (Page components)
│   ├── AuthView.vue
│   ├── HomeView.vue
│   └── ...
│
├── App.vue
└── main.js