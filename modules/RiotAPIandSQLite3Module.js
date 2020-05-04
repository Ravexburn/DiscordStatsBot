// Edwin Ramos 4/28/2020
// Valorant functions commented out for now

// THE DB FUNCTIONS REQUIRE A MESSAGEARRAY AND MESSAGE OBJECT. BE SURE TO PASS THEM APPRORIATELY

const Discord = require('discord.js')
const SQLite3 = require('sqlite3').verbose()
const TeemoJS = require('teemojs')
const BotSettings = require('../botsettings.json')
const RiotAPI = TeemoJS(BotSettings.RiotAPI)
const LeagueChampMap = require('./leagueChampMap.json')
const DB = new SQLite3.Database('../stats_bot.db',(err)=>{
    if(err){
        return console.error(err.message)
    }
    console.log('connected to DB')
})

// message in all the functions are expected to be strings
// IE: !pc add league lucky



module.exports = (bot = Discord.Client) => {

    nonTourneyLeagueSQLOperation = function(message,messageArray){
        console.log('starting')
        // which module will be used based on the message string
        const game = messageArray[1]
        const module = messageArray[2]
        const ingameName = messageArray[3]
        const stringID = message.author.id
        console.log('module: ',module)
        console.log('game: ',game)
        console.log('ingameName: ',ingameName)

        if(module.toLowerCase() === 'add'){
            console.log('add')
            return addHepler(message,game,ingameName,stringID)
        }

        if(module.toLowerCase() === 'update'){
            return updateHepler(message,game,ingameName,stringID)
        }

        if(module.toLowerCase() === 'remove'){
            return removeHepler(message,game,ingameName,stringID)
        }
        return null
    }

    searchOperation = function(messageArray){
        const game = messageArray[2]

        if(game === "League"){
            return LeagueDBSearch(summoner)
        }

        // if(game === "Valorant"){
        //     ValorantSearch(message)
        // }
    }

    getSummonerObjectFromRiotAPI = async function(summonerName,region = 'na1'){
        // all the data you need for obj
        const summoner = await RiotAPI.get(region,'summoner.getBySummonerName',summonerName)
        const rank = await RiotAPI.get(region,'league.getLeagueEntriesForSummoner',summoner.id)
        const mostPlayed = await RiotAPI.get(region,'championMastery.getAllChampionMasteries',summoner.id)
        const matches = await RiotAPI.get(region,'match.getMatchlist',summoner.accountId)

        // returning this later when its filled with relevant data
        // rank, summoner, most played, recently played, win and losses
        let obj = {
            summoner: summonerName,
            tier:null,
            rank:null,
            leaguePoints:null,
            mostPlayed:null,
            recentlyPlayed:null,
            wins:null,
            losses:null
        }

        // set rank related values, if this is empty their unranked
        if(!rank){
            obj.tier = null
            obj.rank = null
            obj.leaguePoints = null
            obj.wins = 0
            obj.losses = 0
        } else {
            let rankObj = rank[0]

            obj.tier = rankObj.tier
            obj.rank = rankObj.rank
            obj.leaguePoints = rankObj.leaguePoints
            obj.wins = rankObj.wins
            obj.losses = rankObj.losses
        }

        if(!mostPlayed){
            obj.mostPlayed = null
        } else {
            const champ = LeagueChampMap[mostPlayed[0].championId]
            obj.mostPlayed = champ
        }

        if(!matches){
            obj.mostPlayed = null
        } else {
            const champ = LeagueChampMap[matches.matches[0].champion]
            obj.recentlyPlayed = champ
        }

        return obj
    }
}

function addHepler(message,game,ingameName,stringID){
    console.log('in add')

    if(game.toLowerCase() === "league"){
        return addLeagueInfo(message,ingameName,stringID)
    }
}

function addLeagueInfo(message,summoner,stringID){
    console.log('in add league function')
    // do sql to add summoner name to Users table
    let sql = `INSERT INTO USERS(summonerName) VALUES(${summoner}) WHERE discordID = ${stringID}`

    DB.run(sql,(err)=>{
        console.log('done')
        if(err){
            console.log(err.message)
            return message.channel.send("Something went wrong adding this summoner name. If you're updating please use update not add.")
        }
        console.log(this)
        return message.channel.send(`League Summoner name ${summoner} successfully added.`)
    })

}

// function addValorantInfo(message){

// }

// function updateHepler(messageArray,stringID){
//     const game = messageArray[2]

//     if(game.toLowerCase() === "league"){
//         updateLeagueInfo(messageArray,stringID)
//     }
// }

// function updateLeagueInfo(messageArray,stringID){
//     const summoner = messageArray[3]
//     // do sql to update summoner name in Users
// }

// function updateValorantInfo(message){
    
// }

// function removeHepler(messageArray,stringID){
//     const game = messageArray[2]

//     if(game.toLowerCase() === "league"){
//         removeLeagueInfo(stringID)
//     }
// }

// function removeLeagueInfo(stringID){
//     //do sql to remove from table
// }

// function removeValorantInfo(message){
    
// }

// these will only work if person is in database
// function LeagueDBSearch(messageArray){
//     const summoner = messageArray[3]

//     // do sql to search
// }

// function ValorantSearch(){

// }