function refresh(response) {
    //console.log(response.data);
    let updateTemp = document.querySelector("#temp");
    let cityElement = document.querySelector("#city");
    let temperature = response.data.temperature.current;
    let description = document.querySelector("#description-cloud");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#weather-app-icon");
   
    cityElement.innerHTML = response.data.city;
    updateTemp.innerHTML = Math.round(temperature);
    description.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed} km/h`;
    timeElement.innerHTML = formatDate(date);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon">`;
    getForecast(response.data.city);
}

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "tbf19bo66f32a03f4f87730a62c26921";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refresh);
}

function handleForm(event) {
    event.preventDefault();
    let searchFormInput = document.querySelector("#search-form-input");
    let city = document.querySelector("#city");
    city.innerHTML = searchFormInput.value;
    searchCity(searchFormInput.value);
}

function getForecast(city) {
    let apiKey = "tbf19bo66f32a03f4f87730a62c26921";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(display_forecast);
}

function display_forecast(response) {
    let forecastHtml = "";
    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
            let date = new Date(day.time * 1000);
            let dayName = date.toLocaleString("en-US", { weekday: "short" });
            forecastHtml += `
            <div class="weather-forecast">
                <div class="weather-forecast-day">
                    <div class="weather-forecast-date">${dayName}</div>
                    <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
                    <div class="weather-forecast-temperatures">
                        <div class="weather-forecast-temperature">${Math.round(day.temperature.maximum)}°</div>
                        <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
                    </div>
                </div>
            </div>
        `;
        }
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleForm);
searchCity("paris");
