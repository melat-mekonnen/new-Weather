function refresh(response) {
    console.log(response.data);
    let updateTemp = document.querySelector("#temp");
    let cityElement = document.querySelector("#city");
    let temperature = response.data.temperature.current;
    let description = document.querySelector("#description-cloud");
    let humidityElemen = document.querySelector("#humidity");
    let windElement = document.querySelector("#speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time*1000);
   
    cityElement.innerHTML = response.data.city;
    updateTemp.innerHTML = Math.round(temperature);
    description.innerHTML = response.data.condition.description;
    humidityElemen.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date);
}
function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
   if (hours< 10) {
        hours = `0${hours}`;
    }
   if (minutes< 10) {
        minutes= `0${minutes}`;
    }
 return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "tbf19bo66f32a03f4f87730a62c26921";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refresh);
}

function handleform(event) {
    event.preventDefault();
    let searchforminput = document.querySelector("#search-form-input");
    let City = document.querySelector("#city");
    City.innerHTML = searchforminput.value;
    searchCity(searchforminput.value);
}
let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", handleform);
searchCity("paris");