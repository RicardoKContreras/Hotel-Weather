
var navBar = document.querySelector("#search-bar");
var dropDown = document.querySelector("#drop-down");

var cityLocator = function(cityName, cityState){
    var openWeatherCityLocator = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + cityState + ",840&limit=1&appid=862fa80dbf9297962c039ac6e9c8e055"


    fetch(openWeatherCityLocator)
    .then(function (response) {
        console.log(response);
var hotelListEl = document.querySelector("#hotel-list");




const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
        'X-RapidAPI-Key': '7a1c07767emshb906a8527a34194p12956ejsn47ba8352250a'
    }
};

// searchInput variable will be user submitted
var searchInput = "charlotte";
// Fetch hotel names
fetch('https://hotels4.p.rapidapi.com/locations/v2/search?query=' + searchInput + '&locale=en_US&currency=USD', options)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}


var btnHandler = function(event){
    var userTarget = event.target;
    if(userTarget.matches("#submit")){
        var cityName = document.querySelector("#user-search").value;
        console.log(dropDown[0].value);
        cityLocator(cityName, dropDown[0].value);
    }
}

var createDropDown = function(){
    var states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
    for(var i = 0; i < states.length; i++){
        var state = document.createElement("option");
        state.setAttribute("value", states[i]);
        state.textContent = states[i];
        dropDown.appendChild(state);
    }

    dropDown = $("#drop-down");
    dropDown.selectmenu().selectmenu("menuWidget").addClass("overflow");
    dropDown.selectmenu("option", "width", 75);
    dropDown.offset({top: 10, left: 30});

}


createDropDown();
navBar.addEventListener("click", btnHandler);
        var hotelArray = data;
        var hotelItems = hotelArray.suggestions[1].entities;
        
        // If there are less than 5 hotels, only loop the length of the array
        if (hotelItems.length < 5) {
            
            for (var i = 0; i < hotelItems.length; i++) {
                // Creates list element for hotel
                var hotelListItem = document.createElement("li");
                // Puts list in the <ul> element
                hotelListEl.appendChild(hotelListItem);
                // Assigns the list element the name of the hotel
                hotelListItem.textContent = hotelItems[i].name;
            }
        }

        // If there are 5 or more hotels, only display 5 hotels
        else if (hotelItems.length >= 5) {

            for (var i = 0; i < 6; i++) {
                // Creates list element for hotel
                var hotelListItem = document.createElement("li");
                // Puts list in the <ul> element
                hotelListEl.appendChild(hotelListItem);
                // Assigns the list element the name of the hotel
                hotelListItem.textContent = hotelItems[i].name;
            }
        }
    })



.catch(err => console.error(err));
const options2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
        'X-RapidAPI-Key': 'b40fbb7a75msh7ad2cc034897e7dp14d8bbjsnf5d6a567e31e'
    }
};

// Fetch hotel images
fetch('https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id=193124', options2)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));


// Fetch weather API
var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=35.3076&lon=-80.7497&units=imperial&appid=8fc039d2801e6d831fbfaba3fc79944f"
var repos = "";
fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        // Weather section
        var dailyWeatherEl = document.querySelector("#weather");
        // Weather array
        var dailyWeatherArray = data.daily;
        console.log(dailyWeatherArray);
        // For loop for displaying 7 day forecast
        for (var i = 0; i < 7; i++) {
            // Day div element
            var dayEl = document.createElement("p");
            dailyWeatherEl.appendChild(dayEl);
            // Displays weekday
            dayEl.textContent = moment().add(i,'days').format('dddd');
            // p element for the information
            var dayContentEl = document.createElement("p");
            // Information element into the div element
            dayEl.appendChild(dayContentEl);
            // Low temp for the day
            var dailyLow = dailyWeatherArray[i].temp.min;
            dayContentEl.textContent += "Low: " + dailyLow;
            // High temp for the day
            var dailyHigh = dailyWeatherArray[i].temp.max;
            dayContentEl.textContent += " High: " + dailyHigh;
            // Displays weather for the day
            var dailyWeather = dailyWeatherArray[i].weather[0].main;
            dayContentEl.textContent += " Weather: " + dailyWeather;
    
        }
    });

