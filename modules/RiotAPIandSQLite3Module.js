// Edwin Ramos 4/28/2020
// Valorant functions commented out for now

// THE DB FUNCTIONS REQUIRE A MESSAGEARRAY AND MESSAGE OBJECT. BE SURE TO PASS THEM APPRORIATELY

const Discord = require('discord.js')
const SQLite3 = require('sqlite3').verbose()
const TeemoJS = require('teemojs')
const BotSettings = require('../botsettings.json')
const RiotAPI = TeemoJS(BotSettings.RiotAPI)
const LeagueChampMap = require('./leagueChampMap.json')

// message in all the functions are expected to be strings
// IE: !pc add league lucky

module.exports = (bot = Discord.Client) => {

    nonTourneyLeagueSQLOperation = function(message,messageArray){
        console.log('starting')
        // which module will be used based on the message string
        const module = messageArray[1]
        const game = messageArray[2]
        const ingameName = messageArray[3]
        const stringID = message.author.id
        console.log(module)
        console.log(game)

        if(module.toLowerCase() === 'add'){
            console.log('add')
            return addHepler(message,game,ingameName,stringID)
        }

        if(module.toLowerCase() === 'update'){
            return updateHepler(message,game,ingameName,stringID)
        }

        if(module.toLowerCase() === 'remove'){
            return removeHepler(message,game,stringID)
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

    // ideally this would be a silent function that just adds a member to the user database, for right now its going to send and use a message 
    addGuildMemberToDB = function(message){
        let DB = initDB()
        // `IF (SELECT * FROM Users WHERE discordID = ${guildMemberID}) ELSE BEGIN INSERT INTO Users(discordID) values(${guildMemberID})`
        let id = message.author.id
        let sql = `INSERT INTO Users(discordID) 
                   values("${id}")`

        DB.run(sql,(err)=>{
            if(err){
                console.log(err.message)
                return message.channel.send(err.message)
            }
            return message.channel.send(`Successfully joined the User Database, ID: ${id}`)
        })

        DB.close((err)=>{
            if(err){
                console.error(err.message)
            }
            console.log('DB closed')
        })
    }
}

function initDB(){
    return new SQLite3.Database('./database.db',SQLite3.OPEN_READWRITE,(err)=>{
        if(err){
            return console.error(err.message)
        }
        console.log('connected to DB')
    })
}

function addHepler(message,game,ingameName,stringID){

    if(game.toLowerCase() === "league"){
        return addLeagueInfo(message,ingameName,stringID)
    }
}

function addLeagueInfo(message,summoner,stringID){
    let DB = initDB()

    let data = [summoner,stringID]
    let sql = `UPDATE Users
               SET summonerName= ? 
               WHERE discordID = ?`

    DB.run(sql,data,(err)=>{
        console.log('done')
        if(err){
            console.log(err.message)
            return message.channel.send("Something went wrong adding this summoner name. If you're updating please use update not add.")
        }
        return message.channel.send(`League Summoner name ${summoner} successfully added.`)
    })

    DB.close((err)=>{
        if(err){
            console.error(err.message)
        }
        console.log('DB closed')
    })
}

// function addValorantInfo(message){

// }

function updateHepler(message,game,ingameName,stringID){

    if(game.toLowerCase() === "league"){
        updateLeagueInfo(message,ingameName,stringID)
    }
}

function updateLeagueInfo(message,ingameName,stringID){
    let DB = initDB()

    let data = [ingameName,stringID]
    let sql = `UPDATE Users
               SET summonerName = ?
               WHERE discordID = ?`

    DB.run(sql,data,(err)=>{
        if(err){
            console.log(err.message)
            return message.channel.send("Something went wrong updating this summoner name.")
        }
        return message.channel.send('League Summoner name successfully updated.')
    })

    DB.close((err)=>{
        if(err){
            console.error(err.message)
        }
        console.log('DB closed')
    })
}

// function updateValorantInfo(message){
    
// }

function removeHepler(message,game,stringID){

    if(game.toLowerCase() === "league"){
        removeLeagueInfo(message,stringID)
    }
}

function removeLeagueInfo(message,){
    let DB = initDB()

    let data = [stringID]
    let sql = `UPDATE Users
               SET summonerName = NULL 
               WHERE discordID = ?`

    DB.run(sql,data,(err)=>{
        if(err){
            console.log(err.message)
            return message.channel.send("Something went wrong removing this summoner name.")
        }
        return message.channel.send(`League Summoner name ${summoner} successfully removed.`)
    })

    DB.close((err)=>{
        if(err){
            console.error(err.message)
        }
        console.log('DB closed')
    })
}

// function removeValorantInfo(message){
    
// }

// these will only work if person is in database
function LeagueDBSearch(message,summoner,stringIDy){
    // do sql to search
}

// function ValorantSearch(){

// }