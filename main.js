import { myApi } from "./api.js";

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;

            const apiKey = myApi();
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=jakarta&appid=${apiKey}`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=jakarta&appid=${apiKey}`;

            fetch(weatherUrl)
                .then((res) => res.json())
                .then((weatherData) => {
                    console.log(weatherData);
                    fetch(forecastUrl)
                        .then((res) => res.json())
                        .then((forecastData) => {
                            console.log(forecastData);
                            weatherReport(weatherData, forecastData);
                            dayForecast(forecastData);
                        })
                        .catch((error) => {
                            console.log("Error fetching forecast data:", error);
                        });
                })
                .catch((error) => {
                    console.log("Error fetching weather data:", error);
                });
        });
    }
});

document.getElementById('search').addEventListener('click', () => {
    var place = document.getElementById('input').value;
    var urlsearch = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${myApi()}`;

    fetch(urlsearch)
        .then((res) => res.json())
        .then((weatherData) => {
            console.log(weatherData);
            weatherReport(weatherData, null);
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${myApi()}`;
            fetch(forecastUrl)
                .then((res) => res.json())
                .then((forecastData) => {
                    console.log(forecastData);
                    hourForecast(forecastData);
                    dayForecast(forecastData);
                })
                .catch((error) => {
                    console.log("Error fetching forecast data:", error);
                });
        })
        .catch((error) => {
            console.log("Error fetching weather data:", error);
        });
});

function weatherReport(weatherData, forecastData) {
    document.getElementById('city').innerText = weatherData.name + ',' + weatherData.sys.country;
    document.getElementById('temperature').innerText = Math.floor(weatherData.main.temp - 273.15) + '°C';
    document.getElementById('clouds').innerText = weatherData.weather[0].description;

    let icon = weatherData.weather[0].icon;
    let iconurl = `https://openweathermap.org/img/wn/${icon}.png`;
    document.getElementById('img').src = iconurl;
}

function hourForecast(forecastData) {
    document.querySelector('.templist').innerHTML = '';
    for (let i = 0; i < 5; i++) {
        var date = new Date(forecastData.list[i].dt * 1000);
        let hourR = document.createElement('div');
        hourR.setAttribute('class', 'next');

        let div = document.createElement('div');
        let time = document.createElement('p');
        time.setAttribute('class', 'time');
        time.innerText = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' });

        let temp = document.createElement('p');
        temp.innerText = Math.floor(forecastData.list[i].main.temp_max - 273.15) + '°C' + ' / ' + Math.floor(forecastData.list[i].main.temp_min - 273.15) + '°C';

        div.appendChild(time);
        div.appendChild(temp);

        let desc = document.createElement('p');
        desc.setAttribute('class', 'desc');
        desc.innerText = forecastData.list[i].weather[0].description;

        hourR.appendChild(div);
        hourR.appendChild(desc);
        document.querySelector('.templist').appendChild(hourR);
    }
}

function dayForecast(forecastData) {
    document.querySelector('.weekF').innerHTML = '';
    for (let i = 8; i < forecastData.list.length; i += 8) {
        console.log(forecastData.list[i]);

        let div = document.createElement('div');
        div.setAttribute('class', 'dayF');

        let day = document.createElement('p');
        day.setAttribute('class', 'date');
        day.innerText = new Date(forecastData.list[i].dt * 1000).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Jakarta' });
        div.appendChild(day);

        let temp = document.createElement('p');
        temp.innerText = Math.floor(forecastData.list[i].main.temp_max - 273.15) + '°C' + ' / ' + Math.floor(forecastData.list[i].main.temp_min - 273.15) + '°C';
        div.appendChild(temp);

        let description = document.createElement('p');
        description.setAttribute('class', 'description');
        description.innerText = forecastData.list[i].weather[0].description;
        div.appendChild(description);

        document.querySelector('.weekF').appendChild(div);
    }
}
