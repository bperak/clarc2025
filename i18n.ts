// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to our conference!",
      "about_us": "Learn more about our event.",
      "schedule_title": "Conference Schedule"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
```

```typescript
// src/index.tsx or src/app/layout.tsx (where your root component is rendered)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Your main App component
import './i18n'; // Import the i18n configuration

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```typescript
// src/App.tsx (example of using translation in a component)
import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('about_us')}</p>
      <h2>{t('schedule_title')}</h2>
      {/* Rest of your app content */}
    </div>
  );
}

export default App;