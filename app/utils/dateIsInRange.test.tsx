import { describe, expect, test } from '@jest/globals'
import { dateIsInRange } from './dateIsInRange'

describe('Testing dateIsInRange', () => {
  test('Valid dates are passed in and target item is in range', () => {
    expect(
      dateIsInRange(
        new Date('July 20, 2020 20:17:40 GMT+00:00'),
        new Date('July 20, 2022 20:17:40 GMT+00:00'),
        new Date('July 20, 2021 20:17:40 GMT+00:00')
      )
    ).toBe(true)
  })
  test('inValid input is passed in', () => {
    expect(
      dateIsInRange(new Date('Ju00'), new Date('July 20, 2022 20:17:40 GMT+00:00'), new Date('July 20, 2021 20:17:40 GMT+00:00'))
    ).toBe(false)
  })
  test('passed in value is outside of range', () => {
    expect(
      dateIsInRange(
        new Date('July 20, 2020 20:17:40 GMT+00:00'),
        new Date('July 20, 2022 20:17:40 GMT+00:00'),
        new Date('July 20, 2023 20:17:40 GMT+00:00')
      )
    ).toBe(false)
  })
  test('to and from are passed in backwards, but number is in range', () => {
    expect(
      dateIsInRange(
        new Date('July 20, 2023 20:17:40 GMT+00:00'),
        new Date('July 20, 2021 20:17:40 GMT+00:00'),
        new Date('July 20, 2022 20:17:40 GMT+00:00')
      )
    ).toBe(false)
  })
  test('nothing is passed in', () => {
    expect(dateIsInRange()).toBe(false)
  })
})
