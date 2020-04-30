CREATE TABLE users(
    id INTEGER NOT NULL PRIMARY KEY,
    discord_id BIGINT NOT NULL,
    summoner_name TEXT
);

CREATE TABLE server_settings(
    id INTEGER NOT NULL PRIMARY KEY,
    discord_id BIGINT NOT NULL,
    prefix TEXT
);

CREATE TABLE mod_users(
    id INTEGER NOT NULL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    server_id BIGINT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(server_id) REFERENCES server_settings(id)
);

CREATE TABLE tournaments(
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE teams(
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT
);

-- teams in a tournament
CREATE TABLE tournament_teams(
    id INTEGER NOT NULL PRIMARY KEY,
    team_id INTEGER NOT NULL,
    tournament_id INTEGER NOT NULL
);

-- tracks a players stats in a specific tournament
CREATE TABLE tournament_league_stats(
    id INTEGER NOT NULL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    tournament_id INTEGER NOT NULL,
    total_tournament_kills INTEGER,
    total_tournament_deaths INTEGER,
    total_tournament_assists INTEGER,
    total_game_count INTEGER,
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- regular team roster
CREATE TABLE tournament_league_teams(
    id INTEGER NOT NULL PRIMARY KEY,
    team_id INTEGER,
    tournament_id INTEGER,
    top_laner BIGINT,
    jungler BIGINT,
    mid_laner BIGINT,
    adc BIGINT,
    support BIGINT,
    sub1 BIGINT,
    sub2 BIGINT,
    sub3 BIGINT,
    FOREIGN KEY(team_id) REFERENCES tournament_teams(id),
    FOREIGN KEY(tournament_id) REFERENCES tournaments(id),
    FOREIGN KEY(top_laner) REFERENCES users(id),
    FOREIGN KEY(jungler) REFERENCES users(id),
    FOREIGN KEY(mid_laner) REFERENCES users(id),
    FOREIGN KEY(adc) REFERENCES users(id),
    FOREIGN KEY(support) REFERENCES users(id),
    FOREIGN KEY(sub1) REFERENCES users(id),
    FOREIGN KEY(sub2) REFERENCES users(id),
    FOREIGN KEY(sub3) REFERENCES users(id)
);