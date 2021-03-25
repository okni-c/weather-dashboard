var api = 'http://api.openweathermap.org/data/2.5/forecast?q=';
var city = 'Nashville';
var apiKey = '&appid=8943dc0c0eb19de1fe9d843a0ca2f4fe';
var units = '&units=imperial&cnt=5';

var dayElementArr = [document.getElementById('day-date0'), document.getElementById('day-date1'), document.getElementById('day-date2'), document.getElementById('day-date3'), document.getElementById('day-date4')];

var tempElementArr = [document.getElementById('day-temp0'), document.getElementById('day-temp1'), document.getElementById('day-temp2'), document.getElementById('day-temp3'), document.getElementById('day-temp4')];

var humidityElementArr = [document.getElementById('day-humidity0'), document.getElementById('day-humidity1'), document.getElementById('day-humidity2'), document.getElementById('day-humidity3'), document.getElementById('day-humidity4')];

var conditionElementArr = [document.getElementById('day-condition0'), document.getElementById('day-condition1'), document.getElementById('day-condition2'), document.getElementById('day-condition3'), document.getElementById('day-condition4')];

var url = api + city + apiKey + units;

fetch(url)
    .then(response => response.json())
    .then(data => getData(data));

function getData(data) {
    var i = 0;

    var city = data.city.name;
    while (i <= 5) {
        var day = data.list[i].dt_txt;
        dayElementArr[i].innerText = day;

        var temp = data.list[i].main.temp;
        tempElementArr[i].innerText = temp + " °F";

        var humidity = data.list[i].main.humidity;
        humidityElementArr[i].innerText = humidity + "%";

        var condition = data.list[i].weather[0].main;
        conditionElementArr[i].innerText = condition;

        console.log(day, temp, humidity, city, condition);
        i++;
    };

};