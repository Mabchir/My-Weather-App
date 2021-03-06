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
  console.log(response);
  let temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;

  let tempVal = document.querySelector(".temp1-val");
  tempVal.innerHTML = `${temp}`;
  tempVal.value = temp;

  let windVal = document.querySelector(".wind2");
  windVal.innerHTML = `${wind} m/s`;

  let humVal = document.querySelector(".humidity2");
  humVal.innerHTML = `${humidity}%`;

  let descrVal = document.querySelector(".description");
  descrVal.innerHTML = `${description}`;
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
  updateHourly(newCityName.value);
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

// updating hourly forcast

function updateHourlyHelper2(response) {
  console.log(response);

  // Changing the icon for current time
  let currentIcon = document.querySelector(".temp1-emoji");
  let iconCode = response.data.current.weather[0].icon;
  let iconLink = `https://openweathermap.org/img/wn/${iconCode}.png`;
  currentIcon.innerHTML = `<img src=${iconLink} />`;

  // Changing the icon for 12 pm
  let hourlyIcon1 = document.querySelector(".hourly-temp1 .emoji");
  let iconCode1 = response.data.hourly[11].weather[0].icon;
  let iconLink1 = `https://openweathermap.org/img/wn/${iconCode1}.png`;
  hourlyIcon1.innerHTML = `<img src=${iconLink1} />`;

  // Changing the icon for 3 pm
  let hourlyIcon2 = document.querySelector(".hourly-temp2 .emoji");
  let iconCode2 = response.data.hourly[14].weather[0].icon;
  let iconLink2 = `https://openweathermap.org/img/wn/${iconCode2}.png`;
  hourlyIcon2.innerHTML = `<img src=${iconLink2} />`;

  // Changing the icon for 6 pm
  let hourlyIcon3 = document.querySelector(".hourly-temp3 .emoji");
  let iconCode3 = response.data.hourly[17].weather[0].icon;
  let iconLink3 = `https://openweathermap.org/img/wn/${iconCode3}.png`;
  hourlyIcon3.innerHTML = `<img src=${iconLink3} />`;

  // Changing the icon for 9 pm
  let hourlyIcon4 = document.querySelector(".hourly-temp4 .emoji");
  let iconCode4 = response.data.hourly[20].weather[0].icon;
  let iconLink4 = `https://openweathermap.org/img/wn/${iconCode4}.png`;
  hourlyIcon4.innerHTML = `<img src=${iconLink4} />`;

  // Changing the icon for 11 pm
  let hourlyIcon5 = document.querySelector(".hourly-temp5 .emoji");
  let iconCode5 = response.data.hourly[23].weather[0].icon;
  let iconLink5 = `https://openweathermap.org/img/wn/${iconCode5}.png`;
  hourlyIcon5.innerHTML = `<img src=${iconLink5} />`;
}
function updateHourlyHelper1(response) {
  let apiKey = "88a78e66d2f90d07860c0aa03d94e774";
  let lat = response.data[0].lat;
  let lon = response.data[0].lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  https: axios.get(apiUrl).then(updateHourlyHelper2);
}

function updateHourly(cityName) {
  let apiKey = "88a78e66d2f90d07860c0aa03d94e774";
  let apiUrlloc = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
  axios.get(apiUrlloc).then(updateHourlyHelper1);
}

// A function that gets the waether of a current GPS location

function upDateLocal(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "88a78e66d2f90d07860c0aa03d94e774";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  let cityName = document.querySelector("#cityname");
  cityName.innerHTML = "Your Location";
  axios.get(apiUrl).then(updateTempHelper);
  axios.get(apiUrl2).then(updateHourlyHelper2);
}
// A function that gets the client's location

function displayLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(upDateLocal);
}
let button = document.querySelector(".currentLoc");
button.addEventListener("click", displayLocation);
