const apiKey = 'de0ee7a9955bd08f5f57b3f655af36ce';
let aaa;
function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // update the frontend with the weather data
      aaa = data;
      const weatherDescription = data.weather[0].description;
      const temperature = (data.main.temp - 273.15) * 9/5 + 32;
      const windSpeed = data.wind.speed * 2.237;
      const direction = () => {
        if ((data.wind.deg >= 0 && data.wind.deg <= 22.5) || (data.wind.deg > 337.5)) return "NORTH";
        if (data.wind.deg <= 67.5) return "NORTHEAST"
        if (data.wind.deg <= 112.5) return "EAST"
        if (data.wind.deg <= 157.5) return "SOUTHEAST"
        if (data.wind.deg <= 202.5) return "SOUTH"
        if (data.wind.deg <= 247.5) return "SOUTHWEST"
        if (data.wind.deg <= 292.5) return "WEST"
        if (data.wind.deg <= 337.5) return "NORTHWEST"
      }
      const windDirection = direction();

      const city = data.name;

      const selectImg = (folderType) => {
        const gifs = Array.from(document.querySelectorAll('img[src^="./' + folderType + '"]')).map(gif => gif.src.replace(window.location.href, ''));
        console.log('gifs', gifs)
        return gifs[Math.floor(Math.random() * gifs.length)];
      }

      let folderType;
      const test1 = selectImg('rainy')
      console.log("test1", test1)
    
      // update the background theme based on the weather description
      if (weatherDescription.includes('overcast')) {
        document.body.style.backgroundImage = 'url(./cloudy/cloudy-day.gif)';
      } else if (weatherDescription.includes('clouds')) {
        document.body.style.backgroundImage = 'url(./partly-cloudy/partly-cloudy-cat.gif)';
      } else if (weatherDescription.includes('light')) {
        document.body.style.backgroundImage = 'url(./light-rain.gif)';
      } else if (weatherDescription.includes('rain')) {
        folderType = "rainy";
        document.body.style.backgroundImage = `url(./rainy/rain-cat2.gif)`;
      } else {
        document.body.style.backgroundImage = 'url(./sunny/sunny-cat.gif)';
      }

      // update the frontend with the weather data
      document.getElementById('weather-description').textContent = "DESCRIPTION: " + weatherDescription;
      document.getElementById('temperature').textContent = `TEMPERATURE: ${temperature.toFixed(2)} F`;
      document.getElementById('city').textContent = "CITY: " + city;
      document.getElementById('windSpeed').textContent = `WIND SPEED: ${windSpeed.toFixed(2)} MPH`
      document.getElementById('wind-direction').textContent = `WIND DIRECTION: ${windDirection}`
    })
    .catch(error => {
      console.error(error);
    });
}

// listen for form submit events
const form = document.getElementById('search-form');
form.addEventListener('submit', event => {
  event.preventDefault();

  const city = document.getElementById('city-input').value;
  getWeatherData(city);
});
