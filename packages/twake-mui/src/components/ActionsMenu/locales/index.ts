import { getI18n } from 'twake-i18n'

import de from './de.json'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import it from './it.json'
import ru from './ru.json'
import vi from './vi.json'

export const locales = { de, en, es, fr, it, ru, vi }

export type ActionTranslate = (
  key: string,
  options?: Record<string, unknown>
) => string

type Lang = keyof typeof locales

const isLang = (lang: string): lang is Lang => lang in locales

/** Translates outside React, since actions are built before being rendered */
export const getActionsI18n = (): { t: ActionTranslate } => {
  const i18n: { t: ActionTranslate } = getI18n(
    undefined,
    (lang: string) => (isLang(lang) ? locales[lang] : locales.en),
    undefined
  )

  return { t: i18n.t }
}
