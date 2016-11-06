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
