//Weather Site Javascript Functions
console.log ("my js is being read");

//setup local storage
var storage = window.localStorage;

// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - mat18037@byui.edu"
    }
  };

////////////////////////////////////////////////////////////////////////////////////
// let speed = document.getElementById('wSpeed').innerHTML; - DELETE
// let temp = document.getElementById('temp').innerHTML; - DELETE
//Wind Chill Function
function buildWC(speed, temp){
    //let feelTemp = document.getElementById('feelTemp'); - DELETE
    //compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    wc = Math.floor(wc);
    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;
    // Display the windchill
    console.log("windchill:")
    console.log(wc);
    //feelTemp.innerHTML = wc; - DELETE
    return wc;
}
// buildWC(speed,temp)
////////////////////////////////////////////////////////////////////////////////////
// Wind Dial Function
// let direction = document.getElementById("direction").innerHTML; - DELETE
let dial = document.getElementById("dial");
function windDial(direction){
    // Get the container
    console.log("wind direction:")
    console.log(direction);
    // Determine the dial class
    switch (direction){
     case "North":
     case "N":
     case "0":
     case "360":
      dial.setAttribute("class", "n"); //"n" is the CSS rule selector
      break;
     case "NE":
     case "NNE":
     case "ENE":
     case "45":
      dial.setAttribute("class", "ne");
      break;
     case "NW":
     case "NNW":
     case "WNW":
     case "315":
      dial.setAttribute("class", "nw");
      break;
     case "South":
     case "S":
     case "180":
      dial.setAttribute("class", "s");
      break;
     case "SE":
     case "SSE":
     case "ESE":
     case "135":
      dial.setAttribute("class", "se");
      break;
     case "SW":
     case "SSW":
     case "WSW":
     case "225":
      dial.setAttribute("class", "sw");
      break;
     case "East":
     case "E":
     case "90":
      dial.setAttribute("class", "e");
      break;
     case "West":
     case "W":
     case "270":
      dial.setAttribute("class", "w");
      break;
    }
   }
// windDial(direction); - DELETE
////////////////////////////////////////////////////////////////////////////////////
// let conditionStatus = document.getElementById("condition_status").innerHTML; - DELETE
// console.log(conditionStatus); - DELETE
function getCondition(conditionStatus){
    //checks for keywords in order to output correct condition value
    switch (conditionStatus){
        case "Rain":
        case "Rainy":
        case "Thunderstorms":
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

// let condition = getCondition(conditionStatus); - DELETE
// console.log(condition); - DELETE
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
// changeSummaryImage(condition); - DELETE
///////////////////////////////////////////////////////////////////////////////////
// Converts feet to meters
// let meters = document.getElementById("elevation").innerHTML; - DELETE
// console.log(meters); - DELETE
function convertMeters(meters){
    var ft = Math.round(meters * 3.28084);
    return ft;
}
// let feet = convertMeters(meters); - DELETE
// console.log(feet);
//relaces html elevation data with value from covertMeters and replaces "m" with "ft"
// document.getElementById("elevation").innerHTML= feet; - DELETE
// document.getElementById("elevation_notation").innerHTML= "ft"; -DELETE
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
// Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getLocation function:'); 
      console.log(data);
      // Store location data to localstorage 
      storage.setItem("locName", data.properties.relativeLocation.properties.city); 
      storage.setItem("locState", data.properties.relativeLocation.properties.state); 
      storage.setItem("longitude", data.properties.relativeLocation.geometry.coordinates[0]);
      storage.setItem("latitude", data.properties.relativeLocation.geometry.coordinates[1]);

      //store hourly weather data to localstorage
      storage.setItem("hourlyData", data.properties.forecastHourly);
      // Next, get the weather station ID before requesting current conditions 
      // URL for station and hourlyTemp list is in the data object 
      let stationsURL = data.properties.observationStations; 
      let hourlyURL = data.properties.forecastHourly;
      let minMaxURL = data.properties.forecast;
      // Call the function to get the list of weather stations
      getStationId(stationsURL);
      getHourly(hourlyURL);
      getMinMax(minMaxURL);
     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
   } // end getLocation function
////////////////////////////////////////////////////////////////////////////////////////
// Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
      // Store data to localstorage 
      storage.setItem("stationId", stationId); 
      storage.setItem("stationElevation", stationElevation); 
   
      // Request the Current Weather for this station 
      getWeather(stationId);
     }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function
////////////////////////////////////////////////////////////////////////////////////////////////////////
// Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);
    
      // Store weather information to localStorage 
      storage.setItem("localElevation", data.properties.elevation.value);
      storage.setItem("localTempC", data.properties.temperature.value); 
      storage.setItem("localPrecip", data.properties.precipitationLastHour.value); 
      storage.setItem("localCondition", data.properties.textDescription); 
      storage.setItem("localWindGust", data.properties.windGust.value); 
      storage.setItem("calcSpeed", data.properties.windSpeed.value);
  
  
  
      // Build the page for viewing 
      
     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
   } // end getWeather function
//Gets hourly data list from NWS API
function getHourly(hourlyURL) { 
    fetch(hourlyURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    //assigns API info to variable data
    .then(function (data) { 
      console.log('From getHourly function:');
      console.log(data);
      //store hourly data
      let i;
      let hourlyTempData = [];
      for (i = 0; i < 13; i++){
        hourlyTempData[i] = data.properties.periods[i].temperature
      }
      storage.setItem("hourlyTempData", hourlyTempData)
      
    })
    .catch(error => console.log('There was a getHourly error: ', error))
  } //end getHourly

function getMinMax(minMaxURL){
  fetch(minMaxURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    //assigns API info to variable data
    .then(function (data) { 
      console.log('From getMinMax function:');
      console.log(data);
      //store data
      storage.setItem("localMinTempC", data.properties.periods[0].temperature); 
      storage.setItem("localMaxTempC", data.properties.periods[1].temperature); 
      storage.setItem("localWindDirection", data.properties.periods[0].windDirection);
      storage.setItem("localWindSpeed", data.properties.periods[0].windSpeed); 
      
      
    })
    .catch(error => console.log('There was a getMinMax error: ', error))
  } //end getMinMax

// Populate the current location weather page
function buildPage(){
  // Task 1 - Feed data to WC, Dial, Image, Meters to feet and hourly temps functions
  //assigning variables
  let speed = storage.getItem('localWindSpeed');
  let temp = storage.getItem('localTempC');
  let direction = storage.getItem('localWindDirection');
  let conditionStatus = storage.getItem('localCondition');
  let meters = storage.getItem('localElevation');
  let calcSpeed = storage.getItem('calcSpeed');
  let hourlyTemps = storage.getItem("hourlyTempData");
  //function calls
  let windChill = buildWC((calcSpeed * 2.237), convertToFahrenheit(temp));
  windDial(direction);
  let condition = getCondition(conditionStatus);
  changeSummaryImage(condition);
  let feet = convertMeters(meters);
  buildHourlyData(nextHour,hourlyTemps);

  // Task 2 - Populate location information
  //assigning variables
  let locName = storage.getItem('locName');
  let locState = storage.getItem('locState');
  let longitude = storage.getItem('longitude'); 
  let latitude = storage.getItem('latitude');
  //populating page
  document.getElementById("elevation").innerHTML= feet;
  document.getElementById("elevation_notation").innerHTML= "ft";
  document.getElementById("contentHeading").innerHTML = locName +', '+ locState;
  document.getElementById("page-title").innerHTML = locName +', '+ locState + ' | The Weather Site';
  document.getElementById("zip").innerHTML = "missing";
  document.getElementById('longitude').innerHTML = Math.round(longitude);
  document.getElementById('latitude').innerHTML = Math.round(latitude);

  


  
  // Task 3 - Populate weather information
  //assigning variables
  let gusts = storage.getItem('localWindGust');
  var minTemp = storage.getItem('localMinTempC');
  var maxTemp = storage.getItem('localMaxTempC');
  if (minTemp > maxTemp){
    var minTemp = storage.getItem('localMaxTempC');
    var maxTemp = storage.getItem('localMinTempC');
  }
  //populating elements

  document.getElementById('direction').innerHTML = direction;
  document.getElementById('temp').innerHTML = Math.round(convertToFahrenheit(temp));
  document.getElementById('feelTemp').innerHTML = windChill;
  document.getElementById('wSpeed').innerHTML = speed;
  document.getElementById('condition_status').innerHTML = conditionStatus;
  document.getElementById('wind_gusts').innerHTML = gusts;
  document.getElementById('minTemp').innerHTML = minTemp;
  document.getElementById('maxTemp').innerHTML = maxTemp;


  // Task 4 - Hide status and show main
 }
 buildPage()
 function convertToFahrenheit(cels){
   let fheit = Math.round(cels * 1.8 + 32);
   return fheit;
}