import { describe, expect, test } from 'vitest'
import { en } from '../i18n/en'
import { fa } from '../i18n/fa'
import { fr } from '../i18n/fr'
import { zhHans } from '../i18n/zhHans'
import { zhHant } from '../i18n/zhHant'
import { offers } from './offers'

describe('package comparison', () => {
  test('every plan answers every row of the comparison, in every language', () => {
    for (const copy of [en, fr, fa, zhHans, zhHant]) {
      const offer = offers[copy.locale]
      expect(offer.plans, copy.locale).toHaveLength(2)
      for (const plan of offer.plans) {
        expect(plan.items, `${copy.locale} ${plan.name}`).toHaveLength(copy.package.groups.length)
        for (const item of plan.items) expect(item.trim().length).toBeGreaterThan(0)
      }
      expect(copy.package.included.length).toBeGreaterThan(0)
    }
  })
})
