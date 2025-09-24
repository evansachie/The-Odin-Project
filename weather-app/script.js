const cityInput = document.getElementById('city-name');
const results = document.getElementById('weather-results');
const toggleInput = document.getElementById('toggle-btn');
const errorMessages = document.getElementById('error-messages');
const loadingContainer = document.getElementById('loading');

toggleInput.disabled = true;

const iconMap = {
    'clear-day': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/clear-day.svg',
    'clear-night': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/clear-night.svg',
    'cloudy': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/cloudy.svg',
    'fog': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/fog.svg',
    'hail': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/hail.svg',
    'partly-cloudy-day': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/partly-cloudy-day.svg',
    'partly-cloudy-night': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/partly-cloudy-night.svg',
    'rain': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/rain.svg',
    'rain-snow': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/rain-snow.svg',
    'rain-snow-showers-day': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/rain-snow-showers-day.svg',
    'rain-snow-showers-night': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/rain-snow-showers-night.svg',
    'showers-day': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/showers-day.svg',
    'showers-night': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/showers-night.svg',
    'sleet': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/sleet.svg',
    'snow': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/snow.svg',
    'snow-showers-day': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/snow-showers-day.svg',
    'snow-showers-night': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/snow-showers-night.svg',
    'thunder': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/thunder.svg',
    'thunder-rain': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/thunder-rain.svg',
    'thunder-showers-day': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/thunder-showers-day.svg',
    'thunder-showers-night': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/thunder-showers-night.svg',
    'wind': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/wind.svg'
};

const weatherThemes = {
    'clear-day': {
        background: 'linear-gradient(135deg, #87CEEB 0%, #E0F6FF 50%, #FFD700 100%)',
        class: 'sunny'
    },
    'clear-night': {
        background: 'linear-gradient(135deg, #2C3E50 0%, #4A6741 50%, #1B263B 100%)',
        class: 'clear-night'
    },
    'cloudy': {
        background: 'linear-gradient(135deg, #BDC3C7 0%, #95A5A6 50%, #7F8C8D 100%)',
        class: 'cloudy'
    },
    'partly-cloudy-day': {
        background: 'linear-gradient(135deg, #74B9FF 0%, #A29BFE 50%, #FD79A8 100%)',
        class: 'partly-cloudy'
    },
    'partly-cloudy-night': {
        background: 'linear-gradient(135deg, #2D3436 0%, #636E72 50%, #B2BEC3 100%)',
        class: 'partly-cloudy-night'
    },
    'rain': {
        background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 50%, #1E3A8A 100%)',
        class: 'rainy'
    },
    'showers-day': {
        background: 'linear-gradient(135deg, #74B9FF 0%, #0984E3 50%, #2D3436 100%)',
        class: 'showers'
    },
    'showers-night': {
        background: 'linear-gradient(135deg, #2D3436 0%, #0984E3 50%, #74B9FF 100%)',
        class: 'showers-night'
    },
    'thunder': {
        background: 'linear-gradient(135deg, #2D3436 0%, #636E72 50%, #DDD 100%)',
        class: 'stormy'
    },
    'thunder-rain': {
        background: 'linear-gradient(135deg, #2D3436 0%, #4A90E2 50%, #74B9FF 100%)',
        class: 'thunderstorm'
    },
    'snow': {
        background: 'linear-gradient(135deg, #DDD6FE 0%, #E0E7FF 50%, #F1F5F9 100%)',
        class: 'snowy'
    },
    'fog': {
        background: 'linear-gradient(135deg, #B2BEC3 0%, #DDD6FE 50%, #E0E7FF 100%)',
        class: 'foggy'
    },
    'wind': {
        background: 'linear-gradient(135deg, #74B9FF 0%, #A29BFE 50%, #DDD6FE 100%)',
        class: 'windy'
    }
};

function updateWeatherBackground(iconName) {
    const body = document.body;
    const theme = weatherThemes[iconName] || weatherThemes['clear-day'];

    body.className = body.className.replace(/\b(sunny|clear-night|cloudy|partly-cloudy|partly-cloudy-night|rainy|showers|showers-night|stormy|thunderstorm|snowy|foggy|windy)\b/g, '');

    body.classList.add(theme.class);
    body.style.background = theme.background;
    
    console.log(`Applied theme: ${theme.class} for weather: ${iconName}`);
}

function generateForecast(days, unit) {
    const forecastSection = document.getElementById('forecast-section');
    const forecastContainer = document.getElementById('forecast-container');

    const forecastDays = days.slice(1, 6);
    
    let forecastHTML = '';
    
    forecastDays.forEach(day => {
        const date = new Date(day.datetime);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const iconUrl = iconMap[day.icon] || iconMap['clear-day'];
        
        forecastHTML += `
            <div class="forecast-item">
                <div class="forecast-day">
                    <span class="day-name">${dayName}</span>
                    <span class="day-date">${monthDay}</span>
                </div>
                <img src="${iconUrl}" alt="${day.conditions}" class="forecast-icon" />
                <div class="forecast-temps">
                    <span class="temp-high">${Math.round(day.tempmax)}${unit}</span>
                    <span class="temp-low">${Math.round(day.tempmin)}${unit}</span>
                </div>
                <div class="forecast-condition">${day.conditions}</div>
            </div>
        `;
    });
    
    forecastContainer.innerHTML = forecastHTML;
    forecastSection.classList.remove('hidden');
}

async function fetchWeatherData(city = 'Accra', unitGroup = 'us') {
    loadingContainer.classList.remove('hidden');
    results.innerHTML = '';
    errorMessages.textContent = '';
    
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unitGroup}&include=current&key=F78JDVLB37LBBVN8CX9U7KXYF&contentType=json`);

        if (!response.ok) {
            throw new Error(`Error in response: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        const unit = unitGroup === 'metric' ? '°C' : '°F';
        const iconName = data.currentConditions.icon;
        const iconUrl = iconMap[iconName] || iconMap['clear-day'];

        updateWeatherBackground(iconName);
        
        results.innerHTML = `
            <div class="weather-result">
                <img src="${iconUrl}" alt="${data.currentConditions.conditions}" class="weather-icon" />
                <p><strong>Location:</strong> ${data.resolvedAddress}</p>
                <p><strong>Temperature:</strong> ${data.currentConditions.temp} ${unit}</p>
                <p><strong>Cloud Cover:</strong> ${data.currentConditions.cloudcover}%</p>
                <p><strong>Conditions:</strong> ${data.currentConditions.conditions}</p>
                <p><strong>Dew Point:</strong> ${data.currentConditions.dew} ${unit}</p>
                <p><strong>Timezone:</strong> ${data.timezone}</p>
            </div>
        `;

        const unitSymbol = unitGroup === 'metric' ? '°C' : '°F';
        generateForecast(data.days, unitSymbol);
        
        errorMessages.textContent = '';
    } catch (error) {
        console.log(error);
        errorMessages.textContent = 'Could not fetch weather data. Try again.';
    } finally {
        loadingContainer.classList.add('hidden');
    }
}

cityInput.addEventListener('input', () => {
    toggleInput.disabled = cityInput.value.trim() === '';
});

document.getElementById('weather-form').addEventListener('submit', event => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
        errorMessages.textContent = 'Please enter a city name.';
        return;
    }
    fetchWeatherData(city);
    toggleInput.disabled = false;
});

toggleInput.addEventListener('click', () => {
    const unitGroup = toggleInput.checked ? 'metric' : 'us';
    const city = cityInput.value.trim();
    if (!city) {
        errorMessages.textContent = 'Please enter a city name before toggling.';
        return;
    }
    fetchWeatherData(city, unitGroup);
});
