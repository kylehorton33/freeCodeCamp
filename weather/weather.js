//https://www.freecodecamp.org/learn/coding-interview-prep/take-home-projects/show-the-local-weather


const API_URL = 'https://weather-proxy.freecodecamp.rocks/';
const x = document.getElementById('geolocation');

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

function showWeather(data) {
  console.log(data);
  const currentWeather = document.getElementById('current-weather');

  //User Story: I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;
  
  const temp = data.main.temp;
  const hi = data.main.temp_max;
  const lo = data.main.temp_min;
  

  currentWeather.innerHTML = 
    `<img src='${icon}' /><br>
    ${description.toUpperCase()}<br> 
    Current Temp: ${temp}<br>
    Hi: ${hi} , Lo: ${lo}`

}





//User Story: I can push a button to toggle between Fahrenheit and Celsius.
