function refresh(response) {
    let updateTemp = document.querySelector("#temp");
  let temperature  = response.data.temperature.current;
    updateTemp.innerHTML= Math.round(temperature);

    console.log(response.data.temperature.current);
}

function connection(city) {
    let apiKey = "tbf19bo66f32a03f4f87730a62c26921";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refresh);
}

function handleform(event) {
    event.preventDefault();
    let searchforminput = document.querySelector("#search-form-input");
    let City = document.querySelector("#city");
    City.innerHTML = searchforminput.value;
    connection(searchforminput.value);
}
let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", handleform);