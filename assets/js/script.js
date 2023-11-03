var apikey = "0fd9a20b9ab89abff80b203942e7a06d";
var citysearch = $('#citysearch');
var searchbtn = $('#searchbtn');

searchbtn.on("click", getlatlon);

function getlatlon() {
    var city = citysearch[0].value;
    var geocodingurl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + ",us&appid=" + apikey;
    fetch(geocodingurl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;
        return getfiveday(lat,lon);
        });
}

function getfiveday(lat,lon) {
    var fiveday = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
    fetch(fiveday) 
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var today = data.list[0]
            todayWeather(today);
            // fivedayWeather(data);
        })
}

function todayWeather(today) {
    console.log(today);
    var currentdiv = $('#current');
    var todayul = $('<ul>');
    var todayTemp = $('<li>');
    var todayHum = $('<li>');
    var todayWind = $('<li>');

    todayTemp.text("Temp: " + today.main.temp + "°F");
    todayHum.text("Humidity: " + today.main.humidity + "%");
    todayWind.text("Wind: " + today.wind.speed + "MPH");

    currentdiv.append(todayul);
    todayul.append(todayTemp);
    todayul.append(todayWind);
    todayul.append(todayHum);
}

// function fivedayWeather(data) {

// }