var hotelListEl = document.querySelector("#hotel-list");




const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
        'X-RapidAPI-Key': 'b40fbb7a75msh7ad2cc034897e7dp14d8bbjsnf5d6a567e31e'
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
        var dailyWeatherEl = document.createElement("section");
        document.body.appendChild(dailyWeatherEl);
        var dailyWeatherArray = data.daily;
        console.log(dailyWeatherArray);
        for (var i = 0; i < 7; i++) {
            var dayEl = document.createElement("div");
            dailyWeatherEl.appendChild(dayEl);
            dayEl.textContent = moment().add(i,'days').format('dddd');
            var dayContentEl = document.createElement("p");
            dayEl.appendChild(dayContentEl);
            var dailyLow = dailyWeatherArray[i].temp.min;
            dayContentEl.textContent += "Low: " + dailyLow;
            var dailyHigh = dailyWeatherArray[i].temp.max;
            dayContentEl.textContent += " High: " + dailyHigh;
            var dailyWeather = dailyWeatherArray[i].weather[0].main;
            dayContentEl.textContent += " Weather: " + dailyWeather;
    
        }
    });
