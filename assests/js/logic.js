

const apiKey = 'b151c1f3e021551c216fcf9e899287cc';


let cityList = JSON.parse(localStorage.getItem("City Input"));
if (!cityList) {
    cityList = [];
}


const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-submit-btn');

searchBtn.addEventListener('click', function (event) {

event.preventDefault();
let cityInput = searchBar.value;

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${apiKey}`)
.then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);

    cityList.push(cityInput);
    localStorage.setItem("City Input", JSON.stringify(cityList));

    const cityLog = document.getElementById('city-buttons-container');
    const searchedCity = document.createElement('button');
    searchedCity.classList.add('log-btns')
    searchedCity.textContent = cityInput;
    cityLog.append(searchedCity);

  })

  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

});





const cityInput = searchBar.value.trim();

fetch(`api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}`)
.then(function (response) {
  console.log(response)
  return response.json
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});

const date = dayjs().format('M/D/YYYY');
const temperature = data.main.temp;
const wind = data.wind.speed;
const humidity = data.main.humidity;
const weatherEmoji = data.weather.icon;


todayForecast = document.getElementById('main-card');

const mainHeader = document.createElement(h4);
mainHeader.textContent = `${cityInput} (${date}) ${weatherEmoji}`;

const mainTemp = document.createElement('p');
mainTemp.textContent = `Temp: ${temperature} °F`;

const mainWind = document.createElement('p');
mainTemp.textContent = `Wind: ${wind} mph`;

const mainHumidity = document.createElement('p');
mainTemp.textContent = `Humidity: ${humidity} %`;

todayForecast.append(mainHeader);
todayForecast.append(mainTemp);
todayForecast.append(mainWind);
todayForecast.append(mainHumidity);

