//Weather Site Javascript Functions
console.log ("my js is being read")


// let temp = 31
// let speed = 5
let speed = document.getElementById('wSpeed').innerHTML;
let temp = document.getElementById('temp').innerHTML;
//Wind Chill Function
function buildWC(speed, temp){
    const feelTemp = document.getElementById('feelTemp');
    //compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    wc = Math.floor(wc);
    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;
    // Display the windchill
    console.log(wc);
    feelTemp.innerHTML = wc;
}
buildWC(speed,temp)

// Wind Dial Function
const direction = document.getElementById("direction").innerHTML;
const dial = document.getElementById("dial");
function windDial(direction){
    // Get the container
    console.log(direction);
    // Determine the dial class
    switch (direction){
     case "North":
     case "N":
      dial.setAttribute("class", "n"); //"n" is the CSS rule selector
      break;
     case "NE":
     case "NNE":
     case "ENE":
      dial.setAttribute("class", "ne");
      break;
     case "NW":
     case "NNW":
     case "WNW":
      dial.setAttribute("class", "nw");
      break;
     case "South":
     case "S":
      dial.setAttribute("class", "s");
      break;
     case "SE":
     case "SSE":
     case "ESE":
      dial.setAttribute("class", "se");
      break;
     case "SW":
     case "SSW":
     case "WSW":
      dial.setAttribute("class", "sw");
      break;
     case "East":
     case "E":
      dial.setAttribute("class", "e");
      break;
     case "West":
     case "W":
      dial.setAttribute("class", "w");
      break;
    }
   }
windDial(direction);
const conditionStatus = document.getElementById("condition_status").innerHTML;
function getCondition(conditonStatus){
    switch (conditionStatus){
        case "Rain":
        case "Rainy":
         return "rain";
        case "Snow":
        case "Snowy":
         return "snow";
        case "Clear":
        case "Nice":
         return "clear";
        case "Fog":
        case "Foggy":
         return "fog";
        case "Clouds":
        case "Cloudy":
         return "clouds";
    }
}
const condition = getCondition(conditionStatus);
console.log(condition);
function changeSummaryImage(){

}
function convertMeters(){

}
let meters = 1427;
function metersToFeet(meters){
    var m = meters *.314987;
    return m;
}
let feet = metersToFeet(meters);
let elevation = document.getElementById("elevation");
elevation.innerhtml = feet;