let currentDate = new Date();

let weekNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let week = weekNames[currentDate.getDay()];
console.log(week);

let hour = currentDate.getHours();
let mint = currentDate.getMinutes();
let seg = currentDate.getSeconds();
let time = `${hour}:${mint}:${seg}`;
console.log(time);

let viewDate = document.querySelector(".date");
let viewTime = document.querySelector(".time");
viewDate.textContent = week;
viewTime.textContent = time;

function search(event) {
  event.preventDefault();

  let searchinput = document.querySelector("#search-text");
  let apiKey = "9cb72bec958f8fb02391985ed7b219d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchinput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  let h5 = document.querySelector("h5");
}

let searchCities = document.querySelector("#search-form");
searchCities.addEventListener("submit", search);

function showTemperature(response) {
    celcius = response.data.main.temp;
  let h5 = document.querySelector("h5");
  h5.innerHTML = response.data.name;
  let temperature = Math.round(celcius);
  let hum = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = hum;
  let nowTemp = document.querySelector("#temperature-now");
  nowTemp.innerHTML = temperature;
  let realF = Math.round(response.data.main.feels_like);
  let real = document.querySelector("#real");
  real.innerHTML = realF;
  let icon = document.querySelector("#icon");
  icon.setAttribute("src",` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
let min = document.querySelector("#min");
let max = document.querySelector("#max");
min.innerHTML= Math.round(response.data.main.temp_min);
max.innerHTML= Math.round(response.data.main.temp_max);
let description = document.querySelector("#description");
description.innerHTML = response.data.weather[0].description
}

function showFarnightTemperature (event){
    event.preventDefault();
    celciusTemp.classList.remove("active");
    farnight.classList.add("active")
    let farnightTemperature = Math.round((celcius*9)/5 +32) ;
    let temperatureElement = document.querySelector("#temperature-now");
    temperatureElement.innerHTML = farnightTemperature

}


function showcelciusTemperature(event){
    event.preventDefault();
    celciusTemp.classList.add("active");
    farnight.classList.remove("active")
    let temperatureElement = document.querySelector("#temperature-now");
    temperatureElement.innerHTML = Math.round(celcius) 
}
let farnight = document.querySelector("#Frarnight");
farnight.addEventListener("click",showFarnightTemperature);
let celciusTemp = document.querySelector("#celciul-temperature");
celciusTemp.addEventListener("click",showcelciusTemperature);
let celcius = null;

///Bonus

function geoTemperature(response) {
  let temperatureGeo = Math.round(response.data.main.temp);
  let humGeo = response.data.main.humidity;
  let humidityGeo = document.querySelector("#humidity");
  humidityGeo.innerHTML = humGeo;
  let nowTempGeo = document.querySelector("#temperature-now");
  nowTempGeo.innerHTML = temperatureGeo;
  let realFg = Math.round(response.data.main.feels_like);
  let realG = document.querySelector("#real");
  realG.innerHTML = realFg;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let geoKey = "9cb72bec958f8fb02391985ed7b219d2";
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${geoKey}&units=metric`;
  axios.get(geoUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#location");
button.addEventListener("click", getPosition);
