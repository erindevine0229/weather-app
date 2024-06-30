
// API key for fetch calls
const apiKey = 'b151c1f3e021551c216fcf9e899287cc';

// Create array to store the search history buttons for cities entered by user (obtained from local storage)
let cityList = JSON.parse(localStorage.getItem("City Input")) || [];


// Access HTML search bar/button in order to obtain user input
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-submit-btn');

searchBtn.addEventListener('click', function (event) {

event.preventDefault();
const cityInput = searchBar.value.trim();

// Fetch request to obtain lat/lon info for city based on name entered by user 
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`)
.then(response => {
    if (!response.ok) {
      throw new Error('Not able to fetch data.');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);

    // add fetched data to array of objects set to local storage
    cityList.push({city: cityInput, lat: data.coord.lat, lon: data.coord.lon});
    localStorage.setItem("City Input", JSON.stringify(cityList));

    // Append contents of array to the page to display as buttons
    const cityLog = document.getElementById('city-buttons-container');
    const searchedCity = document.createElement('button');
    searchedCity.classList.add('log-btns')
    searchedCity.textContent = cityInput;
    cityLog.append(searchedCity);


// Fetch request to retrieve and show forecast info based on most recent searched city. 
fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityList[cityList.length -1].lat}&lon=${cityList[cityList.length -1].lon}&appid=${apiKey}`)

.then(response => {
  if (!response.ok) {
    throw new Error('Not able to fetch data.');
  }
  return response.json();
})
.then(currentData => {
  console.log(currentData);

// Set data to each element of main card based on fetch content
const date = dayjs(currentData.list[0].dt_txt).format('M/D/YYYY');
const temperature = currentData.list[0].main.temp;
const wind = currentData.list[0].wind.speed;
const humidity = currentData.list[0].main.humidity;
const weatherEmoji = currentData.list[0].weather[0].icon;

// Reference the container for current forecase
const todayForecast = document.getElementById('main-card');

// Add text content for each element of main card forecast
const mainHeader = document.createElement('h4');
mainHeader.textContent = `${cityInput} (${date}) ${weatherEmoji}`;

const mainTemp = document.createElement('p');
mainTemp.textContent = `Temp: ${temperature} °F`;

const mainWind = document.createElement('p');
mainWind.textContent = `Wind: ${wind} mph`;

const mainHumidity = document.createElement('p');
mainHumidity.textContent = `Humidity: ${humidity} %`;

// Append all new elements to the main card container
todayForecast.append(mainHeader);
todayForecast.append(mainTemp);
todayForecast.append(mainWind);
todayForecast.append(mainHumidity);
todayForecast.style.display = 'block';

// Loop through the data and INCREMENT based on 8 given how data is returned based on 3 hour increments for each date (every 8th index will be a new day)
for (let i = 8; i < currentData.list.length; i += 8) {

    const forecastIndex = (i - 8) / 8; 

  const fiveDayCards = document.getElementsByClassName('day-cards')[forecastIndex];
  

  const fiveDate = document.createElement('h5');
  fiveDate.textContent = dayjs(currentData.list[i].dt_txt).format('M/D/YYYY');

  const fiveEmoji = document.createElement('img');
  fiveEmoji.src = `http://openweathermap.org/img/wn/${currentData.list[i].weather[0].icon}.png`

  const fiveTemp = document.createElement('p');
  fiveTemp.textContent = `Temp: ${currentData.list[i].main.temp} °F`;

  const fiveWind = document.createElement('p');
  fiveWind.textContent = `Wind: ${currentData.list[i].wind.speed} mph`;

  const fiveHumid = document.createElement('p');
  fiveHumid.textContent = `Humidity: ${currentData.list[i].main.humidity} %`;



  fiveDayCards.append(fiveDate);
  fiveDayCards.append(fiveEmoji);
  fiveDayCards.append(fiveTemp);
  fiveDayCards.append(fiveWind);
  fiveDayCards.append(fiveHumid);

  fiveDayCards.style.display = 'block';
}

})
.catch(error => {
  console.log(error);
  });
})
.catch(error => {
  console.log(error);
  });
});
