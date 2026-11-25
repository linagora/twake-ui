import { getI18n } from 'twake-i18n'

import de from './de.json' with { type: 'json' }
import en from './en.json' with { type: 'json' }
import es from './es.json' with { type: 'json' }
import fr from './fr.json' with { type: 'json' }
import it from './it.json' with { type: 'json' }
import ru from './ru.json' with { type: 'json' }
import vi from './vi.json' with { type: 'json' }

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
