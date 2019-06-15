var path = require('path');

var Player = require("./player.model.js");
//Fast CSV
const fs = require('mz/fs');
const csv = require('fast-csv');
var path = require("path");
//Variables for the data to be Imported
var priceCsvFile =  path.resolve("./public/files/HSBC_Cricket4f525a3.csv");
var stream = fs.createReadStream(priceCsvFile)

/***********Functions************ */ 
module.exports.getPlayerInfo = function(req,res,next){
    console.log(req.body)
    Player.find({name:req.body.name},function(err,player){
        if(!req.body.name){
            res.status(422).send({
                message: "Incorrect Json Format",//errorHandler.getErrorMessage(err),
                error:true
            })
        }else{
            if(err){
                res.status(422).send({
                    message: "Incorrect Json Format.",//errorHandler.getErrorMessage(err),
                    error:true
                })
            }else{
                res.status(200).json({
                    data: player,
                    error: false
                })
                
            }
        }
    });

}

module.exports.unauthorized = function(req,res,next){
    res.status(422).send({
        message:"Unauthorized to access the API.",
        error:true
    })
}
module.exports.getTeamPlayerList = function(req,res,next){
    Player.find({team:req.body.team},(err,player)=>{
        if(!req.body.team){
            res.status(422).send({
                message:"Incorrect Json Format!!",
                error:true
            })
        }else{
            if(err){
                console.log(err);
                res.status(422).send({
                    message:"Incorrect Json Format!!",
                    error:true
                })
            }else{
                res.status(200).json({
                    data:player,
                    error:false
                })
            }
        }
    })

}
module.exports.enterData = function(req, res, next) {
    var headers = [];
    console.log("data")
    let index =0;
    predefinedheaders = ['Is Captain(1=yes)', 'Is Wktkeeper(1=Yes)', 'Team', 'Name', 'Nationality', 'Player Value USD', 'Matches', 'Innings played', 'Not out', 'Runs scored', 'Highest score', 'Is batsman', 'Batting avg', 'Balls faced', 'Strike rate', '100 runs made', '50 runs made', '4s', '6s', 'Catches per match', 'Catches taken', 'Matches played', 'Innings played', 'Is bowler?', 'Number of balls bowled', 'Runs given', 'Wkts taken', 'Bowling econ', '5 Wicket hauls']
    predefinedheaders2 = ['role.isCaptain', 'role.iswicketKeeper', 'team', 'name', 'nationality', 'playerValue', 'career.matches', 'career.inningsPlayed', 'career.notOut', 'career.runsScored', 'career.highestScore', 'role.isBatsmen', 'career.battingAverage', 'career.ballsFaced', 'career.strikeRate', 'career.hundreadRuns', 'career.fiftyRuns', 'career.fourRunsOverall', 'career.sixRunsOverall', 'career.catchesPerMatch', 'career.catchesTaken', 'career.matchesPlayed', 'career.inningsPlayed', 'role.isBowler', 'career.ballsBowled', 'career.runsGiven', 'career.wicketsTaken', 'career.ballingEconomy', 'career.fiveWicketsHaul']
    var csvStream = csv()
      .on("data", function(data) {
          if(index==0){
              headers = data;
          }else{
              var playerObject = {};

              headers.forEach((element,index) => {
                var ins = predefinedheaders.indexOf(headers[index]);
                if(ins>=0){
                    playerObject[predefinedheaders2[index]] =  data[index]; 
                }else{
                    playerObject[headers[index]] = data[index];
                }
              });

              var player = new Player(playerObject);
              player.save(function(error,player){
                  
              if(error){
                  throw error;
              }
              })
          }
        index++;
      })
      .on("end", function() {});

    stream.pipe(csvStream);
    res.json({ success: "Data imported successfully.", status: 200 });
  }