import { describe, expect, it } from 'vitest'
import { getRules } from '../src/rule'
import { isMatched } from '../src'

describe('should', () => {
  const rules = getRules()
  it('exported', () => {
    const attrs = ['flex', 'sm:op30']
    for (const attr of attrs) {
      const res = rules.some(rule => isMatched(rule, attr))
      expect(res).toEqual(true)
    }
  })
})
