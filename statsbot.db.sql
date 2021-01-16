BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "teams" (
	"team_name"	TEXT NOT NULL UNIQUE,
	"id"	INTEGER,
	PRIMARY KEY("id" AUTOAUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "players" (
	"id"	INTEGER,
	"discord_id"	INTEGER NOT NULL UNIQUE,
	"team_id"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("team_id") REFERENCES "teams"("id")
);
CREATE TABLE IF NOT EXISTS "season_1_player_games" (
	"id"	INTEGER,
	"player_id"	INTEGER NOT NULL,
	"team_id"	INTEGER NOT NULL,
	"kills"	INTEGER NOT NULL,
	"deaths"	INTEGER NOT NULL,
	"assists"	INTEGER NOT NULL,
	"champion_name"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOAUTOINCREMENT),
	FOREIGN KEY("player_id") REFERENCES "players"("id"),
	FOREIGN KEY("team_id") REFERENCES "teams"("id")
);
COMMIT;