const Discord = require('discord.js');
const bot = new Discord.Client();

var config = require('config.json')('./secrets.json');
const token = config.token;

const testGuildID = "468152319670747146";
const actualGuildID = "463146405993775144";
let guildID = "";

const testPlatID = "468162170094354453";
const actualPlatID = "468164991133024264";
let platID = "";

const testRegionID = "468163377513103360";
const actualRegionID = "468165025652277248";
let regionID = "";

bot.on('ready', () => {
  testGuild();
  fetchMessages();
  bot.user.setGame('Rocket League Volleyball');
  console.log('Rocket League Volleyball is ready to be played.');
});

bot.on('disconnect', event => {
  var crashPls = event.lol.pls.crash;
});

bot.on('message', message => {
  if(message.type == "PINS_ADD"){
    if(message.channel.id == platID || message.channel.id == regionID){
      message.delete();
    }
  }
});

function sendMessage(msg, channel){
  channel.send(msg);
}

bot.login(token);

process.on('unhandledRejection', err => {
  console.error(`Uncaught Promise Error: \n${err.stack}`)
  var crashPls = err.lol.pls.crash;
});

function testGuild(){
  guildID = testGuildID;
  platID = testPlatID;
  regionID = testRegionID;
}

function actualGuild(){
  guildID = actualGuildID;
  platID = actualPlatID;
  regionID = actualRegionID;
}

function fetchMessages(){
  let guild = bot.guilds.get(guildID);
  let plat = guild.channels.get(platID);
  let region = guild.channels.get(regionID);

  plat.fetchPinnedMessages()
    .then(function(messages) {
      console.log(messages.size);
      if(messages.size < 1){
        plat.sendFile("./images/player-setup/set-platform.png")
          .then(function(message) {
            message.pin();
            message.react(guild.emojis.find('name', 'steam')).then( function(emoji) {
              delay(1000);
              message.react(guild.emojis.find('name', 'ps4')).then( function(emoji) {
                delay(1000);
                message.react(guild.emojis.find('name', 'xbox')).then( function(emoji) {
                  delay(1000);
                  message.react(guild.emojis.find('name', 'switch'))
                })
              })
            });
          })
          .catch(console.error);
      }
    })
    .catch(console.error);
  region.fetchPinnedMessages()
    .then(function(messages) {
      if(messages.size < 1){
        region.sendFile("./images/player-setup/set-region.png")
          .then(function(message) {
            message.pin();
            message.react(guild.emojis.find('name', 'usw')).then( function(emoji) {
              delay(1000);
              message.react(guild.emojis.find('name', 'usc')).then( function(emoji) {
                delay(1000);
                message.react(guild.emojis.find('name', 'use')).then( function(emoji) {
                  delay(1000);
                  message.react(guild.emojis.find('name', 'eu'))
                })
              })
            });
          })
          .catch(console.error);
      }
    })
    .catch(console.error);
  //let platforms = channel.fetchMessage(pID).then(message => verifyPlats(message));
}

function delay(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
