USE leagues;

CREATE TABLE teams (
	team_id int NOT NULL,
    team_name varchar(255) NOT NULL,
    team_emblem varchar(255),
    country_id int,
    continent_id int,
    
    PRIMARY KEY(team_id),
    FOREIGN KEY(country_id) REFERENCES continents.countries(country_id),
    FOREIGN KEY(continent_id) REFERENCES continents.countries(continent_id)
);

CREATE TABLE team_leagues (
	league_id int,
    team_id int,
    ranking int NOT NULL,
    country_id int,
    continent_id int,
    
    PRIMARY KEY (league_id, team_id),
    FOREIGN KEY(league_id) REFERENCES continents.league(league_id),
    FOREIGN KEY(team_id) REFERENCES teams(team_id),
    FOREIGN KEY(country_id) REFERENCES continents.countries(country_id),
    FOREIGN KEY(continent_id) REFERENCES continents.countries(continent_id)
);