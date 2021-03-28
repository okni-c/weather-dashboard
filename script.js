var api = 'http://api.openweathermap.org/data/2.5/forecast?q=';
var apiUV = 'http://api.openweathermap.org/data/2.5/uvi?';
var apiKey = '&appid=8943dc0c0eb19de1fe9d843a0ca2f4fe';
var units = '&units=imperial&cnt=5';

var dayElementArr = [document.getElementById('day-date0'), document.getElementById('day-date1'), document.getElementById('day-date2'), document.getElementById('day-date3'), document.getElementById('day-date4')];

var tempElementArr = [document.getElementById('day-temp0'), document.getElementById('day-temp1'), document.getElementById('day-temp2'), document.getElementById('day-temp3'), document.getElementById('day-temp4')];

var humidityElementArr = [document.getElementById('day-humidity0'), document.getElementById('day-humidity1'), document.getElementById('day-humidity2'), document.getElementById('day-humidity3'), document.getElementById('day-humidity4')];

var conditionElementArr = [document.getElementById('day-condition0'), document.getElementById('day-condition1'), document.getElementById('day-condition2'), document.getElementById('day-condition3'), document.getElementById('day-condition4')];

var imgArr = [document.getElementById('img-condition0'), document.getElementById('img-condition1'), document.getElementById('img-condition2'), document.getElementById('img-condition3'), document.getElementById('img-condition4')];

var listArr = [];

//when the search button is pressed
$('#submit').click(function () {
    // change city in url
    console.log("here");
    var city = $('#city').val();
    console.log(city);

    var url = api + city + apiKey + units;

    //create new list link with city name cap at 6 cities
    addToList(city);

    fetch(url)
        .then(response => response.json())
        .then(data => getData(data));
});

function addToList(city) {
    var index = 0;
    var doesCityExistInArray = false;

    // Loop through the existing City list
    while (index < listArr.length) {
        if (listArr[index].text == city) {
            doesCityExistInArray = true;
            break;
        }
        index++;
    }

    if (doesCityExistInArray) {
        return;
    }

    // Create new anchor <a>
    var newAnchor = document.createElement('a');
    newAnchor.setAttribute('class', 'list-group-item list-group-item-action');
    newAnchor.setAttribute('id', '#list-' + city);
    newAnchor.setAttribute('role', 'tab');
    newAnchor.setAttribute('href', '#list-' + city);
    newAnchor.innerText = city;

    // Add to the page
    document.getElementById('list-tab').appendChild(newAnchor);

    // Put the <a> into the listArr
    listArr.push(newAnchor);

    console.log(newAnchor.id);

    localStorage.setItem(newAnchor.id, city);

    $(newAnchor).click(function () {
        // change city in url
        console.log(newAnchor.id);
    
        var url = api + city + apiKey + units;
    
        fetch(url)
            .then(response => response.json())
            .then(data => getData(data));
    });

};

function getData(data) {
    var i = 0;

    var city = data.city.name;

    while (i < data.list.length) {
        // use moment to format day text

        var day = moment(data.list[i].dt_txt, 'YYYY-MM-DD HH:mm:ss').format('LLL');
        dayElementArr[i].innerText = day;

        var temp = data.list[i].main.temp;
        tempElementArr[i].innerText = temp + " °F";

        var humidity = data.list[i].main.humidity;
        humidityElementArr[i].innerText = "Humidity: " + humidity + "%";

        var condition = data.list[i].weather[0].main;
        conditionElementArr[i].innerText = condition;

        if (condition === "Rain") {
            imgArr[i].src = "assets/rain.png";
        };
        if (condition === "Clear") {
            imgArr[i].src = "assets/sunny.png";
        };
        if (condition === "Clouds") {
            imgArr[i].src = "assets/cloudy.png";
        };
        if (condition === "Snow") {
            imgArr[i].src = "assets/snow.png";
        };

        console.log(day, temp, humidity, city, condition);
        i++;
    };

    $('#city-jumbo').text(city);
    $('#temp-jumbo').text(data.list[0].main.temp + " °F");
    $('#humidity-jumbo').text("Humidity: " + data.list[0].main.humidity + "%");
    $('#wind-jumbo').text("Wind Speed: " + data.list[0].wind.speed + " MPH");

    var lat = data.city.coord.lat;
    var lon = data.city.coord.lon;

    var url2 = apiUV + "lat=" + lat + "&lon=" + lon + apiKey;

    console.log(url2);

    fetch(url2)
            .then(response => response.json())
            .then(data => getUV(data));

};

function getUV (data) {
    var uv = data.value;
    $('#uv-jumbo').text("UV Index: " + uv);
    
    if (uv <= 2) {
        //color blue
        $('#uv-jumbo').removeClass("bg-success");
        $('#uv-jumbo').removeClass("bg-warning");
        $('#uv-jumbo').removeClass("bg-danger");
        $('#uv-jumbo').removeClass("bg-dark");
        $('#uv-jumbo').removeClass("text-dark");
        $('#uv-jumbo').addClass("text-white");
        $('#uv-jumbo').addClass("bg-primary");
    };
    if (uv >= 2.00 && uv <= 5.00) {
        //color green
        $('#uv-jumbo').removeClass("bg-primary");
        $('#uv-jumbo').removeClass("bg-warning");
        $('#uv-jumbo').removeClass("bg-danger");
        $('#uv-jumbo').removeClass("bg-dark");
        $('#uv-jumbo').removeClass("text-dark");
        $('#uv-jumbo').addClass("text-white");
        $('#uv-jumbo').addClass("bg-success");
    };
    if (uv >= 5.00 && uv <= 7.00) {
        //color yellow
        $('#uv-jumbo').removeClass("bg-success");
        $('#uv-jumbo').removeClass("bg-primary");
        $('#uv-jumbo').removeClass("bg-danger");
        $('#uv-jumbo').removeClass("bg-dark");
        $('#uv-jumbo').removeClass("text-white");
        $('#uv-jumbo').addClass("text-dark");
        $('#uv-jumbo').addClass("bg-warning");
    };
    if (uv >= 7.00 && uv <= 10.00) {
        //color red
        $('#uv-jumbo').removeClass("bg-warning");
        $('#uv-jumbo').removeClass("bg-success");
        $('#uv-jumbo').removeClass("bg-primary");
        $('#uv-jumbo').removeClass("bg-dark");
        $('#uv-jumbo').removeClass("text-dark");
        $('#uv-jumbo').addClass("text-white");
        $('#uv-jumbo').addClass("bg-danger");
    };
    if (uv >= 10.00) {
        //color black
        $('#uv-jumbo').removeClass("bg-danger");
        $('#uv-jumbo').removeClass("bg-warning");
        $('#uv-jumbo').removeClass("bg-success");
        $('#uv-jumbo').removeClass("bg-primary");
        $('#uv-jumbo').removeClass("text-dark");
        $('#uv-jumbo').addClass("text-white");
        $('#uv-jumbo').addClass("bg-dark");
    };

};

function renderLastRegistered() {
    // Retrieve the previous cities
    var i = 0;
    while (i <= localStorage.length) {
        //get from local storage
        var elementString = localStorage.getItem(i);
        // console.log(arr[i]);
        elementArr[i].textContent = elementString;
        i++;
    }

    // If it is null, return early from this function
    if (elementString === null) {
        return;
    }
}

// renderLastRegistered();

// //when any save button is pressed
// $(newAnchor).click(function () {
//     var arr = [];
//     //clear array
//     arr.splice(0, arr.length)

//     var i = 0;
//     while (i <= 8) {
//         //grab data from each event-box
//         var elementString = $().val();
//         //push to array
//         arr.push(elementString);
//         console.log(arr[i]);
//         //save to local storage
        
//         i++;
//     }
//     //save it to localStorage
//     renderLastRegistered();

// });