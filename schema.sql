CREATE TABLE Users(
    id INTEGER PRIMARY KEY,
    discordID TEXT NOT NULL UNIQUE,
    summonerName TEXT
);
CREATE TABLE ServerSettings(
    id INTEGER PRIMARY KEY,
    prefix TEXT
);
CREATE TABLE ModUsers(
    id INTEGER PRIMARY KEY,
    userID TEXT NOT NULL,
    serverID TEXT NOT NULL,
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
CREATE TABLE TournamentTeams(
    id INTEGER NOT NULL PRIMARY KEY,
    teamID INTEGER NOT NULL,
    tournamentID INTEGER NOT NULL
);
CREATE TABLE TournamentLeagueStats(
    id INTEGER PRIMARY KEY,
    userID TEXT NOT NULL,
    tournamentID INTEGER NOT NULL,
    totalTournamentKills INTEGER,
    totalTournamentDeaths INTEGER,
    totalTournamentAssists INTEGER,
    totalGameCount INTEGER,
    FOREIGN KEY (tournamentID) REFERENCES Tournaments(id),
    FOREIGN KEY (userID) REFERENCES Users(id)
);
CREATE TABLE TournamentLeagueTeams(
    id INTEGER PRIMARY KEY,
    teamId INTEGER,
    tournamentId INTEGER,
    topLaner TEXT,
    jungler TEXT,
    midLaner TEXT,
    adc TEXT,
    support TEXT,
    sub1 TEXT,
    sub2 TEXT,
    sub3 TEXT,
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