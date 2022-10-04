// Time data

let today = new Date();
// console.log(today);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[today.getDay()];
// console.log(day);

let hours = today.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = `${hours}:${minutes}`;
// console.log(time);

let currentDayTime = document.querySelector("#day-and-time");
currentDayTime.innerHTML = `${day} | ${time}`;

// Location data

// function reveal(event) {
//   event.preventDefault();
//   let newCity = document.querySelector(".current-city");
//   let search = document.querySelector("#search-form-container");
//   newCity.innerHTML = `${search.value}`;
// }

// let searchCity = document.querySelector("#search-form");
// searchCity.addEventListener("submit", reveal);

// // Temperature data

// function swap() {
//   let currentTemp = document.querySelector(".current-temp");
//   currentTemp.innerHTML = `83º`;
// }

// let fahrenheitButton = document.querySelector("#fahrenheit-temp");
// fahrenheitButton.addEventListener("click", swap);

// function change() {
//   let originalTemp = document.querySelector(".current-temp");
//   originalTemp.innerHTML = `28º`;
// }

// let celsiusButton = document.querySelector("#celsius-temp");
// celsiusButton.addEventListener("click", change);

// HW #5
function displayCurrentInfo(handleInfo) {
  console.log(handleInfo);
  let currentCity = document.querySelector(".current-city");
  let currentCountry = handleInfo.data.sys.country;
  currentCity.innerHTML = `${handleInfo.data.name}, ${currentCountry}`;
  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = `${Math.round(handleInfo.data.main.temp)}º`;

  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = `${Math.round(handleInfo.data.main.temp_min)}º`;
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = `${Math.round(handleInfo.data.main.temp_max)}º`;

  let currentDescription = document.querySelector(".temp-description");
  currentDescription.innerHTML = handleInfo.data.weather[0].main;
}

function showCurrentTemp(response) {
  // console.log(response);
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
  let units = `metric`;
  let apiKey = `6914b599dae34153d2187249330170b1`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayCurrentInfo);
}

function showSearchInfo(response) {
  // console.log(response);
  let city = document.querySelector("#search-form-container").value;
  let units = `metric`;
  let apiKey = `6914b599dae34153d2187249330170b1`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayCurrentInfo);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentTemp);
}

function getCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-form-container");
  showSearchInfo(searchCity);
}

let homeButton = document.querySelector("#home");
homeButton.addEventListener("click", getCurrentPosition);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);
