let city;
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

const serachHandler = () => {
    setCity();
    if(container.children.length === 1) {
        fetch(`http://api.weatherstack.com/forecast?access_key=6d05179956ec17bb7f0488a8ccd48eed&query=${city}`)
            .then(response => response.json())
            .then(json => {
                const imageSrc = json.current.weather_icons[0];
                const temperature = json.current.temperature;
                const city = json.location.name;
                const country = json.location.country;
                createMainWeather(imageSrc, temperature, city, country);
                // saveToLocalStorage(json);
                setDay();
            });
    }
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
