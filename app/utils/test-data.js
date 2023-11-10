const testData = [
  {
    "Date": "2022-01-01",
    "Route": "Divine Comedy",
    "Rating": "5.10a",
    "Notes": "",
    "URL": "https://www.mountainproject.com/route/109868733/divine-comedy",
    "Pitches": "1",
    "Location": "Nevada > Southern Nevada > Red Rocks > (03) First Pullout (Calico I) > Dante's Wall",
    "Avg Stars": "3.3",
    "Your Stars": "3",
    "Style": "Lead",
    "Lead Style": "",
    "Route Type": "Sport",
    "Your Rating": "5.10c PG13",
    "Length": "65",
    "Rating Code": "2600",
    "Converted Grade": 11
  },
  {
    "Date": "2017-02-19",
    "Route": "Major Dude",
    "Rating": "5.10d",
    "Notes": "",
    "URL": "https://www.mountainproject.com/route/121767692/major-dude",
    "Pitches": "1",
    "Location": "California > San Francisco Bay Area > Wine Country/Northeast Bay > Mount St. Helena > Near Side",
    "Avg Stars": "2.8",
    "Your Stars": "2",
    "Style": "Lead",
    "Lead Style": "Onsight",
    "Route Type": "Sport",
    "Your Rating": "5.10d",
    "Length": "60",
    "Rating Code": "3500",
    "Converted Grade": 14
  },
  {
    "Date": "2023-03-31",
    "Route": "Big Favor",
    "Rating": "5.10c",
    "Notes": "",
    "URL": "https://www.mountainproject.com/route/114150541/big-favor",
    "Pitches": "1",
    "Location": "Nevada > Southern Nevada > La Madre Range > Lone Mountain > Urban Crag",
    "Avg Stars": "2.7",
    "Your Stars": "3",
    "Style": "Lead",
    "Lead Style": "Redpoint",
    "Route Type": "Sport",
    "Your Rating": "",
    "Length": "50",
    "Rating Code": "3200",
    "Converted Grade": 13
  },
  {
    "Date": "2023-04-01",
    "Route": "Cactus Juice",
    "Rating": "5.9",
    "Notes": "",
    "URL": "https://www.mountainproject.com/route/121862988/cactus-juice",
    "Pitches": "1",
    "Location": "Nevada > Southern Nevada > Red Rocks > (03) First Pullout (Calico I) > Cactus Massacre",
    "Avg Stars": "2.4",
    "Your Stars": "-1",
    "Style": "Lead",
    "Lead Style": "Onsight",
    "Route Type": "Sport",
    "Your Rating": "",
    "Length": "75",
    "Rating Code": "2400",
    "Converted Grade": 10
  },
  {
    "Date": "2019-05-04",
    "Route": "Bench Wall",
    "Rating": "V2 R",
    "Notes": "",
    "URL": "https://www.mountainproject.com/route/105734576/bench-wall",
    "Pitches": "1",
    "Location": "California > San Francisco Bay Area > East Bay Area > Berkeley > Mortar Rock",
    "Avg Stars": "2.8",
    "Your Stars": "4",
    "Style": "Send",
    "Lead Style": "",
    "Route Type": "Boulder",
    "Your Rating": "V3 R",
    "Length": "20",
    "Rating Code": "20200"
  },
  {
    "Date": "2020-06-11",
    "Route": "The Crimper",
    "Rating": "V1",
    "Notes": "",
    "URL": "https://www.mountainproject.com/route/117736618/the-crimper",
    "Pitches": "1",
    "Location": "California > San Francisco Bay Area > Marin/Northwest Bay Area > Ring Mountain > Turtle Rock",
    "Avg Stars": "2.2",
    "Your Stars": "3",
    "Style": "Send",
    "Lead Style": "",
    "Route Type": "Boulder",
    "Your Rating": "",
    "Length": "10",
    "Rating Code": "20100"
  },
  {
    "Date": "2022-07-30",
    "Route": "Mogoright",
    "Rating": "5.11a",
    "Notes": "",
    "URL": "https://www.mountainproject.com/route/121457249/mogoright",
    "Pitches": "1",
    "Location": "California > San Francisco Bay Area > Marin/Northwest Bay Area > Mickey's Beach > Motown",
    "Avg Stars": "2.9",
    "Your Stars": "4",
    "Style": "Lead",
    "Lead Style": "Redpoint",
    "Route Type": "Sport",
    "Your Rating": "",
    "Length": "70",
    "Rating Code": "4700",
    "Converted Grade": 15
  },
  {
    "Date": "2021-09-13",
    "Route": "Mantle",
    "Rating": "V0",
    "Notes": "",
    "URL": "https://www.mountainproject.com/route/106647637/mantle",
    "Pitches": "1",
    "Location": "California > San Francisco Bay Area > South Bay Area > Castle Rock Area > * Castle Rock Area Bouldering > Indian Rock Side > Indian Cracks",
    "Avg Stars": "2.3",
    "Your Stars": "-1",
    "Style": "Flash",
    "Lead Style": "",
    "Route Type": "Boulder",
    "Your Rating": "",
    "Length": "10",
    "Rating Code": "20008"
  },{
    "Date": "2022-08-28",
    "Route": "Oh Zone",
    "Rating": "5.10c",
    "Notes": "",
    "URL": "https://www.mountainproject.com/route/105912935/oh-zone",
    "Pitches": "1",
    "Location": "California > Sierra Eastside > Mammoth Lakes Area > Warming Wall",
    "Avg Stars": "2.2",
    "Your Stars": "4",
    "Style": "Lead",
    "Lead Style": "Onsight",
    "Route Type": "Sport",
    "Your Rating": "5.10d PG13",
    "Length": "50",
    "Rating Code": "3200",
    "Converted Grade": 13
  },
  {
    "Date": "2022-10-23",
    "Route": "Fake News",
    "Rating": "5.10a",
    "Notes": "",
    "URL": "https://www.mountainproject.com/route/112910350/fake-news",
    "Pitches": "1",
    "Location": "California > Lake Tahoe > I-80 Corridor > Bowman/Emeralds > The Emeralds > The Benches > Kudos Cliff > Kudos Right",
    "Avg Stars": "2.5",
    "Your Stars": "2",
    "Style": "Lead",
    "Lead Style": "Onsight",
    "Route Type": "Sport",
    "Your Rating": "",
    "Length": "50",
    "Rating Code": "2600",
    "Converted Grade": 11
  },
  {
    "Date": "2021-11-07",
    "Route": "Community Chest",
    "Rating": "5.7",
    "Notes": "",
    "URL": "https://www.mountainproject.com/route/105735212/community-chest",
    "Pitches": "1",
    "Location": "California > Lake Tahoe > I-80 Corridor > Auburn and Grass Valley > Auburn SRA > Cave Valley (aka Auburn Quarry) > Memorial Wall",
    "Avg Stars": "1.6",
    "Your Stars": "-1",
    "Style": "Lead",
    "Lead Style": "Flash",
    "Route Type": "Sport",
    "Your Rating": "",
    "Length": "40",
    "Rating Code": "1900",
    "Converted Grade": 8
  },
  {
    "Date": "2023-12-31",
    "Route": "Yaak Crack",
    "Rating": "5.11c",
    "Notes": "Got to last bolt",
    "URL": "https://www.mountainproject.com/route/105732374/yaak-crack",
    "Pitches": "1",
    "Location": "Nevada > Southern Nevada > Red Rocks > (04) Second Pullout (Calico II) > The Gallery",
    "Avg Stars": "3.6",
    "Your Stars": "-1",
    "Style": "Lead",
    "Lead Style": "Fell/Hung",
    "Route Type": "Sport",
    "Your Rating": "",
    "Length": "70",
    "Rating Code": "5200",
    "Converted Grade": 17
  }
]