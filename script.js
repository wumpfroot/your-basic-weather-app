const searchBtn = document.querySelector(".search-container button");
const infoBox = document.querySelector(".weather-info");

//Today's date information
const todaysDate = document.querySelector(".date");

const date = new Date();
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let dayOfTheWeek = weekday[date.getDay()];
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

todaysDate.innerHTML = `<h2>Today is ${dayOfTheWeek} ${day}/${month}/${year}</h2>`;

// Search event
searchBtn.addEventListener("click", () => {
	const cityResult = document.querySelector(".search-container input").value;
	const tempButtons = document.querySelector(".temp-conversion-btns");

	if (cityResult === "") return;

	tempButtons.style.visibility = "visible";

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

			const fahrenheitConversion = document.querySelector(".fahrenheit-conversion");
			const celciusConversion = document.querySelector(".celcius-conversion");

			fahrenheitConversion.addEventListener("click", () => {
				const temp = document.querySelector(".temp");
				const calculation = Math.round(json.main.temp) * 1.8 + 32;
				temp.innerHTML = `${Math.round(calculation)}°F`;
			});

			celciusConversion.addEventListener("click", () => {
				const temp = document.querySelector(".temp");
				temp.innerHTML = `${Math.round(json.main.temp)}°C`;
			});
		});

	const input = document.querySelector(".search-container input");
	input.value = "";
});
