var navBar = document.querySelector("#submit");
var dropDown = document.querySelector("#drop-down");
var hotelListEl = document.querySelector("#hotel-list");
var searchInput = "";



const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
        'X-RapidAPI-Key': '35d88daae3mshe2ade3c338f5225p107fa9jsn17dcc2c54de2'
    }
};
const options2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
        'X-RapidAPI-Key': '35d88daae3mshe2ade3c338f5225p107fa9jsn17dcc2c54de2'
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


                // FETCH HOTEL DESCRIPTION
                const options3 = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '35d88daae3mshe2ade3c338f5225p107fa9jsn17dcc2c54de2',
                        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
                    }
                };
                fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[i].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function(data){
                    console.log(data);
                    //hotelAddress = data.data.body.hotelInformation.propertyDescription.address.fullAddress;
                })
                .catch(err => console.error(err));

                


                //console.log(hotelAddress);

                // CREATING MODALS
                var modalParentEl = document.createElement("p");
                hotelListEl.appendChild(modalParentEl);
                var modalEl = document.createElement("a");
                modalParentEl.appendChild(modalEl);
                modalEl.setAttribute("id","hotel-name" + [i]);
                modalEl.setAttribute("class","button is-primary modal-button");
                modalEl.setAttribute("data-target","#modal" + [i]);
                // Naming modal element
                var selectedHotel = hotelItems[i].name
                console.log(selectedHotel);
                var hotelNameEl = document.querySelector("#hotel-name" + [i])
                hotelNameEl.textContent = selectedHotel;




                // Modal content
                var modalContentEl = document.createElement("div");
                modalContentEl.setAttribute("id","modal" + [i]); // might need i
                modalContentEl.setAttribute("class","modal");
                hotelListEl.appendChild(modalContentEl);
                var modalContentEl2 = document.createElement("div");
                modalContentEl2.setAttribute("class","modal-background");
                modalContentEl.appendChild(modalContentEl2);
                var modalContentEl3 = document.createElement("div");
                modalContentEl3.setAttribute("class","modal-card");
                modalContentEl.appendChild(modalContentEl3);
                var modalContentEl4 = document.createElement("header");
                modalContentEl4.setAttribute("class","modal-card-head");
                modalContentEl3.appendChild(modalContentEl4);
                var modalContentEl5 = document.createElement("p");
                modalContentEl5.setAttribute("class","modal-card-title");
                modalContentEl5.textContent = "Insert photos here"; // might need i [PHOTOS]
                modalContentEl4.appendChild(modalContentEl5);
                var modalContentEl6 = document.createElement("section");
                modalContentEl6.setAttribute("class","modal-card-body");
                modalContentEl3.appendChild(modalContentEl6);
                var modalContentEl7 = document.createElement("div");
                modalContentEl7.setAttribute("class","content");
                modalContentEl6.appendChild(modalContentEl7);
                var modalContentEl8 = document.createElement("section")
                modalContentEl7.appendChild(modalContentEl8);
                var modalContentEl9 = document.createElement("h1");
                modalContentEl9.setAttribute("id","hotel-name");
                modalContentEl9.setAttribute("class","title is-6");
                modalContentEl9.textContent = selectedHotel; // [HOTEL NAME]
                modalContentEl8.appendChild(modalContentEl9);
                var modalContentEl10 = document.createElement("section");
                modalContentEl7.appendChild(modalContentEl10);
                var modalContentEl11 = document.createElement("p");
                modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
                modalContentEl11.textContent = "";
                modalContentEl7.appendChild(modalContentEl11);
                var modalContentEl12 = document.createElement("section");
                modalContentEl12.setAttribute("class","modal-card-foot");
                modalContentEl3.appendChild(modalContentEl12);
                var modalContentEl13 = document.createElement("p");
                modalContentEl12.appendChild(modalContentEl13);
                modalContentEl13.textContent = "Insert map here"; // might need i [MAP]
                var modalContentEl14 = document.createElement("button");
                modalContentEl14.setAttribute("class","modal-close is-large");
                modalContentEl14.setAttribute("aria-label","close");
                modalContentEl.appendChild(modalContentEl14);

                $(".modal-button").click(function() {
                    var target = $(this).data("target");
                    console.log(target);
                    $("html").addClass("is-clipped");
                    $(target).addClass("is-active");
                 });
                
                //close modal when clicked
                 $(".modal-close").click(function() {
                    $("html").removeClass("is-clipped");
                    $(this).parent().removeClass("is-active");
                 });    


                





                                    // Creates list element for hotel
                                    // var hotelListItem = document.createElement("li");
                                    // // Puts list in the <ul> element
                                    // hotelListEl.appendChild(hotelListItem);
                                    // // Assigns the list element the name of the hotel
                                    // hotelListItem.textContent = selectedHotel;
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
            var weatherCard = document.createElement("div");
            weatherCard.setAttribute("class", "columns");

            // Displays weekday
            var weekday  = moment().add(i,'days').format('dddd') + " - ";

            // Displays weather for the day
            var dailyWeather = dailyWeatherArray[i].weather[0].main;

            // Low temp for the day
            var dailyLow = "Low: " + dailyWeatherArray[i].temp.min;

            // High temp for the day
            var dailyHigh = "High: " + dailyWeatherArray[i].temp.max;

            // Get the weathe icon for the day
            var weatherIcon = document.createElement("img");
            var iconUrl =  "http://openweathermap.org/img/wn/" + dailyWeatherArray[i].weather[0].icon + "@2x.png"
            weatherIcon.setAttribute("src", iconUrl);

            //merge the date and weather on to one line ex: Tuesday - Rain
            var dateAndWeather = document.createElement("p");
            dateAndWeather.textContent = weekday + dailyWeather;

            //merge the low and high for the day on a seperate line ex Low: 46F - High: 80F
            var lowAndHighTemp = document.createElement("p");
            lowAndHighTemp.textContent = dailyLow + "\u00B0F - " + dailyHigh + "\u00B0F";

            //put the temp and weather in a div
            var weatherCardText = document.createElement("div");
            weatherCardText.setAttribute("class", "weather-card-text");
            weatherCardText.appendChild(dateAndWeather);
            weatherCardText.appendChild(lowAndHighTemp);

            //append the Icon and text
            weatherCard.appendChild(weatherIcon);
            weatherCard.appendChild(weatherCardText);

            //append to the page
            dailyWeatherEl.appendChild(weatherCard);
        }
    })
}

//listen for submit button
navBar.addEventListener("click", btnHandler);

//create drop down menu for states
createDropDown();

console.log("test");
//open modal when clicked
   


 
 //Ricardo code
 function runModal() {
    

    fetch(`https://hotels4.p.rapidapi.com/locations/v2/search?query=` + document.querySelector("#user-search").value +  `%20` + document.querySelector("#dropdown").value + '&locale=en_US&currency=USD', options3)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        var hotelArray = data;
        var hotelItems = hotelArray.suggestions[1].entities;
        console.log(hotelItems)
        // clickedHotel shows descriptive info for a hotel such as name, longititude, latitude, and destinationId
        // longitiude and latitude can be used for the google maps, destinationId can be used for the API endpoint properties/get-details to dsiplay hotel information on the page
        if (hotelItems[0].name === e.target.textContent){
            var clickedHotel = hotelItems[0];
            console.log(clickedHotel);
            console.log(e.target.value);
        }     
    })
}