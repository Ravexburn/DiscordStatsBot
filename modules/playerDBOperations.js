// Edwin Ramos 4/28/2020

const Discord = require("discord.js");
const SQLite3 = requirew("sqlite3").verbose()

// message in all the functions are expected to be strings
// IE: !pc add league lucky

module.exports = (bot = Discord.Client) => {

    DBOperation = function(message){
        // which module will be used based on the message string
        const module = message.split(' ')[1];

        if(module.toLowerCase() === 'add'){
            addHepler(message);
        };

        if(module.toLowerCase() === 'update'){
            updateHepler(message);
        };

        if(module.toLowerCase() === 'remove'){
            removeHepler(message);
        };
        return null;
    }

    searchOperation = function(message){
        const game = message.split(' ')[2]

        if(game === "League"){
            LeagueSearch(message)
        }

        if(game === "Valorant"){
            ValorantSearch(message)
        }
    }
}

function addHepler(message){
    const game = message.split(' ')[2]
}

function addLeagueInfo(message){

}

function addValorantInfo(message){

}

function updateHepler(message){
    const game = message.split(' ')[2]
}

function updateLeagueInfo(message){

}

function updateValorantInfo(message){
    
}

function removeHepler(message){
    const game = message.split(' ')[2]
}

function removeLeagueInfo(message){

}

function removeValorantInfo(message){
    
}

// these will only work if person is in database
function LeagueSearch(){

}

function ValorantSearch(){

}