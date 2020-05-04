CREATE TABLE Users(
    id INTEGER PRIMARY KEY,
    discordID BIGINT NOT NULL,
    summonerName TEXT
);

CREATE TABLE ServerSettings(
    id INTEGER PRIMARY KEY,
    discordID BIGINT NOT NULL,
    prefix TEXT
);

CREATE TABLE ModUsers(
    id INTEGER PRIMARY KEY,
    userID BIGINT NOT NULL,
    serverID BIGINT NOT NULL,
    FOREIGN KEY(userID) REFERENCES Users(id),
    FOREIGN KEY(serverID) REFERENCES ServerSettings(id)
);

CREATE TABLE Tournaments(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE Teams(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

-- teams in a tournament
CREATE TABLE TournamentTeams(
    id INTEGER NOT NULL PRIMARY KEY,
    teamID INTEGER NOT NULL,
    tournamentID INTEGER NOT NULL
);

-- tracks a players stats in a specific tournament
CREATE TABLE TournamentLeagueStats(
    id INTEGER PRIMARY KEY,
    userID BIGINT NOT NULL,
    tournamentID INTEGER NOT NULL,
    totalTournamentKills INTEGER,
    totalTournamentDeaths INTEGER,
    totalTournamentAssists INTEGER,
    totalGameCount INTEGER,
    FOREIGN KEY (tournamentID) REFERENCES Tournaments(id),
    FOREIGN KEY (userID) REFERENCES Users(id)
);

-- regular team roster
CREATE TABLE TournamentLeagueTeams(
    id INTEGER PRIMARY KEY,
    teamId INTEGER,
    tournamentId INTEGER,
    topLaner BIGINT,
    jungler BIGINT,
    midLaner BIGINT,
    adc BIGINT,
    support BIGINT,
    sub1 BIGINT,
    sub2 BIGINT,
    sub3 BIGINT,
    FOREIGN KEY(teamID) REFERENCES TournamentTeams(id),
    FOREIGN KEY(tournamentID) REFERENCES Tournaments(id),
    FOREIGN KEY(topLaner) REFERENCES Users(id),
    FOREIGN KEY(jungler) REFERENCES Users(id),
    FOREIGN KEY(midLaner) REFERENCES Users(id),
    FOREIGN KEY(adc) REFERENCES Users(id),
    FOREIGN KEY(support) REFERENCES Users(id),
    FOREIGN KEY(sub1) REFERENCES Users(id),
    FOREIGN KEY(sub2) REFERENCES Users(id),
    FOREIGN KEY(sub3) REFERENCES Users(id)
);