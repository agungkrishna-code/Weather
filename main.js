import {myApi} from './api.js';
const apikey = myApi();

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?q=jakarta&appid=${apikey}&units=metric`;

            fetch(url).then((res) => {
                return res.json()
            }).then((data) => {
                console.log(data);
            })
        })
    }
})
