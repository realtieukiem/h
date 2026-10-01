import type { Locale, Localized } from '../data/types';
import { en, type Strings } from './en';
import { vi } from './vi';

const dictionaries: Record<Locale, Strings> = { en, vi };

export const getStrings = (locale: Locale): Strings => dictionaries[locale];

export const pick = (value: Localized, locale: Locale): string => value[locale] ?? value.en;

export const isPlaceholder = (value: string): boolean => /^\[.*\]$/.test(value.trim());
