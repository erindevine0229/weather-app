// API Key: b151c1f3e021551c216fcf9e899287cc 

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

    const mainCard = document.getElementById('main-card');
    const currentCity = document.createElement('h3');
    currentCity.textContent = cityInput;
    mainCard.append(currentCity);

  })

  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

});


