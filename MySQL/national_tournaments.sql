USE leagues;

-- TODO:
--   Need to update Teams -> Differnt tournaments

CREATE TABLE national_tournaments (
	league_id int NOT NULL,
    country_id int NOT NULL,
	tournament_id int PRIMARY KEY,
    tournament_name varchar(255),
    tournament_emblem varchar(255)
);

CREATE TABLE n_tournaments (
	country_id int NOT NULL,
    tournament_id int NOT NULL,
    team_id int NOT NULL,
    cup_round varchar(255),
    next_nt_opponent_id int NOT NULL, -- This is why I need to change teams
    
    cup_wins int DEFAULT 0,
    cup_draws int DEFAULT 0,
    cup_losses int DEFAULT 0,
    cup_gf int DEFAULT 0,
    cup_ga int DEFAULT 0,
    cup_gd int DEFAULT 0,
    cup_form varchar(5),
    
    FOREIGN KEY (tournament_id) REFERENCES national_tournaments(tournament_id)
);