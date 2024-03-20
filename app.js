async function getData(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=bc6bf4c55e35400e92c164203241603&q=${city}`,
    { mode: "cors" }
  );

  let weather = await response.json();

  if (weather.error) {
    setCondition(weather.error.message);
    setCity("");
    temp.innerText = "";
    feel.innerText = "";
    humidity.innerText = "";
    wind.innerText = "";
    seperator.innerText = "";
  } else {
    setCondition(weather.current.condition.text.toUpperCase());
    let location =
      weather.location.name.toUpperCase() +
      ", " +
      weather.location.country.toUpperCase();
    setCity(location);
    setTemp(weather.current.temp_c);
    setDetails(
      weather.current.feelslike_c,
      weather.current.humidity,
      weather.current.wind_kph
    );
    seperator.innerText = "|";
  }
}

getData("Lahore");

let submit = document.querySelector(".submit");
let input = document.querySelector(".search");
let condition = document.querySelector(".condition");
let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let feel = document.querySelector(".feel");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let seperator = document.querySelector(".seperator");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(input.value);
  getData(input.value);
});

function setCondition(cond) {
  condition.innerText = cond;
}

function setCity(loc) {
  city.innerText = loc;
}

function setTemp(temperature) {
  temp.innerHTML = `${temperature}<span class="exponent">°C</span>`;
}

function setDetails(tempFeel, humid, windSpd) {
  feel.innerText = "FEELS LIKE: " + tempFeel + "°C";
  humidity.innerText = "HUMIDITY: " + humid + " %";
  wind.innerText = "WIND: " + windSpd + " KPH";
}
