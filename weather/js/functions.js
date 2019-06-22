//Weather Site Javascript Functions
console.log ("my js is being read");
////////////////////////////////////////////////////////////////////////////////////
let speed = document.getElementById('wSpeed').innerHTML;
let temp = document.getElementById('temp').innerHTML;
//Wind Chill Function
function buildWC(speed, temp){
    //let feelTemp = document.getElementById('feelTemp');
    //compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    wc = Math.floor(wc);
    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;
    // Display the windchill
    console.log(wc);
    //feelTemp.innerHTML = wc;
    return wc;
}
buildWC(speed,temp)
////////////////////////////////////////////////////////////////////////////////////
// Wind Dial Function
let direction = document.getElementById("direction").innerHTML;
let dial = document.getElementById("dial");
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
////////////////////////////////////////////////////////////////////////////////////
let conditionStatus = document.getElementById("condition_status").innerHTML;
console.log(conditionStatus);
function getCondition(conditonStatus){
    //checks for keywords in order to output correct condition value
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
        case "Thunderstorms":
         return "clouds";
    }
}
let condition = getCondition(conditionStatus);
console.log(condition);
////////////////////////////////////////////////////////////////////////////////////
function changeSummaryImage(condition){
    let curWeather = document.getElementById("condition_image");
    switch (condition){
        case "rain":
         curWeather.setAttribute("class","rain");
         break;
        case "snow":
         curWeather.setAttribute("class","snow");
         break;
        case "clear":
         curWeather.setAttribute("class","clear");
         break;
        case "fog":
         curWeather.setAttribute("class","fog");
         break;
        case "clouds":
         curWeather.setAttribute("class","clouds");
         break;
    }
}
changeSummaryImage(condition);
///////////////////////////////////////////////////////////////////////////////////
// Converts feet to meters
let meters = document.getElementById("elevation").innerHTML;
console.log(meters);
function convertMeters(meters){
    var ft = Math.round(meters * 3.28084);
    return ft;
}
let feet = convertMeters(meters);
console.log(feet);
//relaces html elevation data with value from covertMeters and replaces "m" with "ft"
document.getElementById("elevation").innerHTML= feet;
document.getElementById("elevation_notation").innerHTML= "ft";
////////////////////////////////////////////////////////////////////////////////////
//Convert format time to 12 hour format
function format_time(hour){
    if(hour > 23){ 
     hour -= 24; 
    } 
     let amPM = (hour > 11) ? "pm" : "am"; 
     if(hour > 12) { 
     hour -= 12; 
    } 
     if(hour == 0) { 
     hour = "12"; 
    } 
     return hour + amPM;
    }
////////////////////////////////////////////////////////////////////////////////////
// Build the hourly temperature list
function buildHourlyData(nextHour,hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
     let hourlyListItems = '<li class="hourDataPoints">' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F | </li>';
     // Build the remaining list items using a for loop
     for (let i = 1, x = hourlyTemps.length; i < x; i++) {
      hourlyListItems += '<li class="hourDataPoints">' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F | </li>';
     }
     console.log('HourlyList is: ' +hourlyListItems);
     return hourlyListItems;
    }
    // Get the next hour based on the current time
let date = new Date(); 
let nextHour = date.getHours() + 1;
////////////////////////////////////////////////////////////////////////////////////
