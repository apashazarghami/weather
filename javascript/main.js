let city;
const serachIcon = document.querySelector(".search-icon");
const container = document.querySelector(".container");

const setCity = () => {
    const searchInput = document.querySelector(".search-input");
    city = searchInput.value;
}

const createMainWeather = (image, temperature, city, country) => {
    const mainDiv = document.createElement("div");
    const iconDiv = document.createElement("div");
    const forecastDiv = document.createElement("div");
    const weatherIcon = document.createElement("img");
    const temperatureDiv = document.createElement("div");
    const temperatureSpan = document.createElement("span");
    const degreeSup = document.createElement("sup");
    const countryDiv = document.createElement("div");
    const locationImage = document.createElement("img");
    const countrySpan = document.createElement("span");
    const citySpan = document.createElement("span");

    mainDiv.classList.add("main-forecast");
    weatherIcon.src = image;
    weatherIcon.classList.add("icon-image")
    iconDiv.appendChild(weatherIcon);
    temperatureSpan.innerText = `${temperature}`;
    temperatureSpan.classList.add("temperature");
    degreeSup.innerText = "°C";
    degreeSup.classList.add("degree")
    temperatureDiv.appendChild(temperatureSpan);
    temperatureDiv.appendChild(degreeSup);
    countryDiv.classList.add("country-information");
    forecastDiv.classList.add("forecast-information")
    forecastDiv.appendChild(temperatureDiv);
    forecastDiv.appendChild(countryDiv);
    locationImage.src = "../images/location-icon.png";
    citySpan.innerText = `${city},`
    citySpan.classList.add("city");
    countrySpan.innerText = `${country}`;
    countrySpan.classList.add("country");
    countryDiv.appendChild(locationImage);
    countryDiv.appendChild(citySpan);
    countryDiv.appendChild(countrySpan);
    mainDiv.appendChild(iconDiv);
    mainDiv.appendChild(forecastDiv);
    container.appendChild(mainDiv);
}

const serachHandler = () => {
    setCity();
    fetch(`http://api.weatherstack.com/forecast?access_key=6d05179956ec17bb7f0488a8ccd48eed&query=${city}`)
        .then(response => response.json())
        .then(json => {
            const imageSrc = json.current.weather_icons[0];
            const temperature = json.current.temperature;
            const city = json.location.name;
            const country = json.location.country;
            createMainWeather(imageSrc, temperature, city, country);
            // saveToLocalStorage(json);
        });
}

// const saveToLocalStorage = (weatherInformation) => {
//     let weatherInformations;
//     if (localStorage.getItem("weather-information") === null) {
//         weatherInformations = [];
//     } else {
//         weatherInformations = JSON.parse(localStorage.getItem("weather-information"));
//     }
//     weatherInformations.push(weatherInformation);
//     localStorage.setItem("weather-information", JSON.stringify(weatherInformations));
// }

serachIcon.addEventListener("click", serachHandler);
