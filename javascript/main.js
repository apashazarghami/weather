let city;
const popularLocationsDiv = document.createElement("div");
const serachIcon = document.querySelector(".search-icon");
const container = document.querySelector(".container");

const setCity = () => {
    const searchInput = document.querySelector(".search-input");
    city = searchInput.value;
    searchInput.value = ""
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
    weatherIcon.classList.add("icon-image-main")
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
    citySpan.classList.add("main-city");
    countrySpan.innerText = `${country}`;
    countrySpan.classList.add("main-country");
    countryDiv.appendChild(locationImage);
    countryDiv.appendChild(citySpan);
    countryDiv.appendChild(countrySpan);
    mainDiv.appendChild(iconDiv);
    mainDiv.appendChild(forecastDiv);
    container.appendChild(mainDiv);
}

const setDay = () => {
    const divDays = document.createElement("div");
    const sunSpan = document.createElement("span");
    const monSpan = document.createElement("span");
    const tueSpan = document.createElement("span");
    const wedSpan = document.createElement("span");
    const thuSpan = document.createElement("span");
    const friSpan = document.createElement("span");
    const satSpan = document.createElement("span");
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    divDays.classList.add("days");
    sunSpan.innerText = "Sun";
    monSpan.innerText = "Mon";
    tueSpan.innerText = "Tue";
    wedSpan.innerText = "Wed";
    thuSpan.innerText = "Thu";
    friSpan.innerText = "Fri";
    satSpan.innerText = "Sat";
    divDays.appendChild(sunSpan);
    divDays.appendChild(monSpan);
    divDays.appendChild(tueSpan);
    divDays.appendChild(wedSpan);
    divDays.appendChild(thuSpan);
    divDays.appendChild(friSpan);
    divDays.appendChild(satSpan);
    container.appendChild(divDays);
    const today = days[new Date().getDay()];
    const daysSpan = document.querySelector(".container").children[2].children;
    for(let item of daysSpan) {
        if (item.innerText === today) {
            item.classList.add("day")
        }
    }
}

const setTitle = () => {
    const popularLocations = document.createElement("h3");
    popularLocations.innerText = "Popular Locations";
    popularLocations.classList.add("title");
    popularLocationsDiv.appendChild(popularLocations);
    container.appendChild(popularLocationsDiv);
}

const cardsDiv = document.createElement("div");
const weatherHandler = (temperatue, condition, city, country, image) => {
    const cardDiv = document.createElement("div");
    const forecastsDiv = document.createElement("div");
    const iconDiv = document.createElement("div");
    const temperaturesDiv = document.createElement("div");
    const cityCountryDiv = document.createElement("div");
    const weatherSpan = document.createElement("span");
    const degreeSpan = document.createElement("sup");
    const conditionSpan = document.createElement("span");
    const citySpan = document.createElement("span");
    const countrySpan = document.createElement("span");
    const iconImage = document.createElement("img");
    cardsDiv.classList.add("cards");
    cardDiv.classList.add("card");
    weatherSpan.classList.add("weatherForecast");
    degreeSpan.classList.add("degreeCelcius");
    conditionSpan.classList.add("condition");
    citySpan.classList.add("city");
    countrySpan.classList.add("country");
    iconImage.classList.add("icon-image")
    weatherSpan.innerText = temperatue;
    degreeSpan.innerText = "°C";
    conditionSpan.innerText = condition;
    citySpan.innerText = `${city},`;
    countrySpan.innerText = country;
    iconImage.src = image;
    cardDiv.appendChild(forecastsDiv);
    cardDiv.appendChild(iconDiv);
    forecastsDiv.appendChild(temperaturesDiv);
    forecastsDiv.appendChild(cityCountryDiv);
    temperaturesDiv.appendChild(weatherSpan);
    temperaturesDiv.appendChild(degreeSpan);
    temperaturesDiv.appendChild(conditionSpan);
    cityCountryDiv.appendChild(citySpan);
    cityCountryDiv.appendChild(countrySpan);
    iconDiv.appendChild(iconImage)
    cardsDiv.appendChild(cardDiv);
    popularLocationsDiv.appendChild(cardsDiv); 
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
                const weatherDescriptions = json.current.weather_descriptions[0];
                if(container.children.length === 1) {
                    createMainWeather(imageSrc, temperature, city, country);
                    // saveToLocalStorage(json);
                    setDay();
                    setTitle();
                }
                weatherHandler(temperature, weatherDescriptions, city, country, imageSrc);
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
