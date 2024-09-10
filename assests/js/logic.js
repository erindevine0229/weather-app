
// API key for fetch calls
const apiKey = 'b151c1f3e021551c216fcf9e899287cc';

const logButtonsContainer= document.getElementById('city-buttons-container');
const todayForecastContainer = document.getElementById('main-card');
const fiveDayContainer = document.getElementById('five-day');

// Create array to store the search history buttons for cities entered by user (obtained from local storage)
let cityList = JSON.parse(localStorage.getItem("City Input")) || [];


// Access HTML search bar/button in order to obtain user input
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-submit-btn');


searchBtn.addEventListener('click', function (event) {

event.preventDefault();
const cityInput = searchBar.value.trim();

if (!cityInput) {
    alert("Please enter the name of a city you'd like to search for!")
} else {
  logNewCity(cityInput);
  saveCityToHistory(cityInput);
  getCurrentWeather(cityInput);
  getFiveForecast(cityInput);

}
});

function logNewCity (cityInput) {
  
  const cityBtn = document.createElement('button');
  cityBtn.classList.add('log-btns');
  cityBtn.textContent = cityInput;

  cityBtn.addEventListener('click', function (event) {
    event.preventDefault();
    getCurrentWeather(cityInput);
    getFiveForecast(cityInput);

  });

  logButtonsContainer.append(cityBtn);

}


function saveCityToHistory(cityInput) {
  if (!cityList.includes(cityInput)) {
    cityList.push(cityInput);
    localStorage.setItem('cityList', JSON.stringify(cityList));
  }
};


function getAllCities () {
  const allCities = JSON.parse(localStorage.getItem('cityList')) || [];
  allCities.forEach(function(cityInput) {
    logNewCity(cityInput);
  })
};

document.addEventListener('DOMContentLoaded', getAllCities);


function getCurrentWeather (cityInput) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=imperial`, {
})
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let currentWeather = {
      cityName: data.name,
      todayDate: dayjs().format('M/D/YYYY'),
      todayTemp: data.main.temp,
      todayWind: data.wind.speed,
      todayHumid: data.main.humidity,
      todayEmoji: data.weather[0].icon
    }

    createMainCard(currentWeather);

  })
};


function getFiveForecast(cityInput) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${cityInput}&appid=${apiKey}`, {

  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Clear our any prior data first
    fiveDayContainer.innerHTML = '';
    for (let i = 0; i <= 32; i += 8) {
      let fiveDayWeather = {
          date: dayjs(data.list[i].dt_txt).format('M/D/YYYY'),
          temp: data.list[i].main.temp,
          humidity: data.list[i].main.humidity,
          wind: data.list[i].wind.speed,
          icon: data.list[i].weather[0].icon
      }

      createFiveDayCards(fiveDayWeather);
    }
  })
};


function createMainCard (currentWeather) {
// Clear any prior data first
  todayForecastContainer.innerHTML = '';

  if (!currentWeather || !currentWeather.todayEmoji) {
    console.error("Current weather data not available");
    return;
};

  // Add text content for each element of main card forecast
  const todayEmoji = document.createElement('img');
  todayEmoji.src = `https://openweathermap.org/img/w/${currentWeather.todayEmoji}.png`;
  todayEmoji.alt = "Weather Icon";

  const mainHeaderEl = document.createElement('h4');
  mainHeaderEl.textContent = `${currentWeather.cityName} (${currentWeather.todayDate})`;
  mainHeaderEl.appendChild(todayEmoji);

  const mainTempEl = document.createElement('p');
  mainTempEl.textContent = `Temp: ${currentWeather.todayTemp} °F`;
  
  const mainWindEl = document.createElement('p');
  mainWindEl.textContent = `Wind: ${currentWeather.todayWind} mph`;
  
  const mainHumidityEl = document.createElement('p');
  mainHumidityEl.textContent = `Humidity: ${currentWeather.todayHumid} %`;

  // Append all elements to the main weather display container (today forecast)
  todayForecastContainer.append(mainHeaderEl);
  todayForecastContainer.append(mainTempEl);
  todayForecastContainer.append(mainWindEl);
  todayForecastContainer.append(mainHumidityEl);
  todayForecastContainer.style.display = 'block';

};

function createFiveDayCards (fiveDayWeather) {
  const fiveCards = document.createElement('div');
  fiveCards.classList.add('day-cards');
  const fiveDateEl = document.createElement('h5');
  fiveDateEl.textContent = fiveDayWeather.date;

  const fiveEmojiEl = document.createElement('img');
  fiveEmojiEl.src = `http://openweathermap.org/img/wn/${fiveDayWeather.icon}.png`;

  const fiveTempEl = document.createElement('p');
  fiveTempEl.textContent = `Temp: ${fiveDayWeather.temp} °F`;
  const fiveWindEl = document.createElement('p');
  fiveWindEl.textContent = `Wind: ${fiveDayWeather.wind} mph`;
  const fiveHumidEl = document.createElement('p');
  fiveHumidEl.textContent = `Humidity: ${fiveDayWeather.humidity} %`;

  fiveCards.append(fiveDateEl);
  fiveCards.append(fiveEmojiEl);
  fiveCards.append(fiveTempEl);
  fiveCards.append(fiveWindEl);
  fiveCards.append(fiveHumidEl);
  
  fiveDayContainer.append(fiveCards);
  fiveDayContainer.style.display = 'block';

};
