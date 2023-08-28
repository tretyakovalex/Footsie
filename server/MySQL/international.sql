-- Done in workbench
USE continents;

CREATE TABLE continents (
	continent_id int  PRIMARY KEY,
    continent_name varchar(255) NOT NULL
);

CREATE TABLE countries (
	country_id int PRIMARY KEY,
    country_name varchar(255) NOT NULL,
    continent_id int NOT NULL,
    flag varchar(255) NOT NULL,
    FOREIGN KEY (continent_id) REFERENCES continents(continent_id)
);


CREATE TABLE league (
	leauge_id int PRIMARY KEY, 
    league_name varchar(255) NOT NULL,
    continent_id int NOT NULL,
    country_id int NOT NULL,
    
    FOREIGN KEY (continent_id) REFERENCES continents(continent_id),
    FOREIGN KEY (country_id) REFERENCES countries(country_id)
);

CREATE TABLE international_tournaments (
	tournament_id int PRIMARY KEY, 
    tournament_name varchar(255) NOT NULL,
    continent_id int NOT NULL,
    tournament_emblem varchar(255) NOT NULL,
    
    
    FOREIGN KEY (continent_id) REFERENCES continents(continent_id)
)