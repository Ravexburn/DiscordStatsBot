// Ediwn Ramos 1/15/21
const Discord = require("discord.js");
const SQLite3 = require("sqlite3").verbose();

// args in all the functions are expected to be strings
// these should work, if not links below are resources i used
// https://www.sqlitetutorial.net/sqlite-nodejs/
// https://www.sqlitetutorial.net/sqlite-avg/

module.exports = (bot = Discord.Client) => {

    function createTeam(name){
        let db = createDB();

        db.run(`INSERT INTO teams(team_name) VALUES(?)`,[name],(err)=>{
            if(err){
                // check the error, it might be that a team is trying to use a name that is already in use.
                // by default i made the teams table not accept duplicate names. 
                console.error(err);
            }
        });

        db.close();

        // put a message here saying the team was created or something
    }

    function createPlayer(discordID){
        let db = createDB();

        db.run(`INSERT INTO players(discord_id) VALUES(?)`,[discordID],(err)=>{
            // im not sure what might cause this one to error, maybe you've already created this player in the db?
            // keep in mind the players table has been set so that discordID's can only be used once
            if(err){
                console.error(err);
            }
        
            db.close();
        });
    }

    function assignTeamToPlayer(teamName,playerDiscordID){
        let db = createDB();

        db.run(`UPDATE players SET team_name = ? WHERE player_id = ?`,[teamName,playerDiscordID],(err)=>{
            // this will probably wont error out ever
            // if it does it might be because the player is already assigned to the team you have here
            if(err){
                console.error(err);
            }
        });
    }

    // season is expected to be a string of integer like "1"
    function insertGameForPlayer(seasonNum,playerDiscordID,teamName,kills,deaths,assists,championName){
        let db = createDB();
        let seasonString = `season_${seasonNum}_player_games`;
        let teamID;
        let playerDBid;

        // get the teamID and player id from the db to assign it later
        db.get(`SELECT id teamID FROM teams WHERE team_name = ?`,[teamName],(err,row)=>{
            if(err){
                return console.error(err);
            }

            // if there is no row, the team name was likely invalid
            if(row){
                teamID = row.teamID
            } else {
                // send an error message or emebed here
            }
        });

        db.get(`SELECT id playerDBid FROM players WHERE discord_id = ?`,[playerDiscordID],(err,row)=>{
            if(err){
                return console.error(err);
            }

            // if there is no row, the team name was likely invalid
            if(row){
                playerDBid = row.playerDBid;
            } else {
                // send an error message or emebed here
            }
        });

        db.run(`INSERT into ${seasonString}(player_id,team_id,kills,deaths,assists,champion_name) VALUES = ?`,
        [playerDBid,teamID,kills,deaths,assists,championName],(err)=>{
            if(err){
                // do something if it fucks up
            } else {
                // send a victory embed, message or whatever
            }
        });
    }

    function getTeamAverageScoresBySeason(seasonNum,teamID){
        let db = createDB();
        let kills;
        let deaths;
        let assists;

        db.get(`SELECT avg(kills) kills FROM season_${seasonNum}_player_games WHERE team_id = ?`,[teamID],(err,row)=>{
            if(err){
                //do something here to let people know something fucked up
            } else {
                kills = row.kills;
            }
        });

        db.get(`SELECT avg(deaths) deaths FROM season_${seasonNum}_player_games WHERE team_id = ?`,[teamID],(err,row)=>{
            if(err){
                //do something here to let people know something fucked up
            } else {
                deaths = row.deaths;
            }
        });

        db.get(`SELECT avg(assists) assists FROM season_${seasonNum}_player_games WHERE team_id = ?`,[teamID],(err,row)=>{
            if(err){
                //do something here to let people know something fucked up
            } else {
                deaths = row.assists;
            }
        });

        // feel free to send an embed here with these numbers, im just returning it in an array for now
        return [kills,deaths,assists];
    }
    
    function getPlayerAverageScoresBySeason(seasonNum,playerDiscordID){
        let db = createDB();
        let kills;
        let deaths;
        let assists;
        let playerDBid;

        db.get(`SELECT id playerDBid FROM players WHERE discord_id = ?`,[playerDiscordID],(err,row)=>{
            if(err){
                return console.error(err);
            }

            // if there is no row, the team name was likely invalid
            if(row){
                playerDBid = row.playerDBid;
            } else {
                // send an error message or emebed here
            }
        });

        db.get(`SELECT avg(kills) kills FROM season_${seasonNum}_player_games WHERE player_id = ?`,[playerDBid],(err,row)=>{
            if(err){
                //do something here to let people know something fucked up
            } else {
                kills = row.kills;
            }
        });

        db.get(`SELECT avg(deaths) deaths FROM season_${seasonNum}_player_games WHERE player_id = ?`,[playerDBid],(err,row)=>{
            if(err){
                //do something here to let people know something fucked up
            } else {
                deaths = row.deaths;
            }
        });

        db.get(`SELECT avg(assists) assists FROM season_${seasonNum}_player_games WHERE player_id = ?`,[playerDBid],(err,row)=>{
            if(err){
                //do something here to let people know something fucked up
            } else {
                deaths = row.assists;
            }
        });

        // feel free to send an embed here with these numbers, im just returning it in an array for now
        return [kills,deaths,assists];
    }
}

function createDB(){
    let db = new SQLite3.Database('../statsbot.db',(err)=>{
        if(err){
            // obviously do something else besides just console logging later, probably send an error embed. 
            console.error(err);
        }});

    return db;
}
    