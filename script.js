// Date and time
let now = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let weekDay = weekDays[now.getDay()];
let h2 = document.querySelector("#week-day-time");
let hours = [now.getHours()];
let minutes = [now.getMinutes()];
h2.innerHTML = `${weekDay}, ${hours}:${minutes}`;

let h1 = document.querySelector("h1");
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let day = [now.getDate()];
let year = [now.getFullYear()];
h1.innerHTML = `Today, ${month} ${day} ${year}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", show);
function show(event) {
  event.preventDefault();
  let showLocation = document.querySelector("#location");
  let location = document.querySelector("#search-text-input");
  if (location.value) {
    showLocation.innerHTML = `${location.value}`;
  } else {
    showLocation.innerHTML = null;
  }
}

// Weather Info Current Location - BONUS POINT

let button = document.querySelector("button");
button.addEventListener("click", getPosition);
button.addEventListener("click", getPositionAgain);
function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function getPositionAgain() {
  navigator.geolocation.getCurrentPosition(showPositionAgain);
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b34ed025ba1afe0a337cbcc37968d6f2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCity);
}
function showCity(response) {
  let cityName = document.querySelector("#location");
  cityName.innerHTML = response.data.name;
}
function showPositionAgain(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b34ed025ba1afe0a337cbcc37968d6f2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function showTemp(response) {
  let todayTemp = document.querySelector("#today-temp");
  let temp = Math.round(response.data.main.temp);
  todayTemp.innerHTML = `${temp}ºC`;
}
//Weather info Search - YOUR TASK

let formAgain = document.querySelector("#search-form");
formAgain.addEventListener("submit", displayCityTemp);

function displayCityTemp() {
  let location = document.querySelector("#search-text-input");
  let city = location.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b34ed025ba1afe0a337cbcc37968d6f2&units=metric`;
  axios.get(apiUrl).then(showCitySearched);
}
function showCitySearched(response) {
  let temperature = Math.round(response.data.main.temp);
  let todayTemp = document.querySelector("#today-temp");
  todayTemp.innerHTML = `${temperature}ºC`;
}
