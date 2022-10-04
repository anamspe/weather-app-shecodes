// Location data

function reveal(event) {
  event.preventDefault();
  let newCity = document.querySelector(".current-city");
  let search = document.querySelector("#search-form-container");
  newCity.innerHTML = `${search.value}`;
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", reveal);

// Temperature data

function swap() {
  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = `83º`;
}

let fahrenheitButton = document.querySelector("#fahrenheit-temp");
fahrenheitButton.addEventListener("click", swap);

function change() {
  let originalTemp = document.querySelector(".current-temp");
  originalTemp.innerHTML = `28º`;
}

let celsiusButton = document.querySelector("#celsius-temp");
celsiusButton.addEventListener("click", change);

function showLocation(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(`Lat is ${latitude} and Long is ${longitude}`);

  let apiKey = `6914b599dae34153d2187249330170b1`;
  let city = `Vancouver`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);

  function showInfo(response) {
    console.log(response);
    let temperature = Math.round(response.data.main.temp);
    let maxTemp = Math.round(response.data.main.temp_max);
    let minTemp = Math.round(response.data.main.temp_min);
    let city = response.data.name;
    let country = response.data.sys.country;
    let weatherDescription = response.data.weather.main;
    let wind = response.data.wind.speed;
  }

  axios.get(apiUrl).then(showInfo);
}

navigator.geolocation.getCurrentPosition(showLocation);
