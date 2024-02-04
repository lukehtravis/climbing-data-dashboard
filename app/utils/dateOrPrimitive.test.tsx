import { dateOrPrimitive } from './dateOrPrimitive'

describe('dateOrPrimitive', () => {
  it('should return the month and year in "mm/yyyy" format for Date inputs', () => {
    const date = new Date('2024-02-15')
    const expectedResult = '02/2024'
    const result = dateOrPrimitive(date)
    expect(result).toEqual(expectedResult)
  })

  it('should return the original string for string inputs', () => {
    const input = 'test string'
    const result = dateOrPrimitive(input)
    expect(result).toBe(input)
  })

  it('should return the original number for number inputs', () => {
    const input = 123
    const result = dateOrPrimitive(input)
    expect(result).toBe(input)
  })

  it('should return the original boolean for boolean inputs', () => {
    const input = true
    const result = dateOrPrimitive(input)
    expect(result).toBe(input)
  })

  it('should handle edge cases like empty strings, 0, and false correctly', () => {
    expect(dateOrPrimitive('')).toBe('')
    expect(dateOrPrimitive(0)).toBe(0)
    expect(dateOrPrimitive(false)).toBe(false)
  })
})
