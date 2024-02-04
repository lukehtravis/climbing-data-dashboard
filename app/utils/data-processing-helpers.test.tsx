import { describe, expect, test } from '@jest/globals'
import { mappingMpCodesToYdsGrades } from './data-processing-helpers'

describe('Testing mappingMpCodesToYdsGrades', () => {
  test('Valid string passed in returns valid answer', () => {
    expect(mappingMpCodesToYdsGrades('800')).toBe('3rd')
  })
})
