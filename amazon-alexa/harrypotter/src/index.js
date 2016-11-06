// This code sample shows how to call and receive external rest service data, within your skill Lambda code.

// var AWS = require('aws-sdk');

var https = require('https');

var questions = [
    {
        "question": "If Death were to offer you a gift, which would you take?",
        "answers":{
            "a":"The Cloak of invisibility ",
            "b":"The Resurrection stone",
            "c":"The Elder Wand",
        }
    },
    {
        "question": "What do you drink to stay awake?",
        "answers":{
            "a":"Coffee",
            "b":"Tea",
            "c":"Orange Juice",
        }
    },
    {
        "question": "What is your favorite mythical creature?",
        "answers":{
            "a":"A Gryffin",
            "b":"A Raven",
            "c":"A Huffle",
        }
    },
    {
        "question": "You catch your friend cheating on an exam. What do you do?",
        "answers":{
            "a":"I would get up and tell the teacher right in the middle of the exam.",
            "b":"I would tell the teacher after the exam.",
            "c":"I would cheat off of them",
        }
    },
    {
        "question": "What is your favorite subject?",
        "answers":{
            "a":"Potions",
            "b":"Charms",
            "c":"Herbology",
        }
    }
];

var houseTally = [
  {
    "name":"Gryffindor",
    "points": 0
  },
  {
    "name":"Slytherin",
    "points": 0
  },
  {
    "name":"Hufflepuff",
    "points": 0
  },
  {
    "name":"Ravenclaw",
    "points": 0
  }
];

exports.handler = function( event, context ) {
    var say = "";
    var shouldEndSession = false;
    var sessionAttributes = {};

    if (event.session.attributes) {
        sessionAttributes = event.session.attributes;
    }

    if (event.request.type === "LaunchRequest") {
        say = "Welcome to the Harry Potter Sorting Quiz. Shall we begin?";
        context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

    } else {
        var IntentName = event.request.intent.name;
        var questionIndex = 0;
        if (IntentName === "BeginningGameIntent") {
            say="Let's Begin! " + questions[questionIndex].question + "? A. " + questions[questionIndex].answers.a + ". B. " +
            questions[questionIndex].answers.b + ". Or C. " + questions[questionIndex].answers.c + ".";
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });
        } else if (IntentName === "AnswerIntentA" || IntentName === "AnswerIntentB" || IntentName === "AnswerIntentC"){
            addPoints(intentName, currentQuestionIndex);
            currentQuestionIndex++;
            say = "Okay, next question."
            if(currentQuestionIndex===questions.length){
              say = determineHouse(houseTally) + "!";
            }
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });
        } else if (IntentName === "AMAZON.StopIntent" || IntentName === "AMAZON.CancelIntent") {
            say = "Thanks for playing!";
            shouldEndSession = true;
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });
        } else if (IntentName === "AMAZON.RepeatIntent"){
            say = questions[questionIndex].question;
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });
        } else if (IntentName === "AMAZON.HelpIntent" ) {
            say = "Say a, b, or c depending on your answer."
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

        }
    }
};


function determineHouse(houseTally){
  var highestValue = Math.max(houseTally[0].points,houseTally[1].points,houseTally[2].points,houseTally[3].points);
  var highestValueArray = [];
  for(var i in houseTally){
    if(houseTally[i].points === highestValue){
      highestValueArray.push(houseTally[i].name);
    }
  }
  console.log(highestValueArray[0]);
  return highestValueArray[Math.floor(Math.random()*highestValueArray.length)];
}


var addPoints = function(intentName, currentQuestionIndex){
    switch(currentQuestionIndex){
        case 1:
            if (intentName === "AnswerIntentA"){
                houseTally[3].points += 5;
            } else if (intentName === "AnswerIntentB"){
                houseTally[0].points += 5;
            } else  if (intentName === "AnswerIntentC"){
                houseTally[1].points += 5;
            }
        break;

        case 2:
            if (intentName === "AnswerIntentA"){
                houseTally[0].points += 5;
            } else if (intentName === "AnswerIntentB"){
                houseTally[3].points += 5;
            } else  if (intentName === "AnswerIntentC"){
                houseTally[2].points += 5;
            }
        break;

        case 3:
            if (intentName === "AnswerIntentA"){
                houseTally[0].points += 5;
            } else if (intentName === "AnswerIntentB"){
                houseTally[2].points += 5
            } else  if (intentName === "AnswerIntentC"){
                houseTally[1].points += 5;
            }
        break;

        case 4:
            if (intentName === "AnswerIntentA"){
                houseTally[2].points += 5;
            } else if (intentName === "AnswerIntentB"){
                houseTally[3].points += 5;
            } else  if (intentName === "AnswerIntentC"){
                houseTally[1].points += 5;
            }
        break;

        case 5:
            if (intentName === "AnswerIntentA"){
                houseTally[3].points += 5;
            } else if (intentName === "AnswerIntentB"){
                houseTally[1].points += 5;
            } else  if (intentName === "AnswerIntentC"){
                houseTally[2].points += 5;
            }
        break;
    }
}



function buildSpeechletResponse(say, shouldEndSession) {
    return {
        outputSpeech: {
            type: "SSML",
            ssml: "<speak>" + say + "</speak>"
        },
        reprompt: {
            outputSpeech: {
                type: "SSML",
                ssml: "<speak>Please try again. " + say + "</speak>"
            }
        },
        card: {
            type: "Simple",
            title: "My Card Title",
            content: "My Card Content, displayed on the Alexa App or alexa.amazon.com"
        },
        shouldEndSession: shouldEndSession
    };
}
