-- Information on the teams
CREATE DATABASE teams;
USE teams;

-- Basic information on a team
CREATE TABLE squads (
	team_id int NOT NULL,
    kit_number int NOT NULL,
    active_players int PRIMARY KEY,
    player_id int NOT NULL,
    first_name varchar(255) NOT NULL,
    second_name varchar(255) NOT NULL,
    position_name varchar(255) NOT NULL,
    role_id int NOT NULL
);

-- Statistics on the actual team
CREATE TABLE team_statistics (
	-- Search Teams
    continent_id int NOT NULL,
    country_id int NOT NULL,
	league_id int NOT NULL,
	team_id int NOT NULL,
    
    -- Statistics
	goals int DEFAULT 0,
    goals_per_game int DEFAULT 0,
    shots_per_game int DEFAULT 0,
    big_chances_creation int DEFAULT 0,
    possession decimal(5,2) DEFAULT 0.0,
    pass_completion_rates decimal(5,2) DEFAULT 0.0,
    forward_passing int DEFAULT 0,
    backward_passing int DEFAULT 0,
    cross_accuracy decimal(5,2) DEFAULT 0.0,
    clean_sheets int DEFAULT 0,
    penalty_conversion decimal(5,2) DEFAULT 0.0,
    tackles_success_rate decimal(5,2) DEFAULT 0.0,
    interceptions int DEFAULT 0,
    aerial_duels_win int DEFAULT 0,
    defensive_errors int DEFAULT 0,
    fouls int DEFAULT 0,
    yellow_cards int DEFAULT 0,
    red_cards int DEFAULT 0
);

-- Information on the players
CREATE DATABASE players;
USE players;

-- Is a player an Attacker, Defender, Goalkeeper or Unknown
CREATE TABLE roles (
    role_id int PRIMARY KEY,
    player_id int NOT NULL,
    role_name varchar(255)
);

-- Basic information on a player
CREATE TABLE players (
	-- Search Players
	team_id int NOT NULL,
    country_id int NOT NULL,
    player_id int PRIMARY KEY,
    
    -- Specific Information
    role_id int NOT NULL,
    player_image varchar(255) NOT NULL,
    player_group_id int DEFAULT 4,
	player_status varchar(255) DEFAULT 'playing', -- Injured, On Loan, Retired, Playing
    
    FOREIGN KEY (role_id) REFERENCES roles(role_id) 
);

-- General statistics on a player such as goals scored and assists
CREATE TABLE general_statistics (
	player_id int NOT NULL,
	current_club_appearances int DEFAULT 0,
	goals int DEFAULT 0,
    assists int DEFAULT 0,
    fouls int DEFAULT 0,
    yellow_cards int DEFAULT 0,
    red_cards int DEFAULT 0,
    
    FOREIGN KEY (player_id) REFERENCES players(player_id)
);

CREATE TABLE attacker_statistics (
	player_id int NOT NULL,
    position_name varchar(255) DEFAULT 'attacker',
    shots_on_target int DEFAULT 0,
    total_shots int DEFAULT 0,
    shot_accuracy decimal(5, 2) DEFAULT 0.00,
    chances_created int DEFAULT 0,
    successful_dribbles int DEFAULT 0,
    passing_accuracy decimal(5, 2) DEFAULT 0.00,
    interceptions int DEFAULT 0,
    tackles_won int DEFAULT 0,
    aerial_duels_won int DEFAULT 0,
    fouls_committed int DEFAULT 0,
    fouls_suffered int DEFAULT 0,
    minutes_played int DEFAULT 0,
    
    FOREIGN KEY (player_id) REFERENCES players(player_id)
);

CREATE TABLE defender_statistics (
	player_id int PRIMARY KEY,
    position_name varchar(255) DEFAULT 'defender',
    tackles decimal(5, 2) DEFAULT 0.00,
    interceptions decimal(5, 2) DEFAULT 0.00,
    clearances decimal(5, 2) DEFAULT 0.00,
    blocks decimal(5, 2) DEFAULT 0.00,
    aerial_duels_won decimal(5, 2) DEFAULT 0.00,
    duels_won decimal(5, 2) DEFAULT 0.00,
    dribbled_past decimal(5, 2) DEFAULT 0.00,
    
    FOREIGN KEY (player_id) REFERENCES players(player_id)
);

CREATE TABLE goalkeeper_statistics (
	player_id int ,
    position_name varchar(255) DEFAULT 'goalkeeper',
    goals_conceded decimal(5, 2) DEFAULT 0,
    clean_sheets decimal(5, 2) DEFAULT 0,
    saves decimal(5, 2) DEFAULT 0,
    save_percentage decimal(5, 2) DEFAULT 0,
    penalty_saves decimal(5, 2) DEFAULT 0,
    catches decimal(5, 2) DEFAULT 0,
    punches decimal(5, 2) DEFAULT 0,
    
    FOREIGN KEY (player_id) REFERENCES players(player_id)
);

-- TODO:
--    Create database for previous teams


