// a function that updates the date and time

function updateDate() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Creating a new Date object
  let newDate = new Date();

  // Extracting the newDate's elements

  let day = days[newDate.getDay()];
  let month = months[newDate.getMonth()];
  let year = newDate.getFullYear();
  let date = newDate.getDate();
  let hour = newDate.getHours();
  let min = newDate.getMinutes();

  // updating the Date field according to the elements collected
  let oldDate = document.querySelector("#date");
  oldDate.innerHTML = `${day} ${hour}:${min} , ${month} ${date}, ${year}`;
}

// Update tempmerature metric

function updateTempHelper(response) {
  let temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let tempVal = document.querySelector(".temp1-val");
  tempVal.innerHTML = `${temp}`;
  tempVal.value = temp;

  let windVal = document.querySelector(".wind2");
  windVal.innerHTML = `${wind} m/s`;

  let humVal = document.querySelector(".humidity2");
  humVal.innerHTML = `${humidity}%`;
}
function updateTemp(cityName) {
  let apiKey = "88a78e66d2f90d07860c0aa03d94e774";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTempHelper);
}

// Update tempmerature imperial

function updateTempF(cityName) {
  let apiKey = "88a78e66d2f90d07860c0aa03d94e774";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateTempHelper);
}
// Updating the city according to user input
function updatecity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityname");
  let newCityName = document.querySelector("#city-input");

  cityName.innerHTML = `${newCityName.value}`;

  updateDate();
  updateTemp(newCityName.value);
}

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", updatecity);

// Changing the unit of the temperature

// a function that changes the temp to farenheit

function displayF(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityname");
  if (cityName.innerHTML === "Your Location") {
    let tempVal = document.querySelector(".temp1-val");
    tempVal.value = Math.round((tempVal.value * 9) / 5 + 32);
    tempVal.innerHTML = tempVal.value;
  } else {
    updateTempF(cityName.innerHTML);
  }
}
let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", displayF);

// a function that changes the temp to Celcius
function displayC(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityname");
  if (cityName.innerHTML === "Your Location") {
    let tempVal = document.querySelector(".temp1-val");
    tempVal.value = ((tempVal.value - 32) * 5) / 9;
    tempVal.innerHTML = tempVal.value;
  } else {
    updateTemp(cityName.innerHTML);
  }
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", displayC);

// A function that gets the waether of a current GPS location

function upDateLocal(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "88a78e66d2f90d07860c0aa03d94e774";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  let cityName = document.querySelector("#cityname");
  cityName.innerHTML = "Your Location";
  axios.get(apiUrl).then(updateTempHelper);
}
// A function that gets the client's location

function displayLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(upDateLocal);
}
let button = document.querySelector(".currentLoc");
button.addEventListener("click", displayLocation);
