//Card 1
const day1 = document.getElementById("day1");
const date1 = document.getElementById("date1");
const cityName1 = document.getElementById("cityName1");
const country1 = document.getElementById("country1");
const temperature1 = document.getElementById("temperature1");
const weatherIcon1 = document.getElementById("weatherIcon1");
const weatherCondition1 = document.getElementById("weatherCondition1");
const humidity1 = document.getElementById("humidity1");
const windSpeed1 = document.getElementById("windSpeed1");
const windDirection1 = document.getElementById("windDirection1");
const feelsLike1 = document.getElementById("feelsLike1");
const uvIndex1 = document.getElementById("uvIndex1");
const visibility1 = document.getElementById("visibility1");
const lastUpdated1 = document.getElementById("lastUpdated1");

//Card 2
const day2 = document.getElementById("day2");
const date2 = document.getElementById("date2");
const cityName2 = document.getElementById("cityName2");
const country2 = document.getElementById("country2");
const temperature2 = document.getElementById("temperature2");
const weatherIcon2 = document.getElementById("weatherIcon2");
const weatherCondition2 = document.getElementById("weatherCondition2");
const humidity2 = document.getElementById("humidity2");
const windSpeed2 = document.getElementById("windSpeed2");
const windDirection2 = document.getElementById("windDirection2");
const feelsLike2 = document.getElementById("feelsLike2");
const uvIndex2 = document.getElementById("uvIndex2");
const visibility2 = document.getElementById("visibility2");
const lastUpdated2 = document.getElementById("lastUpdated2");

//Card 3
const day3 = document.getElementById("day3");
const date3 = document.getElementById("date3");
const cityName3 = document.getElementById("cityName3");
const country3 = document.getElementById("country3");
const temperature3 = document.getElementById("temperature3");
const weatherIcon3 = document.getElementById("weatherIcon3");
const weatherCondition3 = document.getElementById("weatherCondition3");
const humidity3 = document.getElementById("humidity3");
const windSpeed3 = document.getElementById("windSpeed3");
const windDirection3 = document.getElementById("windDirection3");
const feelsLike3 = document.getElementById("feelsLike3");
const uvIndex3 = document.getElementById("uvIndex3");
const visibility3 = document.getElementById("visibility3");
const lastUpdated3 = document.getElementById("lastUpdated3");

const searchInput = document.getElementById("searchInput");


// ==========================
// Main Function
// ==========================

async function getWeather(city) {
  try {
    // ==========================
    // 1. Get city location
    // ==========================

    const locationResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
    );

    const locationData = await locationResponse.json();

    if (!locationData.results) {
      alert("City not found");
      return;
    }

    const location = locationData.results[0];

    const latitude = location.latitude;
    const longitude = location.longitude;

    const cityName = location.name;
    const country = location.country;

    // ==========================
    // 2. Get weather data
    // ==========================

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,weather_code,visibility&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,visibility,weather_code&daily=weather_code,temperature_2m_mean,temperature_2m_max,uv_index_max,wind_speed_10m_max&forecast_days=3&timezone=auto`,
    );

    const weatherData = await weatherResponse.json();

    // ==========================
    // 3. Separate the data
    // ==========================

    const current = weatherData.current;

    const hourly = weatherData.hourly;

    const daily = weatherData.daily;

    // ==========================
    // 4. Put city name and country
    // ==========================

    cityName1.textContent = cityName;
    cityName2.textContent = cityName;
    cityName3.textContent = cityName;

    country1.textContent = country;
    country2.textContent = country;
    country3.textContent = country;

    // ==========================
    // 5. Card 1 - Current Weather
    // ==========================

    day1.textContent = getDayName(daily.time[0]);

    date1.textContent = getDate(daily.time[0]);

    temperature1.textContent = `${current.temperature_2m}°C`;

    weatherCondition1.textContent = getWeatherCondition(current.weather_code);

    weatherIcon1.textContent = getWeatherIcon(current.weather_code);

    humidity1.textContent = `${current.relative_humidity_2m}%`;

    windSpeed1.textContent = `${current.wind_speed_10m} km/h`;

    windDirection1.textContent = getWindDirection(current.wind_direction_10m);

    feelsLike1.textContent = `${current.apparent_temperature}°C`;

    uvIndex1.textContent = daily.uv_index_max[0];

    visibility1.textContent = `${(current.visibility / 1000).toFixed(1)} km`;

    lastUpdated1.textContent = formatTime(current.time);

    // ==========================
    // 6. Card 2 - Tomorrow
    // ==========================

    const hour2 = 36;

    day2.textContent = getDayName(daily.time[1]);

    date2.textContent = getDate(daily.time[1]);

    temperature2.textContent = `${hourly.temperature_2m[hour2]}°C`;

    weatherCondition2.textContent = getWeatherCondition(daily.weather_code[1]);

    weatherIcon2.textContent = getWeatherIcon(daily.weather_code[1]);

    humidity2.textContent = `${hourly.relative_humidity_2m[hour2]}%`;

    windSpeed2.textContent = `${hourly.wind_speed_10m[hour2]} km/h`;

    windDirection2.textContent = getWindDirection(
      hourly.wind_direction_10m[hour2],
    );

    feelsLike2.textContent = `${hourly.apparent_temperature[hour2]}°C`;

    uvIndex2.textContent = daily.uv_index_max[1];

    visibility2.textContent = `${(hourly.visibility[hour2] / 1000).toFixed(1)} km`;

    lastUpdated2.textContent = formatTime(current.time);

    // ==========================
    // 7. Card 3 - Day After Tomorrow
    // ==========================

    const hour3 = 60;

    day3.textContent = getDayName(daily.time[2]);

    date3.textContent = getDate(daily.time[2]);

    temperature3.textContent = `${hourly.temperature_2m[hour3]}°C`;

    weatherCondition3.textContent = getWeatherCondition(daily.weather_code[2]);

    weatherIcon3.textContent = getWeatherIcon(daily.weather_code[2]);

    humidity3.textContent = `${hourly.relative_humidity_2m[hour3]}%`;

    windSpeed3.textContent = `${hourly.wind_speed_10m[hour3]} km/h`;

    windDirection3.textContent = getWindDirection(
      hourly.wind_direction_10m[hour3],
    );

    feelsLike3.textContent = `${hourly.apparent_temperature[hour3]}°C`;

    uvIndex3.textContent = daily.uv_index_max[2];

    visibility3.textContent = `${(hourly.visibility[hour3] / 1000).toFixed(1)} km`;

    lastUpdated3.textContent = formatTime(current.time);
  } catch (error) {
    console.log(error);

    alert("Something went wrong. Please try again.");
  }
}

// ==========================
// Get Day Name
// ==========================

function getDayName(date) {
  const day = new Date(date);

  return day.toLocaleDateString("en-US", {
    weekday: "long",
  });
}

// ==========================
// Get Date
// ==========================

function getDate(date) {
  const day = new Date(date);

  return day.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
}

// ==========================
// Format Time
// ==========================

function formatTime(dateTime) {
  const date = new Date(dateTime);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ==========================
// Weather Condition
// ==========================

function getWeatherCondition(code) {
  if (code === 0) {
    return "Clear sky";
  }

  if (code === 1 || code === 2) {
    return "Partly cloudy";
  }

  if (code === 3) {
    return "Cloudy";
  }

  if (code === 45 || code === 48) {
    return "Fog";
  }

  if (code >= 51 && code <= 57) {
    return "Drizzle";
  }

  if (code >= 61 && code <= 67) {
    return "Rain";
  }

  if (code >= 71 && code <= 77) {
    return "Snow";
  }

  if (code >= 80 && code <= 82) {
    return "Rain showers";
  }

  if (code >= 95) {
    return "Thunderstorm";
  }

  return "Unknown";
}

// ==========================
// Weather Icon
// ==========================

function getWeatherIcon(code) {
  if (code === 0) {
    return "☀️";
  }

  if (code === 1 || code === 2) {
    return "🌤️";
  }

  if (code === 3) {
    return "☁️";
  }

  if (code === 45 || code === 48) {
    return "🌫️";
  }

  if (code >= 51 && code <= 67) {
    return "🌧️";
  }

  if (code >= 71 && code <= 77) {
    return "❄️";
  }

  if (code >= 80 && code <= 82) {
    return "🌦️";
  }

  if (code >= 95) {
    return "⛈️";
  }

  return "🌤️";
}

// ==========================
// Wind Direction
// ==========================

function getWindDirection(degree) {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  const index = Math.round(degree / 22.5) % 16;

  return directions[index];
}

// ==========================
// Search Event
// ==========================

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const city = searchInput.value.trim();

    if (city !== "") {
      getWeather(city);
    }
  }
});

// ==========================
// Default City
// ==========================

getWeather("Cairo");
