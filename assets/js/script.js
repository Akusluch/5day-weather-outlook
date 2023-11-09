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
        return getfiveday(lat,lon, city);
        });
}

function getfiveday(lat,lon, city) {
    var fiveday = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
    fetch(fiveday) 
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var today = data.list[0]
            todayWeather(today, city);
            fivedayWeather(data);
        })
}

function todayWeather(today, city) {
    console.log(today);
    var currentdiv = $('#current');
    var currentCity = $("#currentCity")
    var todayul = $('<ul>');
    var todayTemp = $('<li>');
    var todayHum = $('<li>');
    var todayWind = $('<li>');

    currentCity.text(city + " " + today.dt_txt)
    todayTemp.text("Temp: " + today.main.temp + "°F");
    todayHum.text("Humidity: " + today.main.humidity + "%");
    todayWind.text("Wind: " + today.wind.speed + "MPH");

    currentdiv.append(todayul);
    todayul.append(todayTemp);
    todayul.append(todayWind);
    todayul.append(todayHum);
}

function fivedayWeather(data) {
    console.log(data);
    var weatherData = data.list

    for (i=8; i < weatherData.length; i++) {
        var fivedaydiv = $('#five-day')
        var fivedayul = $('<ul>');
        var dateli = $('<li>');
        var fivedayTemp = $('<li>');
        var fivedayHum = $('<li>');
        var fivedayWind = $('<li>');

        dateli.text(weatherData[i].dt_txt)
        fivedayTemp.text("Temp: " + weatherData[i].main.temp + "°F");
        fivedayHum.text("Humidity: " + weatherData[i].main.humidity + "%");
        fivedayWind.text("Wind: " + weatherData[i].wind.speed + "MPH");

        fivedaydiv.append(fivedayul);
        fivedayul.append(dateli);
        fivedayul.append(fivedayTemp);
        fivedayul.append(fivedayWind);
        fivedayul.append(fivedayHum);
    }
}