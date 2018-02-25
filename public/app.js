// -------------------
const app = function() {
  const url = "https://restcountries.eu/rest/v2/all";
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

  const capital = document.getElementById("capital");
  capital.innerText = `Capital: ${country.capital}`;

  // const pop_element = document.createElement("i");
  // pop_element.className = "fas fa-users";
  const population = document.getElementById("population");
  population.innerText = `Population: ${country.population}`;

  const timezone = document.getElementById("timezone");
  timezone.innerText = `Timezones : ${country.timezones}`;

  const region = document.getElementById("region");
  region.innerText = `Region : ${country.region}`;


  const coords = {lat: country.latlng[0], lng: country.latlng[1]};
  const mapDiv = document.querySelector('#main-map');
  const map = new MapWrapper(mapDiv, coords, 4);
  map.addMarker(coords);

  makeColumnChart(coords);
  // capitalMap(coords);
}

const getGifInfo = function(countries) {
  const index = document.getElementById("countries-select").value;
  const country = countries[index];
  let gifURL = "https://api.giphy.com/v1/gifs/search?api_key=x51oU2WEGxWhQ4eytBg2WGQ05Dn54sGA&q=" + country.name + "&limit=1&offset=0&rating=G&lang=en";

  makeRequest(gifURL, requestComplete2);
}

const displayGIF = function(gif) {
    const gifDisplay = document.getElementById("gif-container");
    const gifImg = document.getElementById("gif-img");

    gifImg.src = gif[0].images.fixed_height.url;
    gifDisplay.appendChild(gifImg);
  }

const makeColumnChart = function(coords) {
    const dataArray = [];
    const coordsLat = coords.lat;
    dataArray.push(coordsLat);
    const coordsLng = coords.lng;
    dataArray.push(coordsLng);

    const latlongChart = new ColumnChart("Latitude/ Longitude", "Latitude/ Longitude", dataArray, ["Latitude", "Longitude"]);
}




//   const capitalMap = function(coords) {
//     const coordsLat = coords.lat;
//     const coordsLng = coords.lng;
//     console.log(coordsLat);
//     console.log(coordsLng);
//     const secondMap = document.getElementById('second-map');
//     capitalView = new CapitalMapWrapper(secondMap, coords, 20);
//     panorama = new google.maps.StreetViewPanorama(secondMap,  {position: {lat: 55.953252, lng: -3.188267},
//               pov: {heading: 165, pitch: 0},
//               zoom: 1});
// }

document.addEventListener('DOMContentLoaded', app);
