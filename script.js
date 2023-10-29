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
};

const updateDate = () => {
	const date = new Date();
	const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let dayOfTheWeek = weekday[date.getDay()];
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	elements.todaysDate.innerHTML = `<h2>Today is ${dayOfTheWeek} ${day}/${month}/${year}</h2>`;
};

const updateTemperatures = (json) => {
	elements.location.innerHTML = json.name;
	elements.temp.innerHTML = `${Math.round(json.main.temp)}°C`;
	elements.feelsLikeTemp.innerHTML = `<h3>${Math.round(json.main.feels_like)}°C</h3>`;
	elements.minTemp.innerHTML = `<h3>${Math.round(json.main.temp_min)}°C</h3>`;
	elements.maxTemp.innerHTML = `<h3>${Math.round(json.main.temp_max)}°C</h3>`;
};

const convertTemperature = (json, unit) => {
	const tempCalculation = (temp) => (unit === "F" ? Math.round(temp * 1.8 + 32) : Math.round(temp));
	elements.temp.innerHTML = `${tempCalculation(json.main.temp)}°${unit}`;
	elements.feelsLikeTemp.innerHTML = `<h3>${tempCalculation(json.main.feels_like)}°${unit}<h3>`;
	elements.minTemp.innerHTML = `<h3>${tempCalculation(json.main.temp_min)}°${unit}</h3>`;
	elements.maxTemp.innerHTML = `<h3>${tempCalculation(json.main.temp_max)}°${unit}</h3>`;
};

// Search event
elements.searchBtn.addEventListener("click", () => {
	const cityResult = elements.cityInput.value;
	if (cityResult === "") return;

	elements.tempButtons.style.visibility = "visible";
	elements.tempInfo.style.visibility = "visible";

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityResult}&units=metric&appid=a29ad671cba80509c050c4546f651a06`)
		.then((response) => response.json())
		.then((json) => {
			if (json.cod === "404") {
				elements.infoBox.innerHTML = "<h1>Oh no. This city does not exist...</h1>";
				return;
			}
			console.log(json);
			updateTemperatures(json);

			elements.fahrenheitConversion.addEventListener("click", () => convertTemperature(json, "F"));
			elements.celciusConversion.addEventListener("click", () => convertTemperature(json, "C"));
		});

	elements.cityInput.value = "";
});

updateDate();
