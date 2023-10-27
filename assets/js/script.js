var apikey = "0fd9a20b9ab89abff80b203942e7a06d"
var geocoding = "http://api.openweathermap.org/geo/1.0/direct?q=city,us&appid=apikey"
var fiveday = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=apikey"
var city = "pittsburgh"

function getlatlon() {
    fetch(geocoding)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data)
        });
}

getlatlon()