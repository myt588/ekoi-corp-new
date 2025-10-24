/**
 * Core type definitions for EKOI Corporate Website
 */

/**
 * Translated string interface for multilingual content
 */
export interface TranslatedString {
  en: string;
  ja: string;
}

/**
 * Supported locales
 */
export type Locale = 'en' | 'ja';

/**
 * Common props for components with locale support
 */
export interface LocaleProps {
  locale: Locale;
}
