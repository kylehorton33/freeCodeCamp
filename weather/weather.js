//https://www.freecodecamp.org/learn/coding-interview-prep/take-home-projects/show-the-local-weather


const API_URL = 'https://weather-proxy.freecodecamp.rocks/';
const x = document.getElementById('geolocation');
var celciusDisplay = true;
var data = {};

//User Story: I can see the weather in my current location.
function getLocation() {
  

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function getWeather(position) {

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  x.innerHTML = `Latitude: ${latitude} <br> Longitude: ${longitude}`
  
  fetch(API_URL + `api/current?lon=${longitude}&lat=${latitude}`)
    .then(res => res.json())
    .then(data => showWeather(data))
    .catch(err => console.log(err));
}

function swapUnits () {
  celciusDisplay = !celciusDisplay;
  showWeather(data);
}


function showWeather(weatherData) {
  console.log(data);
  data = weatherData;
  const currentWeather = document.getElementById('current-weather');
  
  

  //User Story: I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;
  
  var temp = data.main.temp;
  var hi = data.main.temp_max;
  var lo = data.main.temp_min;
  var unit = '\u00B0C'

  if (!celciusDisplay) {
    temp = temp * 9/5 + 32;
    hi = hi * 9/5 + 32;
    lo = lo * 9/5 + 32;
    unit = '\u00B0F'
  }
  
  

  currentWeather.innerHTML = 
    `<img src='${icon}' /><br>
    ${description.toUpperCase()}<br> 
    Current Temp: ${temp.toFixed(1)}${unit}<br>
    Hi: ${hi.toFixed(1)} , Lo: ${lo.toFixed(1)}<br><br>
    <button onclick='swapUnits()' id='unit-toggle'></button>`

  //User Story: I can push a button to toggle between Fahrenheit and Celsius.
  const unitToggle = document.getElementById('unit-toggle');

  
  if (celciusDisplay) {
    unitToggle.innerHTML = 'Show in Fahrenheit';
  }
  else {
    unitToggle.innerHTML = 'Show in Celcius';
  }  

  

}







