const auth = "4de6c7d65942fd13c747cd80ec893233";
const current = document.querySelector(".current-weather");
const extra = document.querySelector(".extra-info");
const button2 = document.querySelector(".second-btn");
const button3 = document.querySelector(".third-btn");

window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      button2.addEventListener("click", (e) => {
        currentWeather(lat, long);
      });

      button3.addEventListener("click", (e) => {
        extraInfo(lat, long);
      });
    });
  }
});

async function currentWeather(lat, long) {
  const dataFetch = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${auth}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
  const data = await dataFetch.json();
  const location = document.createElement("div");
  location.classList.add("current");
  location.innerHTML = `<p>Location: <b>${data.name}</b></p>`;
  current.appendChild(location);

  const temp = document.createElement("div");
  temp.classList.add("current");
  temp.innerHTML = `<p>Current Temperature: <b>${toCelsius(
    data.main.temp
  )} degrees celsius</b></p>`;
  current.appendChild(temp);

  const feels = document.createElement("div");
  feels.classList.add("current");
  feels.innerHTML = `<p>Feels Like: <b>${toCelsius(
    data.main.feels_like
  )} degrees celsius</b></p>`;
  current.appendChild(feels);
}

function toCelsius(temp) {
  return (temp - 273.15).toFixed(2);
}

async function extraInfo(lat, long) {
  const dataFetch = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${auth}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  const data = await dataFetch.json();

  const wind = document.createElement("div");
  wind.classList.add("current");
  wind.innerHTML = `<p>Wind Speed: <b>${(data.wind.speed * 3.6).toFixed(
    2
  )} km/h</b></p>`;
  extra.appendChild(wind);

  const cloud = document.createElement("div");
  cloud.classList.add("current");
  cloud.innerHTML = `<p>Cloudiness: <b>${data.clouds.all}%</b></p>`;
  extra.appendChild(cloud);

  const humidity = document.createElement("div");
  humidity.classList.add("current");
  humidity.innerHTML = `<p>Humidity: <b>${data.main.humidity}%</b></p>`;
  extra.appendChild(humidity);
}
