// -------------------
const app = function() {
  // console.log('hello world!');
  const url = "https://restcountries.eu/rest/v2/all";
  const url2 = "https://api.giphy.com/v1/gifs/search?api_key=x51oU2WEGxWhQ4eytBg2WGQ05Dn54sGA&q=test&limit=1&offset=0&rating=G&lang=en";
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
  populateList(countries);
}

const requestComplete2 = function() {
  if (this.status != 200) return;
  const jsonString = this.responseText;
  const gifsObject = JSON.parse(jsonString);
  const gif = gifsObject.data
  displayGIF(gif);
}

const populateList = function(countries) {
  const select = document.getElementById("countries-select");

  countries.forEach(function(country, index) {
    const option = document.createElement("option");
    countryNameText = country.name;
    option.innerText = countryNameText;
    option.value = index;
    select.appendChild(option);
  })

    select.addEventListener('change', function() {
      displayCountryInfo(countries);
      getGifInfo(countries);
    });
}

const displayCountryInfo = function(countries) {
  const index = document.getElementById("countries-select").value;
  const country = countries[index];

  const name = document.getElementById("name-display");
  name.innerText = country.name;
}

const getGifInfo = function(countries) {
  const index = document.getElementById("countries-select").value;
  const country = countries[index];
  let gifURL = "https://api.giphy.com/v1/gifs/search?api_key=x51oU2WEGxWhQ4eytBg2WGQ05Dn54sGA&q=" + country.name + "&limit=1&offset=0&rating=G&lang=en";
  makeRequest(gifURL, requestComplete2);
}

const displayGIF = function(gif) {
  console.log(gif[0].images.fixed_height.url);
    const gifDisplay = document.getElementById("gif-container");
    const gifImg = document.getElementById("gif-img");

    gifImg.src = gif[0].images.fixed_height.url;
    gifDisplay.appendChild(gifImg);

  }

document.addEventListener('DOMContentLoaded', app);
