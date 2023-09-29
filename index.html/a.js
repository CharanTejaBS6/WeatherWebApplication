const apiKey = "e948a304ddb85ceefa84ad1c6a86a45f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const iconMap = {
  "01d": "https://th.bing.com/th/id/OIP.8X1mpE1NJk68Fqw7Sqv8AQHaF7?w=187&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
  "01n": "https://th.bing.com/th/id/OIP.rKmu8DTplbLGJzpDCtvT5wHaE8?w=268&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
  "02d": "https://th.bing.com/th/id/OIP.3NNo-O9pYXeiPiLHYRcVNAHaE6?w=276&h=183&c=7&r=0&o=5&dpr=2&pid=1.7",
  "02n": "https://th.bing.com/th/id/OIP.fhPgo_RcRcaU7Siqt5nPNgHaE7?w=290&h=193&c=7&r=0&o=5&dpr=2&pid=1.7",
  "03d": "https://th.bing.com/th/id/OIP.2nmVLv1YeYFI7qxJGmNaTgHaE8?w=252&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
  "03n": "https://th.bing.com/th/id/OIP.RUwbPRx6JM9CR2URV6SspAHaEK?w=272&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
  "04d": "https://th.bing.com/th/id/OIP.5uoiTi_XKq69E6P8SfTETwHaE7?w=268&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
  "04n": "https://th.bing.com/th/id/OIP.kOWGldMMd2zWIOD6-UmlYQHaHa?w=183&h=183&c=7&r=0&o=5&dpr=2&pid=1.7",
  "09d": "https://th.bing.com/th/id/OIP.Vx7z-5IYRrLt4eaTQ21KxAHaE7?w=220&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
  "09n": "https://th.bing.com/th/id/OIP.cRS3J-gUhugvl_kta2irUAHaFi?w=247&h=185&c=7&r=0&o=5&dpr=2&pid=1.7",
  "10d": "https://th.bing.com/th/id/OIP.JjtqFVvn-qTIBDtLOjPu5QHaGV?w=178&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
  "10n": "https://th.bing.com/th/id/OIP.y4DU8scs932O7odD7NXGAgHaEK?w=223&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
  "11d": "https://th.bing.com/th/id/OIP.UmNDrNozERDUn5rAQi4CsgHaE8?w=234&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
  "11n": "https://th.bing.com/th/id/OIP.asJZJMWAxsVsuhnNyBIl4gHaE9?w=226&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
  "13d": "https://th.bing.com/th/id/OIP.diDSRBi6GeIazB673pgRmwHaFf?w=253&h=187&c=7&r=0&o=5&dpr=2&pid=1.7",
  "13n": "https://th.bing.com/th/id/OIP.x6DX4eLlvDuSozXa_Wa3AAHaE8?w=230&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
  "50d": "https://th.bing.com/th/id/OIP.O3E-XYYvl6AHD5t6VxxswAHaEf?w=309&h=187&c=7&r=0&o=5&dpr=2&pid=1.7",
  "50n": "https://th.bing.com/th/id/OIP.pH_nv6AVM0y4uaL0oaokIAHaE8?w=235&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
  default: "https://th.bing.com/th/id/OIP.tONn3IR7LN-8-W2HrpBPkwHaE8?w=299&h=200&c=7&r=0&o=5&dpr=2&pid=1.7"
};

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
  try {
    const resp = await fetch(url(city), { origin: "cros" });
    const respData = await resp.json();
    addWeatherToPage(respData);
  } catch (error) {
    console.error(error);
  }
}

function addWeatherToPage(data) {
  const temp = Ktoc(data.main.temp);
  const weather = document.createElement("div");
  weather.classList.add("weather");

  const iconCode = data.weather[0].icon;
  const iconUrl = iconMap[iconCode] || "default.png";

  weather.innerHTML = `
    <h2><img src="${iconUrl}" /> ${temp}°C <img src="${iconUrl}" /></h2>
    <small>${data.weather[0].description}</small>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
    <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
  `;

  main.innerHTML = "";
  main.appendChild(weather);
}

function Ktoc(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value;
  if (city) {
    getWeatherByLocation(city);
  }
});
