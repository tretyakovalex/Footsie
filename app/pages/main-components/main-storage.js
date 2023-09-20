// What is shown for the name of each tab
export const tabNames = {
  news: [{ name: 'Major' }, { name: 'News' }, { name: 'Favourites' }],
  matches: [
    { name: 'Favourites' },
    { name: 'Live' },
    { name: 'Upcoming' },
    { name: 'Results' },
  ],
  favourites: [
    { name: 'Matches' },
    { name: 'Players' },
    { name: 'News' },
    { name: 'Tournaments' },
  ],
  tournaments: [
    { name: 'National' },
    { name: 'International' },
    { name: 'Intercontinental' },
  ],
};


// What is shown whenever refreshing the page
export const refreshTitles = [
  // News
  ['Updating News'],
  // Matches
  [
    'Fetching Favourite Matches',
    'Fetching Live Matches',
    'Fetching Upcoming Matches',
    'Fetching Results',
  ],
  // Favourites
  [
    'Fetching Matches',
    'Fetching Players',
    'Fetching News',
    'Fetching Tournaments',
  ],
  // Tournaments
  [
    'Fetching National Tournments',
    'Fetching International Tournaments',
    'Fetching Intercontinental Tournaments',
  ],
  // Statistics
  ['Statistics Coming Soon'],
]

// Represent the pages by name
export const pageByName = [
  'news',
  'matches',
  'favourites',
  'tournaments',
  'search',
]

// Represent Tabs By name
export const tabByName = [
  ['major', 'everyday', 'favourite'],
  ['favourite', 'live', 'upcoming', 'results'],
  ['Matches', 'Players', 'News', 'Tournaments'],
  ['national', 'international', 'intercontinental'],
  ['default'],
];