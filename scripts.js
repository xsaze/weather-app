const search_bar = document.getElementById('search-bar');
const input = document.getElementById('search-input');
const search_button = document.getElementById('search-btn');
const container = document.getElementById('weather-card');

input.addEventListener('focus', () => {
    if (container.classList.contains('show')) {
        container.classList.remove('show');
        container.classList.add('hide');
    }    
})

search_button.addEventListener('click', () => {
    const APIKey = '0161a2a37498d71098257535f878f16c';
    const city = input.value;

    if (city == '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)
    .then(response => response.json())
    .then(json => {
        // Reset searchbar
        input.value = '';

        // Show error
        if (json.cod === '404') {
            alert('Please enter a valid city!');
            return;
        };

        // Show container
        if (!container.classList.contains('show')) {
            container.classList.add('show');
        }
        // const container = document.getElementById('weather-card');
        // container.style.display = 'flex';
        // container.style.opacity = '1';

        // Time
        const time = document.getElementById('time');
        const today = new Date();
        let hours = today.getUTCHours()+json.timezone/3600;
        let minutes = today.getUTCMinutes()
        hours = (hours < 10 ? "0" : "") + hours;
        minutes = (minutes < 10 ? "0" : "") + minutes;
        time.textContent = hours + ':' + minutes;

        // Temp
        const temp = document.getElementById('temp');
        temp.textContent = json.main.temp.toFixed(0) + '°C';

        // Location
        const location = document.getElementById('location');
        const country = json.sys.country;
        location.textContent = json.name + ', ' + country;

        // Icon
        const image = document.getElementById('weather');
        const icon = json.weather[0].icon;
        image.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        // Feels like
        const feelslike = document.getElementById('feelslike');
        feelslike.textContent = 'Feels like: ' + json.main.feels_like.toFixed(0) + '°C';

        // Humidity
        const humidity = document.getElementById('humidity');
        humidity.textContent = 'Humidity: ' + json.main.humidity + '%';

        // Wind
        const wind = document.getElementById('wind');
        wind.textContent = 'Wind: ' + json.wind.speed + 'km/h';


        
    })

})