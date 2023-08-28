DROP DATABASE leauges;
CREATE DATABASE leagues;
USE leagues;

-- Basic information on leagues
CREATE TABLE leagues (
	league_id int PRIMARY KEY, 
    league_name varchar(255) NOT NULL,
    continent_id int NOT NULL,
    country_id int NOT NULL
);

-- Basic information on teams
CREATE TABLE teams (
	continent_id int NOT NULL,
    leauge_id int NOT NULL,
    team_id int PRIMARY KEY,
    
    -- Goes into league table
    team_name varchar(255) NOT NULL,
    league_ranking int NOT NULL,
    team_emblem varchar(255) NOT NULL,
    
    -- Table Results
    wins int DEFAULT 0,
    draws int DEFAULT 0,
    losses int DEFAULT 0,
    goals_for int DEFAULT 0,
    goals_against int DEFAULT 0,
    goal_difference int DEFAULT 0,
    form varchar(5) DEFAULT 0,
    
    -- Next Opponent
    next_league_match_id int NOT NULL,
    next_cup_match_id int NOT NULL
);

-- League Tables
CREATE TABLE league_table (
	continent_id int NOT NULL, 
    country_id int NOT NULL,
    league_id INT NOT NULL,
    -- Use team ID to gather information on teams, positions etc
    team_id int NOT NULL,
    
    FOREIGN KEY (league_id) REFERENCES leagues(league_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

USE international_tournaments;

-- List of each tournament and which teams are in the tournament
CREATE TABLE i_tournaments (
	tournament_id int PRIMARY KEY,
    tournament_name varchar(255) NOT NULL,
    continent_ID int NOT NULL,
    -- Teams involved in the tournaments
    team_id int NOT NULL
);

-- Hold data on tournaments
-- Who is playing and the results
CREATE TABLE i_tournament_table (
	tournament_id int NOT NULL,
    team_id int NOT NULL,
    round_id int PRIMARY KEY,
    cup_round varchar(255),
    next_cup_match_id int NOT NULL,
    
    -- Cup Results
    cup_wins int DEFAULT 0,
    cup_draws int DEFAULT 0,
    cup_losses int DEFAULT 0,
    cup_gf int DEFAULT 0,
    cup_ga int DEFAULT 0,
    cup_gd int DEFAULT 0,
    cup_form varchar(5),
    
    FOREIGN KEY (tournament_id) REFERENCES i_tournaments(tournament_id)
)