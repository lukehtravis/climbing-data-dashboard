import { describe, expect, test } from '@jest/globals'
import { getColumnsByName } from './getColumnsByName'

const data = [
  {
    Date: '2023-09-04',
    Route: 'Notorious B.E.G., The',
    Rating: '5.11c',
    Notes: 'Fell at crux again. Blew my finger open and bled all over the wall',
    URL: 'https://www.mountainproject.com/route/107210577/notorious-beg-the',
    Pitches: '1',
    Location: "California > Sierra Eastside > Bishop Area > Pine Creek Canyon > Scheelite Canyon / Pratt's Crack Gully > Mustache Wall",
    'Avg Stars': '3.0',
    'Your Stars': '-1',
    Style: 'Lead',
    'Lead Style': 'Fell/Hung',
    'Route Type': 'Sport',
    'Your Rating': '',
    Length: '80',
    'Rating Code': '5200',
    'Converted Grade': 17,
  },
  {
    Date: '2023-09-04',
    Route: 'Prada',
    Rating: '5.8',
    Notes: '',
    URL: 'https://www.mountainproject.com/route/108673645/prada',
    Pitches: '1',
    Location: 'California > Sierra Eastside > Bishop Area > Pine Creek Canyon > Fashion Slab',
    'Avg Stars': '2.1',
    'Your Stars': '-1',
    Style: 'Lead',
    'Lead Style': 'Onsight',
    'Route Type': 'Sport',
    'Your Rating': '',
    Length: '95',
    'Rating Code': '2100',
    'Converted Grade': 9,
  },
]

describe('Testing getColumnsByName', () => {
  test('Valid string passed in returns valid answer', () => {
    expect(getColumnsByName(data, ['Route', 'Rating'])).toStrictEqual([
      { Rating: '5.11c', Route: 'Notorious B.E.G., The' },
      { Rating: '5.8', Route: 'Prada' },
    ])
  })
})
