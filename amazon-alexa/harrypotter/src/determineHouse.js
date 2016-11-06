
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
