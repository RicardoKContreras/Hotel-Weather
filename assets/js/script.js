var navBar = document.querySelector("#submit");
var dropDown = document.querySelector("#drop-down");
var hotelListEl = document.querySelector("#hotel-list");
var searchInput = "";
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
        'X-RapidAPI-Key': '7a1c07767emshb906a8527a34194p12956ejsn47ba8352250a'
    }
};
const options2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
        'X-RapidAPI-Key': '7a1c07767emshb906a8527a34194p12956ejsn47ba8352250a'
    }
};

//user input locates a city
var cityLocator = function(cityName, cityState){
    searchInput = cityName;
    getHotels();
    var openWeatherCityLocator = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + cityState + ",840&limit=1&appid=862fa80dbf9297962c039ac6e9c8e055";
    fetch(openWeatherCityLocator)
    .then(function (response) {
        response.json().then(function(data){
            console.log(data);
            var cityLat = data[0].lat;
            var cityLon = data[0].lon;
            getWeatherInfo(cityLat,cityLon);
        })
    })
}

// searchInput variable will be user submitted
// Fetch hotel names
var getHotels = function(){
    fetch('https://hotels4.p.rapidapi.com/locations/v2/search?query=' + searchInput + '&locale=en_US&currency=USD', options)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var hotelArray = data;
        var hotelItems = hotelArray.suggestions[1].entities;

        //returns images for each sugested hotel
        // for(var i = 0; i < hotelItems.length; i++){
        //     hotelImages(hotelItems[i].destinationId);
        // }


        console.log(hotelItems);

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
}

//for when the user hits a button
var btnHandler = function(event){
    var userTarget = event.target;
    if(userTarget.matches("#submit")){
        var cityName = document.querySelector("#user-search").value;
        console.log(dropDown[0].value);
        cityLocator(cityName, dropDown[0].value);
    }
}

//creates the state drop down menu
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

}

// Fetch hotel images
var hotelImages = function(destinationId){
    fetch('https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id=' + destinationId, options2)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

// Fetch weather API
var getWeatherInfo = function(lat,lon){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=8fc039d2801e6d831fbfaba3fc79944f"
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
    })
}

//listen for submit button
navBar.addEventListener("click", btnHandler);

//create drop down menu for states
createDropDown();


//open modal when clicked
$(".modal-button").click(function() {
    var target = $(this).data("target");
    $("html").addClass("is-clipped");
    $(target).addClass("is-active");
 });

//close modal when clicked
 $(".modal-close").click(function() {
    $("html").removeClass("is-clipped");
    $(this).parent().removeClass("is-active");
 });       

 
 //Ricardo code
 const onClick = function(e) {
    // e.target gives you the item of whatever you clicked
    const options3 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'de8df62b04msh7414b58aaf0f84ap1c8e1bjsn648e2c2867a2',
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        }
    };
    fetch(`https://hotels4.p.rapidapi.com/locations/v2/search?query=` + document.querySelector("#user-search").value +  `%20` + document.querySelector("option").value + '&locale=en_US&currency=USD', options3)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        var hotelArray = data;
        var hotelItems = hotelArray.suggestions[1].entities;
        var clickedHotel;
        console.log(clickedHotel);
        for (var i = 0; i < hotelItems.length; i++) {
            // clickedHotel shows descriptive info for a hotel such as name, longititude, latitude, and destinationId
            // longitiude and latitude can be used for the google maps, destinationId can be used for the API endpoint properties/get-details to dsiplay hotel information on the page
            if(hotelItems[i].name === e.target.value) {
               clickedHotel = hotelItems[i];
                console.log(clickedHotel);
                console.log(hotelItems);
                console.log(e.target.value);
            }
        }
    })
        /*const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'de8df62b04msh7414b58aaf0f84ap1c8e1bjsn648e2c2867a2',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
            }
        };*/
        fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + clickedHotel.destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        // HotelfullInfo shows a unique description about the hotel
        .then(function(hotelDescription){
            var hotelInfo = hotelDescription;
            //var hotelFullInfo = hotelDescription.neighborhood.neighborhoodLongDescription;
            var hotelFullInfo = "test"
            console.log(hotelInfo);
            console.log(hotelFullInfo); 
            var getHotelInfoEl = document.querySelector("#hotel-description");
            getHotelInfoEl.textContent = hotelFullInfo;
            console.log(hotelFullInfo)

        })
                //this console log logs the hotels description
                 //console.log(response.neighborhood.neighborhoodLongDescription)
            .catch(err => console.error(err));
};
document.addEventListener("click", onClick);
 