const exampleApiCall = "https://api.openweathermap.org/data/2.5/weather?q=espoo&units=metric&appid=a29ad671cba80509c050c4546f651a06";

const searchBtn = document.querySelector(".search-container button");
const infoBox = document.querySelector(".weather-info");

searchBtn.addEventListener("click", () => {
	const cityResult = document.querySelector(".search-container input").value;

	if (cityResult === "") {
		return;
	}

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityResult}&units=metric&appid=a29ad671cba80509c050c4546f651a06`)
		.then((response) => response.json())
		.then((json) => {
			if (json.cod === "404") {
				infoBox.innerHTML = "<h1>Oh no. This city does not exist...</h1>";
				return;
			}
			console.log(json);
			const location = document.querySelector(".location");
			const temp = document.querySelector(".temp");

			location.innerHTML = json.name;
			temp.innerHTML = `${Math.round(json.main.temp)}°C`;

			const tempConversion = Math.round(json.main.temp) * 1.8 + 32;
			console.log(`Temp in freedom units is ${tempConversion}°F`);
		});
});

const input = document.querySelector(".search-container input");

input.addEventListener("click", () => {
	input.value = "";
});
