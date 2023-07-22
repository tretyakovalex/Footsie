
// TODO:

export const TEMP_SAKA_STATS = {
    "Status": {
        "retired": false,
        "free agent": false,
        "playing": true,
        "on loan": false
    },
    "Data": {
        "All Teams": ["Arsenal", "Manchester City", "Real Madrid", "Bayern Munich", "Barcelona"],
        "Current Team": "Arsenal",
    },
    "Teams": {
        "Arsenal": {
            "TeamName": "Arsenal",
            "TeamLogo": "https://logos-world.net/wp-content/uploads/2020/05/Arsenal-Logo-700x394.png",
            "Joined": 2018,
            "Left": 2025
        },
        "Manchester City": {
            "TeamName": "Manchester City",
            "TeamLogo": "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/190px-Manchester_City_FC_badge.svg.png",
            "Joined": 2026,
            "Left": 2030
        },
        "Real Madrid": {
            "TeamName": "Real Madrid",
            "TeamLogo": "https://logowik.com/content/uploads/images/545_realmadridfc.jpg",
            "Joined": 2031,
            "Left": 2035
        },
        "Bayern Munich": {
            "TeamName": "Bayern Munich",
            "TeamLogo": "https://logowik.com/content/uploads/images/857_fcbayernmunich.jpg",
            "Joined": 2036,
            "Left": 2040
        },
        "Barcelona": {
            "TeamName": "Barcelona",
            "TeamLogo": "https://logowik.com/content/uploads/images/802_fcbarcelona.jpg",
            "Joined": 2041,
            "Left": 2045
        }
    },
    "Attacking": {
        "Arsenal": {
            "Goals": 10,
            "Assists": 15,
            "Shots on Target": 25,
            "Key Passes": 20,
            "Dribbles Completed": 18,
            "Crosses": 12
        },
        "Manchester City": {
            "Goals": 8,
            "Assists": 12,
            "Shots on Target": 18,
            "Key Passes": 22,
            "Dribbles Completed": 16,
            "Crosses": 10
        },
        "Real Madrid": {
            "Goals": 6,
            "Assists": 10,
            "Shots on Target": 20,
            "Key Passes": 18,
            "Dribbles Completed": 14,
            "Crosses": 8
        },
        "Bayern Munich": {
            "Goals": 7,
            "Assists": 14,
            "Shots on Target": 22,
            "Key Passes": 25,
            "Dribbles Completed": 20,
            "Crosses": 15
        },
        "Barcelona": {
            "Goals": 9,
            "Assists": 18,
            "Shots on Target": 23,
            "Key Passes": 24,
            "Dribbles Completed": 22,
            "Crosses": 14
        }
    },
    "Defensive": {
        "Arsenal": {
            "Tackles": 30,
            "Interceptions": 12,
            "Clearances": 20,
            "Aerial Duels Won": 8,
            "Recoveries": 35,
            "Fouls Committed": 15
        },
        "Manchester City": {
            "Tackles": 28,
            "Interceptions": 15,
            "Clearances": 18,
            "Aerial Duels Won": 10,
            "Recoveries": 30,
            "Fouls Committed": 12
        },
        "Real Madrid": {
            "Tackles": 32,
            "Interceptions": 10,
            "Clearances": 22,
            "Aerial Duels Won": 6,
            "Recoveries": 32,
            "Fouls Committed": 14
        },
        "Bayern Munich": {
            "Tackles": 35,
            "Interceptions": 14,
            "Clearances": 25,
            "Aerial Duels Won": 7,
            "Recoveries": 40,
            "Fouls Committed": 16
        },
        "Barcelona": {
            "Tackles": 29,
            "Interceptions": 18,
            "Clearances": 19,
            "Aerial Duels Won": 9,
            "Recoveries": 36,
            "Fouls Committed": 13
        }
    },
    "Current Season": {
        "Total Appearances": 20,
        "Goals": 5,
        "Assists": 10,
        "Shots on Target": 10,
        "Key Passes": 15,
        "Dribbles Completed": 12,
        "Crosses": 8
    }
}

export const FAKE_TEAM_STATS = {
    "TeamName": "Example United",
    "Image": "https://example.com/team_logo.png",
    "CurrentSeason": "2023-2024",
    "Squad": {
      "Player 1": { "KitNumber": 10 },
      "Player 2": { "KitNumber": 7 },
      "Player 3": { "KitNumber": 22 },
      "Player 4": { "KitNumber": 16 },
      "Player 5": { "KitNumber": 4 },
      "Player 6": { "KitNumber": 19 },
      "Player 7": { "KitNumber": 5 },
      "Player 8": { "KitNumber": 11 },
      "Player 9": { "KitNumber": 8 },
      "Player 10": { "KitNumber": 14 },
      "Player 11": { "KitNumber": 9 },
      "Player 12": { "KitNumber": 20 },
      "Player 13": { "KitNumber": 18 },
      "Player 14": { "KitNumber": 15 },
      "Player 15": { "KitNumber": 13 },
      "Player 16": { "KitNumber": 6 },
      "Player 17": { "KitNumber": 3 },
      "Player 18": { "KitNumber": 21 },
      "Player 19": { "KitNumber": 2 },
      "Player 20": { "KitNumber": 12 },
      "Player 21": { "KitNumber": 17 },
      "Player 22": { "KitNumber": 1 }
    },
    "Starting11": [
      "Player 1",
      "Player 2",
      "Player 3",
      "Player 4",
      "Player 5",
      "Player 6",
      "Player 7",
      "Player 8",
      "Player 9",
      "Player 10",
      "Player 11"
    ],
    "Subs": [
      "Player 12",
      "Player 13",
      "Player 14",
      "Player 15",
      "Player 16",
      "Player 17",
      "Player 18"
    ],
    "OnLoan": [
      "Player 19",
      "Player 20",
      "Player 21"
    ],
    "Injured": [
      "Player 7",
      "Player 14",
      "Player 22"
    ],
    "Manager": {
      "Name": "John Doe",
      "Nationality": "English",
      "Age": 45,
      "Image": "https://example.com/manager_image.png"
    },
    "PlayerStats": {
        "Player 1": {
            "Goals": 15,
            "Assists": 10,
            "Appearances": 30,
            "YellowCards": 2,
            "RedCards": 0
          },
          "Player 2": {
            "Goals": 8,
            "Assists": 12,
            "Appearances": 28,
            "YellowCards": 3,
            "RedCards": 1
          },
          "Player 3": {
            "Goals": 10,
            "Assists": 5,
            "Appearances": 25,
            "YellowCards": 1,
            "RedCards": 0
          },
          "Player 4": {
            "Goals": 5,
            "Assists": 3,
            "Appearances": 20,
            "YellowCards": 0,
            "RedCards": 0
          },
          "Player 5": {
            "Goals": 3,
            "Assists": 7,
            "Appearances": 22,
            "YellowCards": 2,
            "RedCards": 0
          },
          "Player 6": {
            "Goals": 12,
            "Assists": 8,
            "Appearances": 27,
            "YellowCards": 1,
            "RedCards": 0
          },
          "Player 7": {
            "Goals": 2,
            "Assists": 3,
            "Appearances": 18,
            "YellowCards": 2,
            "RedCards": 1
          },
          "Player 8": {
            "Goals": 7,
            "Assists": 9,
            "Appearances": 26,
            "YellowCards": 1,
            "RedCards": 0
          },
          "Player 9": {
            "Goals": 9,
            "Assists": 6,
            "Appearances": 23,
            "YellowCards": 3,
            "RedCards": 0
          },
          "Player 10": {
            "Goals": 18,
            "Assists": 5,
            "Appearances": 31,
            "YellowCards": 0,
            "RedCards": 0
          },
          "Player 11": {
            "Goals": 20,
            "Assists": 11,
            "Appearances": 29,
            "YellowCards": 1,
            "RedCards": 0
          },
          "Player 12": {
            "Goals": 3,
            "Assists": 2,
            "Appearances": 15,
            "YellowCards": 1,
            "RedCards": 0
          },
          "Player 13": {
            "Goals": 1,
            "Assists": 1,
            "Appearances": 12,
            "YellowCards": 0,
            "RedCards": 0
          },
          "Player 14": {
            "Goals": 4,
            "Assists": 3,
            "Appearances": 17,
            "YellowCards": 2,
            "RedCards": 0
          },
          "Player 15": {
            "Goals": 6,
            "Assists": 7,
            "Appearances": 24,
            "YellowCards": 0,
            "RedCards": 0
          },
          "Player 16": {
            "Goals": 2,
            "Assists": 5,
            "Appearances": 19,
            "YellowCards": 1,
            "RedCards": 0
          },
          "Player 17": {
            "Goals": 1,
            "Assists": 3,
            "Appearances": 16,
            "YellowCards": 2,
            "RedCards": 0
          },
          "Player 18": {
            "Goals": 2,
            "Assists": 4,
            "Appearances": 21,
            "YellowCards": 1,
            "RedCards": 0
          },
          "Player 19": {
            "Goals": 4,
            "Assists": 1,
            "Appearances": 14,
            "YellowCards": 0,
            "RedCards": 0
          },
          "Player 20": {
            "Goals": 1,
            "Assists": 2,
            "Appearances": 13,
            "YellowCards": 1,
            "RedCards": 0
          },
          "Player 21": {
            "Goals": 3,
            "Assists": 6,
            "Appearances": 20,
            "YellowCards": 1,
            "RedCards": 0
          },
          "Player 22": {
            "Goals": 0,
            "Assists": 0,
            "Appearances": 8,
            "YellowCards": 0,
            "RedCards": 0
          }
    },
    "Competitions": {
      "PremierLeague": {
        "Stage": "Ongoing",
        "Rank": 3,
        "Image": "https://example.com/premier_league.png"
      },
      "ChampionsLeague": {
        "Stage": "Quarter-finals",
        "Rank": null,
        "Image": "https://example.com/champions_league.png"
      },
      "FACup": {
        "Stage": "Final",
        "Rank": null,
        "Image": "https://example.com/fa_cup.png"
      }
      // Add more competitions with their respective images
    }
  }
  