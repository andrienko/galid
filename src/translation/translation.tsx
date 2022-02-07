import React from 'react';
import { get } from 'lodash';

export type Translations = Record<string, Record<string, Record<string, string>>>;
export type TFunction = (key: string, replacements?: Record<string, string>) => string;

type TranslationContextValue = {
  translations: Translations;
  t: TFunction;
  lang: string;
  languages: string[];
  setLang: (newLang: string) => void;
};

const TranslationContext = React.createContext<TranslationContextValue | undefined>(undefined);

export const TranslationContextProvider: React.FC<{ translations: Translations }> = React.memo(
  ({ children, translations }) => {
    const [lang, setLang] = React.useState('en');
    const fallbackLanguage = 'en';
    const languages = React.useMemo<string[]>(() => Object.keys(translations), [translations]);

    const t: TFunction = React.useCallback<TFunction>(
      (fullKey: unknown, replacements?: Record<string, string>): string => {
        if (!fullKey || typeof fullKey !== 'string') {
          console.error('Translation key must be a non-empty string');
          return `${fullKey}`;
        }
        let key = fullKey;
        let namespace = 'default';
        const colonPos = fullKey.indexOf(':');
        if (~colonPos) {
          namespace = fullKey.slice(0, colonPos);
          key = fullKey.slice(colonPos + 1);
        }

        let translation = get(translations, [lang, namespace, key]);

        if (!translation && fallbackLanguage !== lang) {
          const fallbackTranslation = get(translations, [fallbackLanguage, namespace, key]);
          if (fallbackTranslation) {
            console.warn(
              `No translation was found for ${fullKey} in ${lang}, using one from ${fallbackLanguage} instead`
            );
            translation = fallbackTranslation;
          }
        }

        if (!translation) {
          console.error(`No translation found for ${fullKey}`);
          return key;
        }

        if (replacements) {
          translation = translation.replace(/\{\{(\w+)\}\}/g, (full, w) => {
            if (replacements[w]) {
              return replacements[w];
            }
            return full;
          });
        }

        return translation;
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
