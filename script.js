var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'Nashville';
var apiKey = '&appid=8943dc0c0eb19de1fe9d843a0ca2f4fe';
var units = '&units=metric';

function callApi() {
    loadJSON(url, grabData);
}

function grabData(data) {
    var weather = data;
    
}