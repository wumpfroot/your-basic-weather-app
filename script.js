const exampleApiCall = "https://api.openweathermap.org/data/2.5/weather?q=espoo&units=metric&appid=a29ad671cba80509c050c4546f651a06";

const searchBtn = document.querySelector(".search-container button");
const infoBox = document.querySelector(".weather-info");

searchBtn.addEventListener("click", () => {
	fetch(exampleApiCall)
		.then((response) => response.json())
		.then((json) => {
			if (json.cod === "404") {
				infoBox.innerHTML = "<h1>Oh no. This city does not exist...</h1>";
				return;
			}
			console.log(json);
		});
});
