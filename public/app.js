const app = function() {
  // console.log('hello world!');
  const url = "https://api.giphy.com/v1/gifs/trending?api_key=x51oU2WEGxWhQ4eytBg2WGQ05Dn54sGA&limit=25&rating=G"
  makeRequest(url, requestComplete);
}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

const requestComplete = function() {
  if (this.status != 200) return;
  const jsonString = this.responseText;
  const parasedString = JSON.parse(jsonString);
  const gifsObject = parasedString.data
  populateList(gifsObject);
}

const populateList = function(gifs) {
  const list = document.getElementById("gif-list");

console.log(gifs);
  gifs.forEach(function(gif) {
    console.log(gif.id);
    const listItem = document.createElement("li");
    const img = document.createElement("img");

    img.src = gif.images.original.url;
    listItem.appendChild(img);
    list.appendChild(listItem);
  })
}

document.addEventListener('DOMContentLoaded', app);
