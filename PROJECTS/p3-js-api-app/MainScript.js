// UI Elements
const searchInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const circle = document.getElementById('aqCircle');
const aqiIndex = document.getElementById('aqIndex');
const aqiCategory = document.getElementById('aqCategory');
const mainPollutant = document.getElementById('mainPollutant');
const aiExp = document.getElementById('aiOutput');

// Weather data elements
const tempValue = document.getElementById('temp-value');
const humidityValue = document.getElementById('humidity-value');
const windValue = document.getElementById('wind-value');

// Main Pollutant Names
const pollutantNames = {
  p2: 'PM2.5 (Fine Particulate Matter)',
  p1: 'PM10 (Coarse Particulate Matter)',
  o3: "O₃ (Ozone)",
  n2: "NO₂ (Nitrogen Dioxide)",
  s2: "SO₂ (Sulfur Dioxide)",
  co: "CO (Carbon Monoxide)"
};


// LeafletJS
let map = L.map('map').setView([14.5995, 120.9842], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
}).addTo(map);
let marker;

const getConfig = async () => {
  return {
    IQAIR_BASE_URL: "/api/iqair",
    GEMINI_BASE_URL: "/api/gemini",
    IPINFO_BASE_URL: "/api/ipinfo"
  };
};

// Fetch Air Quality Data for a City
const fetchData = async (city) => {
  const config = await getConfig();

  // Use OpenStreetMap to get coordinates
  const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;
  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoData.length) throw new Error(`City "${city}" not found.`);
  const { lat, lon } = geoData[0];

  // call serverless IQAir proxy with lat/lon
  const url = `${config.IQAIR_BASE_URL}?lat=${lat}&lon=${lon}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch air quality: ${response.status}`);
  const data = await response.json();

  if (data.status && data.status !== 'success') {
    // provider-specific structure may vary; forward error
    throw new Error(data.data?.message || 'No air quality data found for this location.');
  }

  // some IQAir responses nest under data.data, normalize if needed
  const payload = data.data ? data.data : data;
  payload.location = payload.location || { lat, lon };

  return payload;
};


// Fetch Nearest City Based on IP
const nearestCityData = async () => {
  const config = await getConfig();

  try {
    // call serverless ipinfo proxy
    const ipRes = await fetch(config.IPINFO_BASE_URL);
    const ipData = await ipRes.json();

    const [latitude, longitude] = ipData.loc.split(',');

    // call IQAir proxy with lat/lon
    const url = `${config.IQAIR_BASE_URL}?lat=${latitude}&lon=${longitude}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch nearest city: ${response.status}`);
    const data = await response.json();

    const payload = data.data ? data.data : data;
    payload.location = payload.location || { lat: latitude, lon: longitude };
    return payload;
  } catch (error) {
    console.warn('IP lookup failed, defaulting to Manila.', error);
    return {
      city: 'Manila',
      location: { lat: 14.5995, lon: 120.9842 },
      current: {
        pollution: { aqius: 0, mainus: 'p2' },
        weather: { tp: 0, hu: 0, ws: 0 }
      }
    };
  }
};


// Generate AI Explanation
const genAiExp = async (config, city, aqi, category, weather) => {
  const prompt = `
    You're Amihan, the Wind Queen of Earth. The current air quality in ${city} is ${aqi} (${category}). 
    The weather conditions are: Temperature ${weather.tp}°C, Humidity ${weather.hu}%, and Wind Speed ${weather.ws} m/s. 
    Explain how these factors might affect air quality and people's health today. 
    Give three friendly, practical tips on staying safe and mindful of the environment. 
    Keep your tone warm, helpful, and concise (around 250 words).`;

  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  const response = await fetch(config.GEMINI_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) throw new Error(`Gemini request failed: ${response.status}`);

  const data = await response.json();

  return (data?.candidates?.[0]?.content?.parts?.[0]?.text ||'No response from AI.');
};

// Response Cleaner (Markdown -> HTML)
const responseCleaner = (text) => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const htmlLines = lines.map(line => {
      let formatted = line.trim();

      // Headers
      if (formatted.startsWith('###')) return `<h5 class="fw-bold mt-3">${formatted.slice(3).trim()}</h5>`;
      if (formatted.startsWith('##')) return `<h4 class="fw-bold mt-3">${formatted.slice(2).trim()}</h4>`;
      if (formatted.startsWith('#')) return `<h3 class="fw-bold mt-3">${formatted.slice(1).trim()}</h3>`;

      // Bold
      if (formatted.includes('**')) {
          const parts = formatted.split('**');
          formatted = parts.map((p, i) => (i % 2 ? `<strong>${p}</strong>` : p)).join('');
      }

      // Italic
      if (formatted.includes('*')) {
          const parts = formatted.split('*');
          formatted = parts.map((p, i) => (i % 2 ? `<em>${p}</em>` : p)).join('');
      }

      // Lists
      if (formatted[0] === '-' || formatted[0] === '•') {
          formatted = '• ' + formatted.slice(1).trim();
      } else if (!isNaN(parseInt(formatted[0])) && formatted[1] === '.') {
          formatted = '• ' + formatted.slice(2).trim();
      }

      return `<p>${formatted}</p>`;
  });

  return htmlLines.join('');
};


// UI Updates
const uiUpdates = (data, city) => {
  const pollution = data.current.pollution;
  const weather = data.current.weather;

  // Main Display
  cityName.textContent = city.toUpperCase();
  aqiIndex.textContent = pollution.aqius;
  aqiCategory.textContent = aqiCategories(pollution.aqius);
  mainPollutant.textContent = `Main Pollutant: ${pollutantNames[pollution.mainus] || pollution.mainus.toUpperCase()}`;

  // Weather Cards
  tempValue.textContent = `${weather.tp} °C`;
  humidityValue.textContent = `${weather.hu}%`;
  windValue.textContent = `${weather.ws} m/s`;

  // AQI Circle
  aqiCircleUpdate(pollution.aqius);

  // Update Map Marker
  if (data.location) {
    let lat, lon;

    if (data.location.coordinates) {
      [lon, lat] = data.location.coordinates;
    } else if (data.location.lat && data.location.lon) {
      ({ lat, lon } = data.location);
    }

    if (lat && lon) {
      if (marker) map.removeLayer(marker);

      marker = L.marker([lat, lon]).addTo(map);
      map.setView([lat, lon], 10);
    }
  }
};


// AQI Circle Update
const aqiCircleUpdate = (aqi) => {
    circle.classList.add('active');

    let color;
    if (aqi <= 50) color = 'green';
    else if (aqi <= 100) color = 'yellow';
    else if (aqi <= 150) color = 'orange';
    else if (aqi <= 200) color = 'red';
    else if (aqi <= 300) color = 'purple';
    else color = 'maroon';

    circle.style.backgroundColor = color;
};


// AQI Categories
const aqiCategories = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
};


// Initialize App
const initApp = async () => {
  try {
    const nearestData = await nearestCityData();
    const city = nearestData.city;

    uiUpdates(nearestData, city);
    const category = aqiCategories(nearestData.current.pollution.aqius);

    aiExp.textContent = 'Amihan is thinking...';

    const config = await getConfig();
    const aiText = await genAiExp(config, city, nearestData.current.pollution.aqius, category, nearestData.current.weather);

    aiExp.innerHTML = responseCleaner(aiText);

  } catch (error) {
    console.error(error);
    aiExp.textContent = `Error loading nearest city: ${error.message}`;
  }
};


// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);

searchBtn.addEventListener('click', async () => {
  const city = searchInput.value.trim();
  if (!city) return alert('Please enter a city name.');

  try {
    const data = await fetchData(city);
    uiUpdates(data, city);

    const pollution = data.current.pollution;
    const category = aqiCategories(pollution.aqius);

    aiExp.textContent = 'Generating AI insight...';

    const config = await getConfig();
    const aiText = await genAiExp(config, city, pollution.aqius, category, data.current.weather);

    aiExp.innerHTML = responseCleaner(aiText);

  } catch (error) {
    console.error(error);
    aiExp.textContent = `Error: ${error.message}`;
  }
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') searchBtn.click();
});