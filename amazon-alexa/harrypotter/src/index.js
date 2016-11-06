// This code sample shows how to call and receive external rest service data, within your skill Lambda code.

// var AWS = require('aws-sdk');

var https = require('https');

var questions = [
    {
        "question": "If Death were to offer you a gift, which would you take?",
        "answers":{
            "a":"Cloak of invisibility ",
            "b":"Resurrection stone",
            "c":"Elder Wand",
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

var houseTally = {"gryffindor": 0, "slytherin": 0, "hufflepuff": 0, "ravenclaw": 0};

exports.handler = function( event, context ) {
    var say = "";
    var shouldEndSession = false;
    var sessionAttributes = {};
    var myState = "";
    var pop = 0;
    var rank = 0;

    if (event.session.attributes) {
        sessionAttributes = event.session.attributes;
    }

    if (event.request.type === "LaunchRequest") {
        say = "Welcome to the Harry Potter Sorting Quiz. Shall we begin?";
        context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

    } else {
        var IntentName = event.request.intent.name;
        if (IntentName === "BeginningGameIntent") {
            say="Let's Begin! " + questions[0].question;
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });
        } else if (IntentName === "AMAZON.StopIntent" || IntentName === "AMAZON.CancelIntent") {
            say = "Thanks for playing!";
            shouldEndSession = true;
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });


        } else if (IntentName === "AMAZON.HelpIntent" ) {
            say = "Just say the name of a U.S. State, such as Massachusetts or California."
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

        }
    }
};

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
