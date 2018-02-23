// -------------------
const app = function() {
  // console.log('hello world!');
  const url = "https://restcountries.eu/rest/v2/all";
  // const url 2 = "https://api.giphy.com/v1/gifs/trending?api_key=x51oU2WEGxWhQ4eytBg2WGQ05Dn54sGA&limit=25&rating=G";
  makeRequest(url, requestComplete);

  const mapDiv = document.getElementById('main-map');
  const map = new MapWrapper(mapDiv, {lat:0, lng:0}, 1);
}
// -------------------

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

const requestComplete = function() {
  if (this.status != 200) return;
  const jsonString = this.responseText;
  const countries = JSON.parse(jsonString);
  // const gifsObject = parasedString.data
  console.log(countries);
  populateList(countries);
}

const populateList = function(countries) {
  const select = document.getElementById("countries-select");

  countries.forEach(function(country, index) {
    const option = document.createElement("option");
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  })
}

document.addEventListener('DOMContentLoaded', app);
