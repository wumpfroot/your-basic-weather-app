const elements = {
	todaysDate: document.querySelector(".date"),
	cityInput: document.querySelector(".search-container input"),
	searchBtn: document.querySelector(".search-container button"),
	infoBox: document.querySelector(".weather-info"),
	location: document.querySelector(".location"),
	temp: document.querySelector(".temp"),
	tempButtons: document.querySelector(".temp-conversion-btns"),
	celciusConversion: document.querySelector(".celcius-conversion"),
	fahrenheitConversion: document.querySelector(".fahrenheit-conversion"),
	tempInfo: document.querySelector(".additional-temp-info"),
	feelsLikeTemp: document.querySelector(".feels-like"),
	minTemp: document.querySelector(".min-temp"),
	maxTemp: document.querySelector(".max-temp"),
	windInfo: document.querySelector(".wind-info"),
	windSpeed: document.querySelector(".wind-speed"),
	windDirection: document.querySelector(".wind-deg"),
};

const updateDate = () => {
	const date = new Date();
	const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let dayOfTheWeek = weekday[date.getDay()];
	let day = date.getDate();
	let month = months[date.getMonth()];
	let year = date.getFullYear();
	elements.todaysDate.innerHTML = `<h2>Today is ${dayOfTheWeek} ${day}/${month}/${year}</h2>`;
};

const updateInfo = (json) => {
	elements.location.innerHTML = json.name;
	elements.temp.innerHTML = `${Math.round(json.main.temp)}°C`;
	elements.feelsLikeTemp.innerHTML = `${Math.round(json.main.feels_like)}°C`;
	elements.minTemp.innerHTML = `${Math.round(json.main.temp_min)}°C`;
	elements.maxTemp.innerHTML = `${Math.round(json.main.temp_max)}°C`;
	elements.windSpeed.innerHTML = `${Math.round(json.main.temp_max)}°C`;
	elements.windDirection.innerHTML = `${json.wind.deg}°`;
};

const convertTemperature = (json, unit) => {
	const tempCalculation = (temp) => (unit === "F" ? Math.round(temp * 1.8 + 32) : Math.round(temp));
	elements.temp.innerHTML = `${tempCalculation(json.main.temp)}°${unit}`;
	elements.feelsLikeTemp.innerHTML = `${tempCalculation(json.main.feels_like)}°${unit}`;
	elements.minTemp.innerHTML = `${tempCalculation(json.main.temp_min)}°${unit}`;
	elements.maxTemp.innerHTML = `${tempCalculation(json.main.temp_max)}°${unit}`;
};

const convertWind = (json, unit) => {
	const windSpeedCalculation = (speed) => {
		const conversion = speed / 1609.34;
		const roundedValue = (conversion * 100) / 100;
		return unit === "I" ? roundedValue.toFixed(4) : speed;
	};
	elements.windSpeed.innerHTML = `${windSpeedCalculation(json.wind.speed)} m/h`;
	elements.windDirection.innerHTML = `${json.wind.deg}°`;
};

// Search event
elements.searchBtn.addEventListener("click", () => {
	const cityResult = elements.cityInput.value;
	if (cityResult === "") return;

	elements.tempButtons.style.visibility = "visible";
	elements.tempInfo.style.visibility = "visible";
	elements.windInfo.style.visibility = "visible";

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityResult}&units=metric&appid=a29ad671cba80509c050c4546f651a06`)
		.then((response) => response.json())
		.then((json) => {
			if (json.cod === "404") {
				elements.infoBox.innerHTML = "<h1>Oh no. This city does not exist...</h1>";
				return;
			}
			console.log(json);
			updateInfo(json);

			elements.fahrenheitConversion.addEventListener("click", () => {
				convertTemperature(json, "F");
				convertWind(json, "I");
			});
			elements.celciusConversion.addEventListener("click", () => {
				convertTemperature(json, "C");
				convertWind(json, "M");
			});
		});

	elements.cityInput.value = "";
});

updateDate();
