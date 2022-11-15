let city;
const popularLocationsDiv = document.createElement("div"),
  serachIcon = document.querySelector(".search-icon"),
  container = document.querySelector(".container"),
  singleWeather = document.querySelector(".single-weather"),
  apiKey = "6d05179956ec17bb7f0488a8ccd48eed";

const setCity = () => {
  const searchInput = document.querySelector(".search-input");
  city = searchInput.value;
  searchInput.value = "";
};

const getWeatherResponse = (weatherInformation, isSave) => {
  const imageSrc = weatherInformation.current.weather_icons[0],
    temperature = weatherInformation.current.temperature,
    city = weatherInformation.location.name,
    country = weatherInformation.location.country,
    weatherDescriptions = weatherInformation.current.weather_descriptions[0];
  if (container.children.length === 1) {
    createMainWeather(imageSrc, temperature, city, country);
    createDays(container, ".container");
    setTitle();
  }
  weatherHandler(temperature, weatherDescriptions, city, country, imageSrc);
  isSave && saveToLocalStorage(city);
};

const createTag = (tagName, tag, parentTag, className, sourceOrText) => {
  tagName = document.createElement(tag);
  tagName.classList.add(className);
  parentTag.appendChild(tagName);
  if (tag == "img") {
    tagName.src = sourceOrText;
  } else {
    tagName.innerText = sourceOrText;
  }
  return tagName;
};

const createMainWeather = (image, temperature, city, country) => {
  let mainDiv,
    iconDiv,
    forecastDiv,
    weatherIcon,
    temperatureDiv,
    temperatureSpan,
    degreeSup,
    countryDiv,
    locationImage,
    countrySpan,
    citySpan;
  const mainDivTag = createTag(mainDiv, "div", container, "main-forecast", ""),
    iconDivTag = createTag(iconDiv, "div", mainDivTag, "nothing", ""),
    forecastDivTag = createTag(
      forecastDiv,
      "div",
      mainDivTag,
      "forecast-information",
      ""
    ),
    temperatureDivTag = createTag(
      temperatureDiv,
      "div",
      forecastDivTag,
      "nothing",
      ""
    ),
    countryDivTag = createTag(
      countryDiv,
      "div",
      forecastDivTag,
      "country-information",
      ""
    );
  createTag(weatherIcon, "img", iconDivTag, "icon-image-main", image);
  createTag(
    temperatureSpan,
    "span",
    temperatureDivTag,
    "temperature",
    `${temperature}`
  );
  createTag(degreeSup, "sup", temperatureDivTag, "degree", "°C");
  createTag(
    locationImage,
    "img",
    countryDivTag,
    "nothing",
    "./images/location-icon.png"
  );
  createTag(countrySpan, "span", countryDivTag, "main-country", `${country},`);
  createTag(citySpan, "span", countryDivTag, "main-city", `${city}`);
};

const createDays = (element, className) => {
  let divDays, sunSpan, monSpan, tueSpan, wedSpan, thuSpan, friSpan, satSpan;
  const divDaysTag = createTag(divDays, "div", element, "days", ""),
    days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  createTag(sunSpan, "span", divDaysTag, "nothing", "Sun");
  createTag(monSpan, "span", divDaysTag, "nothing", "Mon");
  createTag(tueSpan, "span", divDaysTag, "nothing", "Tue");
  createTag(wedSpan, "span", divDaysTag, "nothing", "Wed");
  createTag(thuSpan, "span", divDaysTag, "nothing", "Thu");
  createTag(friSpan, "span", divDaysTag, "nothing", "Fri");
  createTag(satSpan, "span", divDaysTag, "nothing", "Sat");
  const today = days[new Date().getDay()];
  const daysSpan = document.querySelector(className).children[2].children;
  for (let item of daysSpan) {
    if (item.innerText === today) {
      item.classList.add("day");
    }
  }
};

const setTitle = () => {
  let popularLocations;
  createTag(
    popularLocations,
    "h3",
    popularLocationsDiv,
    "title",
    "Popular Locations"
  );
  container.appendChild(popularLocationsDiv);
};

const cardsDiv = document.createElement("div");

const weatherHandler = (temperatue, condition, city, country, image) => {
  let cardDiv,
    forecastsDiv,
    iconDiv,
    temperaturesDiv,
    cityCountryDiv,
    weatherSpan,
    degreeSpan,
    conditionSpan,
    citySpan,
    countrySpan,
    iconImage;
  const cardDivTag = createTag(cardDiv, "div", cardsDiv, "card", ""),
    forecastsDivTag = createTag(forecastsDiv, "div", cardDivTag, "nothing", ""),
    iconDivTag = createTag(iconDiv, "div", cardDivTag, "nothing", ""),
    temperaturesDivTag = createTag(
      temperaturesDiv,
      "div",
      forecastsDivTag,
      "nothing",
      ""
    ),
    cityCountryDivTag = createTag(
      cityCountryDiv,
      "div",
      forecastsDivTag,
      "nothing",
      ""
    );
  createTag(
    weatherSpan,
    "span",
    temperaturesDivTag,
    "weatherForecast",
    temperatue
  );
  createTag(degreeSpan, "sup", temperaturesDivTag, "degreeCelcius", "°C");
  createTag(conditionSpan, "span", temperaturesDivTag, "condition", condition);
  createTag(citySpan, "span", cityCountryDivTag, "city", `${city},`);
  createTag(countrySpan, "span", cityCountryDivTag, "country", country);
  // condition === "Haze" ? createTag(iconImage, "img", iconDivTag, "icon-image", "../images/haze.jpg") : createTag(iconImage, "img", iconDivTag, "icon-image", image);
  createTag(iconImage, "img", iconDivTag, "icon-image", image);
  cardsDiv.classList.add("cards");
  popularLocationsDiv.appendChild(cardsDiv);
};

const searchHandler = () => {
  setCity();
  fetch(
    `http://api.weatherstack.com/forecast?access_key=${apiKey}&query=${city}`
  )
    .then((response) => response.json())
    .then((weatherInformation) => {
      getWeatherResponse(weatherInformation, true);
    });
};

const saveToLocalStorage = (city) => {
  let cities;
  if (localStorage.getItem("city") === null) {
    cities = [];
  } else {
    cities = JSON.parse(localStorage.getItem("city"));
  }
  cities.push(city);
  localStorage.setItem("city", JSON.stringify([...new Set(cities)]));
};

const setSingleWeather = (city, country) => {
  let iconDiv, arrowBack, saveIcon, cityInfornmationDiv, citySpan, countrySpan;
  const iconDivTag = createTag(iconDiv, "div", singleWeather, "icons", ""),
    cityInfornmationDivTag = createTag(
      cityInfornmationDiv,
      "div",
      singleWeather,
      "nothing",
      ""
    );
  createTag(arrowBack, "img", iconDivTag, "back-image", "./images/back.png");
  createTag(saveIcon, "img", iconDivTag, "save-image", "./images/unsave.png");
  createTag(
    citySpan,
    "span",
    cityInfornmationDivTag,
    "single-city",
    `${city},`
  );
  createTag(
    countrySpan,
    "span",
    cityInfornmationDivTag,
    "single-country",
    `${country}`
  );
  createDays(singleWeather, ".single-weather");
};

const setForecast = (city) => {
  fetch(
    `http://api.weatherstack.com/forecast?access_key=${apiKey}&query=${city}`
  )
    .then((response) => response.json())
    .then((json) => {
      let containerDiv,
        temperatureDiv,
        forecastDiv,
        weatherIcon,
        temperatureForecastDiv,
        temperatureSpan,
        degreeSup,
        pressureDiv,
        windDiv,
        visibilityDiv,
        humidityDiv,
        feelslikeDiv,
        uvDiv,
        pressureIcon,
        pressureValue,
        pressureTitle,
        windIcon,
        windValue,
        windTitle,
        visibilityIcon,
        visibilityValue,
        visibilityTitle,
        humidityIcon,
        humidityValue,
        humidityTitle,
        feelslikeIcon,
        feelslikeValue,
        feelslikeTitle,
        uvIcon,
        uvValue,
        uvTitle;
      const imageSrc = json.current.weather_icons[0],
        temperature = json.current.temperature,
        pressure = json.current.pressure,
        wind = json.current.wind_speed,
        visibility = json.current.visibility,
        humidity = json.current.humidity,
        feelslike = json.current.feelslike,
        uv = json.current.uv_index,
        containerDivTag = createTag(
          containerDiv,
          "div",
          singleWeather,
          "nothing",
          ""
        ),
        temperatureDivTag = createTag(
          temperatureDiv,
          "div",
          containerDivTag,
          "single-temperature",
          ""
        ),
        forecastDivTag = createTag(
          forecastDiv,
          "div",
          containerDivTag,
          "weather-informations",
          ""
        ),
        temperatureForecastDivTag = createTag(
          temperatureForecastDiv,
          "div",
          temperatureDivTag,
          "nothing",
          ""
        ),
        pressureDivTag = createTag(
          pressureDiv,
          "div",
          forecastDivTag,
          "condition-forecast",
          ""
        ),
        windDivTag = createTag(
          windDiv,
          "div",
          forecastDivTag,
          "condition-forecast",
          ""
        ),
        visibilityDivTag = createTag(
          visibilityDiv,
          "div",
          forecastDivTag,
          "condition-forecast",
          ""
        ),
        humidityDivTag = createTag(
          humidityDiv,
          "div",
          forecastDivTag,
          "condition-forecast",
          ""
        ),
        feelslikeDivTag = createTag(
          feelslikeDiv,
          "div",
          forecastDivTag,
          "condition-forecast",
          ""
        ),
        uvDivTag = createTag(
          uvDiv,
          "div",
          forecastDivTag,
          "condition-forecast",
          ""
        );
      createTag(
        weatherIcon,
        "img",
        temperatureDivTag,
        "icon-weather-single",
        imageSrc
      );
      createTag(
        temperatureSpan,
        "span",
        temperatureForecastDivTag,
        "single-temperature-forecast",
        temperature
      );
      createTag(
        degreeSup,
        "sup",
        temperatureForecastDivTag,
        "single-degree",
        "°C"
      );
      createTag(
        pressureIcon,
        "img",
        pressureDivTag,
        "nothing",
        "./images/pressure.png"
      );
      createTag(
        pressureValue,
        "div",
        pressureDivTag,
        "value",
        `${pressure} MB`
      );
      createTag(
        pressureTitle,
        "div",
        pressureDivTag,
        "forecast-title",
        "Pressure"
      );
      createTag(windIcon, "img", windDivTag, "nothing", "./images/wind.png");
      createTag(windValue, "div", windDivTag, "value", `${wind} k/h`);
      createTag(windTitle, "div", windDivTag, "forecast-title", "Wind");
      createTag(
        visibilityIcon,
        "img",
        visibilityDivTag,
        "nothing",
        "./images/visibility.png"
      );
      createTag(
        visibilityValue,
        "div",
        visibilityDivTag,
        "value",
        `${visibility} km`
      );
      createTag(
        visibilityTitle,
        "div",
        visibilityDivTag,
        "forecast-title",
        "Visibility"
      );
      createTag(
        humidityIcon,
        "img",
        humidityDivTag,
        "nothing",
        "./images/humidity.png"
      );
      createTag(humidityValue, "div", humidityDivTag, "value", `${humidity}%`);
      createTag(
        humidityTitle,
        "div",
        humidityDivTag,
        "forecast-title",
        "Humidity"
      );
      createTag(
        feelslikeIcon,
        "img",
        feelslikeDivTag,
        "nothing",
        "./images/feelslike.png"
      );
      createTag(
        feelslikeValue,
        "div",
        feelslikeDivTag,
        "value",
        `${feelslike}°C`
      );
      createTag(
        feelslikeTitle,
        "div",
        feelslikeDivTag,
        "forecast-title",
        "Feelslike"
      );
      createTag(uvIcon, "img", uvDivTag, "nothing", "./images/uv.png");
      createTag(uvValue, "div", uvDivTag, "value", `${uv}`);
      createTag(uvTitle, "div", uvDivTag, "forecast-title", "UV");
    });
};

const singleWeatherHandler = (event) => {
  if (event.target.classList.contains("card")) {
    singleWeather.innerHTML = "";
    container.style.display = "none";
    singleWeather.style.display = "block";
    const city =
      event.target.children[0].children[1].children[0].innerText.split(",")[0];
    const country = event.target.children[0].children[1].children[1].innerText;
    setSingleWeather(city, country);
    setForecast(city);
  }
};

const backHandler = (event) => {
  if (event.target.classList.contains("back-image")) {
    container.style.display = "block";
    singleWeather.style.display = "none";
  }
};

const loadHandler = () => {
  if (localStorage.getItem("city") !== null) {
    const cities = JSON.parse(localStorage.getItem("city"));
    cities.forEach((item) => {
      fetch(
        `http://api.weatherstack.com/forecast?access_key=${apiKey}&query=${item}`
      )
        .then((response) => response.json())
        .then((weatherInformation) => {
          getWeatherResponse(weatherInformation, false);
        });
    });
  }
};

serachIcon.addEventListener("click", searchHandler);
container.addEventListener("click", singleWeatherHandler);
singleWeather.addEventListener("click", backHandler);
document.addEventListener("DOMContentLoaded", loadHandler);
