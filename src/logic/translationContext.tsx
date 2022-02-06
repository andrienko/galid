import React from 'react';
import { get } from 'lodash';

export type Translations = Record<string, Record<string, Record<string, string>>>;

type TranslationContextValue = {
  translations: Translations;
  t: (key: string) => string;
  lang: string;
  languages: string[];
  setLang: (newLang: string) => void;
};

const TranslationContext = React.createContext<TranslationContextValue | undefined>(undefined);

export const TranslationContextProvider: React.FC<{ translations: Translations }> = React.memo(
  ({ children, translations }) => {
    const [lang, setLang] = React.useState('en');
    const languages = React.useMemo<string[]>(() => Object.keys(translations), [translations]);
    const t = React.useCallback(
      (fullKey: string): string => {
        if (!fullKey) {
          throw new Error('Translation key must be non-empty');
        }
        let key = fullKey;
        let namespace = 'default';
        const colonPos = fullKey.indexOf(':');
        if (~colonPos) {
          namespace = fullKey.slice(0, colonPos);
          key = fullKey.slice(colonPos + 1);
        }

        return get(translations, [lang, namespace, key]) || fullKey;
      },
      [lang, translations]
    );
    const contextValue = React.useMemo<TranslationContextValue>(
      () => ({ lang, setLang, t, translations, languages }),
      [lang, setLang, t, translations, languages]
    );

    return <TranslationContext.Provider value={contextValue}>{children}</TranslationContext.Provider>;
  }
);

export const useTranslationContext = (): TranslationContextValue => {
  const context = React.useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslationContext and useTranslation must be used inside TranslationContextProvider');
  }
  return context;
};

export const useTranslation = useTranslationContext;
