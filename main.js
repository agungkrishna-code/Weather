import { myApi } from "./api.js";

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;

        const apiKey = myApi();
        const url = `https://api.openweathermap.org/data/2.5/weather?q=jakarta&appid=${apiKey}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
            console.log(data);
            })
            .catch((error) => {
            console.log("Error fetching weather data:", error);
            });
        });
    }
});
