document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '89913065b7fb3b98a094b76f53c77eae';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk';
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temp');
    const city = document.querySelector('.city');
    const windSpeed = document.querySelector('.wind');
    const humidity = document.querySelector('.humid');

    searchButton.addEventListener('click', event => {
        event.preventDefault(); // Prevent the default form submission behavior
        const cityValue = searchInput.value.trim();
        if (cityValue) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=imperial&appid=${apiKey}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('City not found');
                    }
                    return response.json();
                })
                .then(data => {
                    updateWeather(data);

                    const weatherBox = document.querySelector('.weather-box');
                    weatherBox.style.display = 'block'; // Show the weather box after fetching data

      
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                   
                });
              
        }
    });

    function updateWeather(data) {
        city.textContent = data.name;
        temperature.textContent = `${data.main.temp}°F`;
        windSpeed.textContent = `${data.wind.speed} mph`;
        humidity.textContent = `${data.main.humidity}%`;
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
        
    }
});
