var fetchWeather = "/weather";

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");

const tempElement = document.querySelector(".temperature span");
const locationElement = document.querySelector(".place");
const dateElement = document.querySelector(".date");

// Formatting date
const fulLDate = () => {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var day = new Date().getDate() + nth(day);

  return (
    day + " " + month[new Date().getMonth()] + " " + new Date().getFullYear()
  );
};

const nth = (day) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// Enter the element content
dateElement.textContent = fulLDate();

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  locationElement.textContent = "Loading...";
  tempElement.textContent = "";
  weatherCondition.textContent = "";

  const locationApi = fetchWeather + "?address=" + search.value;

  fetch(locationApi).then((response) => {
    response.json().then((data) => {

      if (data.error) {
        locationElement.textContent = data.error;
        tempElement.textContent = "";
        weatherCondition.textContent = "";
      } else {
        locationElement.textContent = data.cityName;
        tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176)+"C";
        weatherCondition.textContent = data.description.toUpperCase();
      }

    });
  });
});
