import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const STORAGE_KEY = '@bp_lang';

export type Lang = 'en' | 'si';

const translations: Record<Lang, Record<string, string>> = {
  en: {
    title: 'PEPPER DOCTOR',
    settings: 'Settings',
    theme: 'Theme',
    language: 'Language',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    home: 'Home',
    upload: 'Upload',
    history: 'History',
    account: 'Account',
    preview: 'Preview Image',
    analyze: 'Analyze Disease',
  },
  si: {
    title: 'කහ මිරිස් වෛද්‍යවරු',
    settings: 'සැකසුම්',
    theme: 'තේමා',
    language: 'භාෂාව',
    system: 'පද්ධතිය',
    light: 'සුළඟ',
    dark: 'අඳුරු',
    home: 'මුල් පිටුව',
    upload: 'උඩුගත කරන්න',
    history: 'ඉතිහාසය',
    account: 'ගිණුම',
    preview: 'පෙරදසුන',
    analyze: 'රෝග විශ්ලේෂණය',
  },
};

export async function getStoredLang(): Promise<Lang> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return 'en';
    return (raw as Lang) || 'en';
  } catch (e) {
    return 'en';
  }
}

export async function setStoredLang(lang: Lang) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    // ignore
  }
}

export function useTranslation() {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const l = await getStoredLang();
      if (!mounted) return;
      setLang(l);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const t = (key: string) => {
    return translations[lang]?.[key] ?? translations.en[key] ?? key;
  };

  return { t, lang, setLang } as const;
}
