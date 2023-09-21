// API Response - League Name, Team Name and Ranking
{
    "Premier League": [
      {
        "team_name": "Team A",
        "ranking": 1
      },
      {
        "team_name": "Team B",
        "ranking": 2
      },
    ],
    "La Liga": [
      {
        "team_name": "Team X",
        "ranking": 1
      },
      {
        "team_name": "Team Y",
        "ranking": 2
      },
    ],
}


// DB Response - Continent ID, Country ID, Team Id, Team Name
{
    "teamsResponse": [
      {
        "continent_id": 1,
        "country_id": 24,
        "team_id": 732,
        "team_name": "Team A"
      },
      {
        "continent_id": 1,
        "country_id": 24,
        "team_id": 23,
        "team_name": "Team B"
      },
      // ... other teams
    ],  // league Name, League Id
    "leagueResponse": [
      {
        "league_id": 1,
        "league_name": "Premier League",
      },
      {
        "league_id": 2,
        "league_name": "La Liga",
      },
      // ... other leagues
    ]
  }


  /// DON'T NEED CONTINENT NAME?
  


  // Final Results
  [
    {
        "league_id": 1,
        "team_name": "Team A",
        "ranking": 1,
        "continent_id": 1,
        "country_id": 24,
        "team_id": 732
    },
    {
        "league_id": 1,
        "team_name": "Team B",
        "ranking": 2,
        "continent_id": 1,
        "country_id": 24,
        "team_id": 23
    },
    {
        "league_id": 2,
        "team_name": "Team X",
        "ranking": 1,
        "continent_id": 1,
        "country_id": 24,
        "team_id": 732
    },
    {
        "league_id": 2,
        "team_name": "Team Y",
        "ranking": 2,
        "continent_id": 1,
        "country_id": 24,
        "team_id": 23
    }
]
