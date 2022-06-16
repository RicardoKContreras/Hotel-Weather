var navBar = document.querySelector("#submit");
var dropDown = document.querySelector("#drop-down");
var hotelListEl = document.querySelector("#hotel-list");
var searchInput = "";
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
        'X-RapidAPI-Key': 'a984b47214msh4c0dcb448151261p128458jsn1583ac19766d'
    }
};
const options2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
        'X-RapidAPI-Key': 'a984b47214msh4c0dcb448151261p128458jsn1583ac19766d'
    }
};

const options3 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a984b47214msh4c0dcb448151261p128458jsn1583ac19766d',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
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
    hotelListEl.innerHTML = "";
    fetch('https://hotels4.p.rapidapi.com/locations/v2/search?query=' + searchInput + '&locale=en_US&currency=USD', options)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var hotelArray = data;
        var hotelItems = hotelArray.suggestions[1].entities;
        if (hotelItems.length === 1) {
            // FETCH HOTEL DESCRIPTION
                
                
            fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[0].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function(data){

                var i = 0;
                var selectedHotelName = hotelItems[i].name;

                console.log(data);
                hotelAddress = data.data.body.propertyDescription.address.fullAddress;
            // CREATING MODALS
            
            var modalParentEl = document.createElement("p");
            hotelListEl.appendChild(modalParentEl);
            var modalEl = document.createElement("a");
            modalParentEl.appendChild(modalEl);
            modalEl.setAttribute("id","hotel-name" + i);
            modalEl.setAttribute("class","button is-primary modal-button");
            modalEl.setAttribute("data-target","#modal" + i);
            // Naming modal element
            var hotelNameEl = document.querySelector("#hotel-name" + i)
            hotelNameEl.textContent = selectedHotelName;
            // Modal content
            var modalContentEl = document.createElement("div");
            modalContentEl.setAttribute("id","modal" + i); // might need i
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
            modalContentEl9.textContent = selectedHotelName; // [HOTEL NAME]
            modalContentEl8.appendChild(modalContentEl9);
            var modalContentEl10 = document.createElement("section");
            modalContentEl7.appendChild(modalContentEl10);
            var modalContentEl11 = document.createElement("p");
            modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
            modalContentEl11.textContent = hotelAddress;
            modalContentEl7.appendChild(modalContentEl11);
            var modalContentEl12 = document.createElement("section");
            modalContentEl12.setAttribute("class","modal-card-foot");
            modalContentEl3.appendChild(modalContentEl12);
            var modalContentEl13 = document.createElement("p");
            modalContentEl12.appendChild(modalContentEl13);


            modalContentEl13.textContent = "Insert map here"; // might need i [MAP]

                var mapEl = document.createElement("iframe");
                modalContentEl13.appendChild(mapEl);
                mapEl.setAttribute("width","600");
                mapEl.setAttribute("height","500");
                mapEl.setAttribute("id","gmap_canvas");
                mapEl.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelAddress + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
                mapEl.setAttribute("frameborder","0");
                mapEl.setAttribute("scrolling","no");
                mapEl.setAttribute("marginheight","0");
                mapEl.setAttribute("marginwidth","0");


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
            })
            .catch(err => console.error(err));
            
        }
        if (hotelItems.length === 2) {
            // FETCH HOTEL DESCRIPTION
                
                
            fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[0].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function(data){

                var i = 0;
                var selectedHotelName = hotelItems[i].name;

                console.log(data);
                hotelAddress = data.data.body.propertyDescription.address.fullAddress;
            // CREATING MODALS
            
            var modalParentEl = document.createElement("p");
            hotelListEl.appendChild(modalParentEl);
            var modalEl = document.createElement("a");
            modalParentEl.appendChild(modalEl);
            modalEl.setAttribute("id","hotel-name" + i);
            modalEl.setAttribute("class","button is-primary modal-button");
            modalEl.setAttribute("data-target","#modal" + i);
            // Naming modal element
            var hotelNameEl = document.querySelector("#hotel-name" + i)
            hotelNameEl.textContent = selectedHotelName;
            // Modal content
            var modalContentEl = document.createElement("div");
            modalContentEl.setAttribute("id","modal" + i); // might need i
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
            modalContentEl9.textContent = selectedHotelName; // [HOTEL NAME]
            modalContentEl8.appendChild(modalContentEl9);
            var modalContentEl10 = document.createElement("section");
            modalContentEl7.appendChild(modalContentEl10);
            var modalContentEl11 = document.createElement("p");
            modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
            modalContentEl11.textContent = hotelAddress;
            modalContentEl7.appendChild(modalContentEl11);
            var modalContentEl12 = document.createElement("section");
            modalContentEl12.setAttribute("class","modal-card-foot");
            modalContentEl3.appendChild(modalContentEl12);
            var modalContentEl13 = document.createElement("p");
            modalContentEl12.appendChild(modalContentEl13);
            // might need i [MAP]
            var mapEl = document.createElement("iframe");
                modalContentEl13.appendChild(mapEl);
                mapEl.setAttribute("width","600");
                mapEl.setAttribute("height","500");
                mapEl.setAttribute("id","gmap_canvas");
                mapEl.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelAddress + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
                mapEl.setAttribute("frameborder","0");
                mapEl.setAttribute("scrolling","no");
                mapEl.setAttribute("marginheight","0");
                mapEl.setAttribute("marginwidth","0");
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
            })
            .catch(err => console.error(err));
            
            // -------------------------------------------------------------------------------------------------
            // FETCH HOTEL DESCRIPTION
                
                
            fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[1].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function(data){

                var i = 1;
                var selectedHotelName = hotelItems[i].name;

                console.log(data);
                hotelAddress = data.data.body.propertyDescription.address.fullAddress;
            // CREATING MODALS
            
            var modalParentEl = document.createElement("p");
            hotelListEl.appendChild(modalParentEl);
            var modalEl = document.createElement("a");
            modalParentEl.appendChild(modalEl);
            modalEl.setAttribute("id","hotel-name" + i);
            modalEl.setAttribute("class","button is-primary modal-button");
            modalEl.setAttribute("data-target","#modal" + i);
            // Naming modal element
            var hotelNameEl = document.querySelector("#hotel-name" + i)
            hotelNameEl.textContent = selectedHotelName;
            // Modal content
            var modalContentEl = document.createElement("div");
            modalContentEl.setAttribute("id","modal" + i); // might need i
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
            modalContentEl9.textContent = selectedHotelName; // [HOTEL NAME]
            modalContentEl8.appendChild(modalContentEl9);
            var modalContentEl10 = document.createElement("section");
            modalContentEl7.appendChild(modalContentEl10);
            var modalContentEl11 = document.createElement("p");
            modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
            modalContentEl11.textContent = hotelAddress;
            modalContentEl7.appendChild(modalContentEl11);
            var modalContentEl12 = document.createElement("section");
            modalContentEl12.setAttribute("class","modal-card-foot");
            modalContentEl3.appendChild(modalContentEl12);
            var modalContentEl13 = document.createElement("p");
            modalContentEl12.appendChild(modalContentEl13);
            // might need i [MAP]
            var mapEl = document.createElement("iframe");
                modalContentEl13.appendChild(mapEl);
                mapEl.setAttribute("width","600");
                mapEl.setAttribute("height","500");
                mapEl.setAttribute("id","gmap_canvas");
                mapEl.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelAddress + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
                mapEl.setAttribute("frameborder","0");
                mapEl.setAttribute("scrolling","no");
                mapEl.setAttribute("marginheight","0");
                mapEl.setAttribute("marginwidth","0");
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
            })
            .catch(err => console.error(err));
            
        }
        if (hotelItems.length === 3) {

                
                // FETCH HOTEL DESCRIPTION
                
                
                fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[0].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function(data){

                    var i = 0;
                    var selectedHotelName = hotelItems[i].name;

                    console.log(data);
                    hotelAddress = data.data.body.propertyDescription.address.fullAddress;
                // CREATING MODALS
                
                var modalParentEl = document.createElement("p");
                hotelListEl.appendChild(modalParentEl);
                var modalEl = document.createElement("a");
                modalParentEl.appendChild(modalEl);
                modalEl.setAttribute("id","hotel-name" + i);
                modalEl.setAttribute("class","button is-primary modal-button");
                modalEl.setAttribute("data-target","#modal" + i);
                // Naming modal element
                var hotelNameEl = document.querySelector("#hotel-name" + i)
                hotelNameEl.textContent = selectedHotelName;
                // Modal content
                var modalContentEl = document.createElement("div");
                modalContentEl.setAttribute("id","modal" + i); // might need i
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
                modalContentEl9.textContent = selectedHotelName; // [HOTEL NAME]
                modalContentEl8.appendChild(modalContentEl9);
                var modalContentEl10 = document.createElement("section");
                modalContentEl7.appendChild(modalContentEl10);
                var modalContentEl11 = document.createElement("p");
                modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
                modalContentEl11.textContent = hotelAddress;
                modalContentEl7.appendChild(modalContentEl11);
                var modalContentEl12 = document.createElement("section");
                modalContentEl12.setAttribute("class","modal-card-foot");
                modalContentEl3.appendChild(modalContentEl12);
                var modalContentEl13 = document.createElement("p");
                modalContentEl12.appendChild(modalContentEl13);
                // might need i [MAP]
                var mapEl = document.createElement("iframe");
                modalContentEl13.appendChild(mapEl);
                mapEl.setAttribute("width","600");
                mapEl.setAttribute("height","500");
                mapEl.setAttribute("id","gmap_canvas");
                mapEl.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelAddress + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
                mapEl.setAttribute("frameborder","0");
                mapEl.setAttribute("scrolling","no");
                mapEl.setAttribute("marginheight","0");
                mapEl.setAttribute("marginwidth","0");
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
                })
                .catch(err => console.error(err));
                
                // ------------------------------------------------------------------------------
                fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[1].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function(data){

                    var i = 1;
                    var selectedHotelName = hotelItems[i].name;

                    console.log(data);
                    hotelAddress = data.data.body.propertyDescription.address.fullAddress;
                // CREATING MODALS
                
                var modalParentEl = document.createElement("p");
                hotelListEl.appendChild(modalParentEl);
                var modalEl = document.createElement("a");
                modalParentEl.appendChild(modalEl);
                modalEl.setAttribute("id","hotel-name" + i);
                modalEl.setAttribute("class","button is-primary modal-button");
                modalEl.setAttribute("data-target","#modal" + i);
                // Naming modal element
                var hotelNameEl = document.querySelector("#hotel-name" + i)
                hotelNameEl.textContent = selectedHotelName;
                // Modal content
                var modalContentEl = document.createElement("div");
                modalContentEl.setAttribute("id","modal" + i); // might need i
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
                modalContentEl9.textContent = selectedHotelName; // [HOTEL NAME]
                modalContentEl8.appendChild(modalContentEl9);
                var modalContentEl10 = document.createElement("section");
                modalContentEl7.appendChild(modalContentEl10);
                var modalContentEl11 = document.createElement("p");
                modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
                modalContentEl11.textContent = hotelAddress;
                modalContentEl7.appendChild(modalContentEl11);
                var modalContentEl12 = document.createElement("section");
                modalContentEl12.setAttribute("class","modal-card-foot");
                modalContentEl3.appendChild(modalContentEl12);
                var modalContentEl13 = document.createElement("p");
                modalContentEl12.appendChild(modalContentEl13);
                 // might need i [MAP]
                 var mapEl = document.createElement("iframe");
                modalContentEl13.appendChild(mapEl);
                mapEl.setAttribute("width","600");
                mapEl.setAttribute("height","500");
                mapEl.setAttribute("id","gmap_canvas");
                mapEl.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelAddress + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
                mapEl.setAttribute("frameborder","0");
                mapEl.setAttribute("scrolling","no");
                mapEl.setAttribute("marginheight","0");
                mapEl.setAttribute("marginwidth","0");
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
                })
                .catch(err => console.error(err));

                // --------------------------------------------------------------------------------------------
                fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[2].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function(data){

                    var i = 2;
                    var selectedHotelName = hotelItems[i].name;

                    console.log(data);
                    hotelAddress = data.data.body.propertyDescription.address.fullAddress;
                // CREATING MODALS
                
                var modalParentEl = document.createElement("p");
                hotelListEl.appendChild(modalParentEl);
                var modalEl = document.createElement("a");
                modalParentEl.appendChild(modalEl);
                modalEl.setAttribute("id","hotel-name" + i);
                modalEl.setAttribute("class","button is-primary modal-button");
                modalEl.setAttribute("data-target","#modal" + i);
                // Naming modal element
                var hotelNameEl = document.querySelector("#hotel-name" + i)
                hotelNameEl.textContent = selectedHotelName;
                // Modal content
                var modalContentEl = document.createElement("div");
                modalContentEl.setAttribute("id","modal" + i); // might need i
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
                modalContentEl9.textContent = selectedHotelName; // [HOTEL NAME]
                modalContentEl8.appendChild(modalContentEl9);
                var modalContentEl10 = document.createElement("section");
                modalContentEl7.appendChild(modalContentEl10);
                var modalContentEl11 = document.createElement("p");
                modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
                modalContentEl11.textContent = hotelAddress;
                modalContentEl7.appendChild(modalContentEl11);
                var modalContentEl12 = document.createElement("section");
                modalContentEl12.setAttribute("class","modal-card-foot");
                modalContentEl3.appendChild(modalContentEl12);
                var modalContentEl13 = document.createElement("p");
                modalContentEl12.appendChild(modalContentEl13);
                // might need i [MAP]
                var mapEl = document.createElement("iframe");
                modalContentEl13.appendChild(mapEl);
                mapEl.setAttribute("width","600");
                mapEl.setAttribute("height","500");
                mapEl.setAttribute("id","gmap_canvas");
                mapEl.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelAddress + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
                mapEl.setAttribute("frameborder","0");
                mapEl.setAttribute("scrolling","no");
                mapEl.setAttribute("marginheight","0");
                mapEl.setAttribute("marginwidth","0");
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
                })
                .catch(err => console.error(err));
                //console.log(hotelAddress);
                 
                
                                    // Creates list element for hotel
                                    // var hotelListItem = document.createElement("li");
                                    // // Puts list in the <ul> element
                                    // hotelListEl.appendChild(hotelListItem);
                                    // // Assigns the list element the name of the hotel
                                    // hotelListItem.textContent = selectedHotel;
            }
        if (hotelItems.length === 4) {
            // FETCH HOTEL DESCRIPTION
                
                
            fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[0].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function(data){

                var i = 0;
                var selectedHotelName = hotelItems[i].name;

                console.log(data);
                hotelAddress = data.data.body.propertyDescription.address.fullAddress;
            // CREATING MODALS
            
            var modalParentEl = document.createElement("p");
            hotelListEl.appendChild(modalParentEl);
            var modalEl = document.createElement("a");
            modalParentEl.appendChild(modalEl);
            modalEl.setAttribute("id","hotel-name" + i);
            modalEl.setAttribute("class","button is-primary modal-button");
            modalEl.setAttribute("data-target","#modal" + i);
            // Naming modal element
            var hotelNameEl = document.querySelector("#hotel-name" + i)
            hotelNameEl.textContent = selectedHotelName;
            // Modal content
            var modalContentEl = document.createElement("div");
            modalContentEl.setAttribute("id","modal" + i); // might need i
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
            modalContentEl9.textContent = selectedHotelName; // [HOTEL NAME]
            modalContentEl8.appendChild(modalContentEl9);
            var modalContentEl10 = document.createElement("section");
            modalContentEl7.appendChild(modalContentEl10);
            var modalContentEl11 = document.createElement("p");
            modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
            modalContentEl11.textContent = hotelAddress;
            modalContentEl7.appendChild(modalContentEl11);
            var modalContentEl12 = document.createElement("section");
            modalContentEl12.setAttribute("class","modal-card-foot");
            modalContentEl3.appendChild(modalContentEl12);
            var modalContentEl13 = document.createElement("p");
            modalContentEl12.appendChild(modalContentEl13);
            // might need i [MAP]
            var mapEl = document.createElement("iframe");
                modalContentEl13.appendChild(mapEl);
                mapEl.setAttribute("width","600");
                mapEl.setAttribute("height","500");
                mapEl.setAttribute("id","gmap_canvas");
                mapEl.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelAddress + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
                mapEl.setAttribute("frameborder","0");
                mapEl.setAttribute("scrolling","no");
                mapEl.setAttribute("marginheight","0");
                mapEl.setAttribute("marginwidth","0");
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
            })
            .catch(err => console.error(err));
            
            // -----------------------------------------------------------------------------------------------------------
            // FETCH HOTEL DESCRIPTION
                
                
                fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[1].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function(data){

                    var i = 1;
                    var selectedHotelName = hotelItems[i].name;

                    console.log(data);
                    hotelAddress = data.data.body.propertyDescription.address.fullAddress;
                // CREATING MODALS
                
                var modalParentEl = document.createElement("p");
                hotelListEl.appendChild(modalParentEl);
                var modalEl = document.createElement("a");
                modalParentEl.appendChild(modalEl);
                modalEl.setAttribute("id","hotel-name" + i);
                modalEl.setAttribute("class","button is-primary modal-button");
                modalEl.setAttribute("data-target","#modal" + i);
                // Naming modal element
                var hotelNameEl = document.querySelector("#hotel-name" + i)
                hotelNameEl.textContent = selectedHotelName;
                // Modal content
                var modalContentEl = document.createElement("div");
                modalContentEl.setAttribute("id","modal" + i); // might need i
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
                modalContentEl9.textContent = selectedHotelName; // [HOTEL NAME]
                modalContentEl8.appendChild(modalContentEl9);
                var modalContentEl10 = document.createElement("section");
                modalContentEl7.appendChild(modalContentEl10);
                var modalContentEl11 = document.createElement("p");
                modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
                modalContentEl11.textContent = hotelAddress;
                modalContentEl7.appendChild(modalContentEl11);
                var modalContentEl12 = document.createElement("section");
                modalContentEl12.setAttribute("class","modal-card-foot");
                modalContentEl3.appendChild(modalContentEl12);
                var modalContentEl13 = document.createElement("p");
                modalContentEl12.appendChild(modalContentEl13);
                // might need i [MAP]
                var mapEl = document.createElement("iframe");
                modalContentEl13.appendChild(mapEl);
                mapEl.setAttribute("width","600");
                mapEl.setAttribute("height","500");
                mapEl.setAttribute("id","gmap_canvas");
                mapEl.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelAddress + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
                mapEl.setAttribute("frameborder","0");
                mapEl.setAttribute("scrolling","no");
                mapEl.setAttribute("marginheight","0");
                mapEl.setAttribute("marginwidth","0");
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
                })
                .catch(err => console.error(err));
                
                // -------------------------------------------------------------------------------------------------------------------
                // FETCH HOTEL DESCRIPTION
                
                
                fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[2].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function(data){

                    var i = 2;
                    var selectedHotelName = hotelItems[i].name;

                    console.log(data);
                    hotelAddress = data.data.body.propertyDescription.address.fullAddress;
                // CREATING MODALS
                
                var modalParentEl = document.createElement("p");
                hotelListEl.appendChild(modalParentEl);
                var modalEl = document.createElement("a");
                modalParentEl.appendChild(modalEl);
                modalEl.setAttribute("id","hotel-name" + i);
                modalEl.setAttribute("class","button is-primary modal-button");
                modalEl.setAttribute("data-target","#modal" + i);
                // Naming modal element
                var hotelNameEl = document.querySelector("#hotel-name" + i)
                hotelNameEl.textContent = selectedHotelName;
                // Modal content
                var modalContentEl = document.createElement("div");
                modalContentEl.setAttribute("id","modal" + i); // might need i
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
                modalContentEl9.textContent = selectedHotelName; // [HOTEL NAME]
                modalContentEl8.appendChild(modalContentEl9);
                var modalContentEl10 = document.createElement("section");
                modalContentEl7.appendChild(modalContentEl10);
                var modalContentEl11 = document.createElement("p");
                modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
                modalContentEl11.textContent = hotelAddress;
                modalContentEl7.appendChild(modalContentEl11);
                var modalContentEl12 = document.createElement("section");
                modalContentEl12.setAttribute("class","modal-card-foot");
                modalContentEl3.appendChild(modalContentEl12);
                var modalContentEl13 = document.createElement("p");
                modalContentEl12.appendChild(modalContentEl13);
                // might need i [MAP]
                var mapEl = document.createElement("iframe");
                modalContentEl13.appendChild(mapEl);
                mapEl.setAttribute("width","600");
                mapEl.setAttribute("height","500");
                mapEl.setAttribute("id","gmap_canvas");
                mapEl.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelAddress + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
                mapEl.setAttribute("frameborder","0");
                mapEl.setAttribute("scrolling","no");
                mapEl.setAttribute("marginheight","0");
                mapEl.setAttribute("marginwidth","0");
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
                })
                .catch(err => console.error(err));
                
                // -------------------------------------------------------------------------------------------------------------------------
                // FETCH HOTEL DESCRIPTION
                
                
                fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[3].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function(data){

                    var i = 3;
                    var selectedHotelName = hotelItems[i].name;

                    console.log(data);
                    hotelAddress = data.data.body.propertyDescription.address.fullAddress;
                // CREATING MODALS
                
                var modalParentEl = document.createElement("p");
                hotelListEl.appendChild(modalParentEl);
                var modalEl = document.createElement("a");
                modalParentEl.appendChild(modalEl);
                modalEl.setAttribute("id","hotel-name" + i);
                modalEl.setAttribute("class","button is-primary modal-button");
                modalEl.setAttribute("data-target","#modal" + i);
                // Naming modal element
                var hotelNameEl = document.querySelector("#hotel-name" + i)
                hotelNameEl.textContent = selectedHotelName;
                // Modal content
                var modalContentEl = document.createElement("div");
                modalContentEl.setAttribute("id","modal" + i); // might need i
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
                modalContentEl9.textContent = selectedHotelName; // [HOTEL NAME]
                modalContentEl8.appendChild(modalContentEl9);
                var modalContentEl10 = document.createElement("section");
                modalContentEl7.appendChild(modalContentEl10);
                var modalContentEl11 = document.createElement("p");
                modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
                modalContentEl11.textContent = hotelAddress;
                modalContentEl7.appendChild(modalContentEl11);
                var modalContentEl12 = document.createElement("section");
                modalContentEl12.setAttribute("class","modal-card-foot");
                modalContentEl3.appendChild(modalContentEl12);
                var modalContentEl13 = document.createElement("p");
                modalContentEl12.appendChild(modalContentEl13);
                // might need i [MAP]
                var mapEl = document.createElement("iframe");
                modalContentEl13.appendChild(mapEl);
                mapEl.setAttribute("width","600");
                mapEl.setAttribute("height","500");
                mapEl.setAttribute("id","gmap_canvas");
                mapEl.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelAddress + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
                mapEl.setAttribute("frameborder","0");
                mapEl.setAttribute("scrolling","no");
                mapEl.setAttribute("marginheight","0");
                mapEl.setAttribute("marginwidth","0");
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
                })
                .catch(err => console.error(err));
                
        }
        if (hotelItems.length === 5) {
            // FETCH HOTEL DESCRIPTION
                
                
            fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[0].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function(data){

                var i = 0;
                var selectedHotelName = hotelItems[i].name;

                console.log(data);
                hotelAddress = data.data.body.propertyDescription.address.fullAddress;
            // CREATING MODALS
            
            var modalParentEl = document.createElement("p");
            hotelListEl.appendChild(modalParentEl);
            var modalEl = document.createElement("a");
            modalParentEl.appendChild(modalEl);
            modalEl.setAttribute("id","hotel-name" + i);
            modalEl.setAttribute("class","button is-primary modal-button");
            modalEl.setAttribute("data-target","#modal" + i);
            // Naming modal element
            var hotelNameEl = document.querySelector("#hotel-name" + i)
            hotelNameEl.textContent = selectedHotelName;
            // Modal content
            var modalContentEl = document.createElement("div");
            modalContentEl.setAttribute("id","modal" + i); // might need i
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
            modalContentEl9.textContent = selectedHotelName; // [HOTEL NAME]
            modalContentEl8.appendChild(modalContentEl9);
            var modalContentEl10 = document.createElement("section");
            modalContentEl7.appendChild(modalContentEl10);
            var modalContentEl11 = document.createElement("p");
            modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
            modalContentEl11.textContent = hotelAddress;
            modalContentEl7.appendChild(modalContentEl11);
            var modalContentEl12 = document.createElement("section");
            modalContentEl12.setAttribute("class","modal-card-foot");
            modalContentEl3.appendChild(modalContentEl12);
            var modalContentEl13 = document.createElement("p");
            modalContentEl12.appendChild(modalContentEl13);
            // might need i [MAP]
            var mapEl = document.createElement("iframe");
                modalContentEl13.appendChild(mapEl);
                mapEl.setAttribute("width","600");
                mapEl.setAttribute("height","500");
                mapEl.setAttribute("id","gmap_canvas");
                mapEl.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelAddress + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
                mapEl.setAttribute("frameborder","0");
                mapEl.setAttribute("scrolling","no");
                mapEl.setAttribute("marginheight","0");
                mapEl.setAttribute("marginwidth","0");
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
            })
            .catch(err => console.error(err));
            
            // -----------------------------------------------------------------------------------------------------
            // FETCH HOTEL DESCRIPTION
                
                
            fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[1].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function(data){

                var i = 1;
                var selectedHotelName = hotelItems[i].name;

                console.log(data);
                hotelAddress = data.data.body.propertyDescription.address.fullAddress;
            // CREATING MODALS
            
            var modalParentEl = document.createElement("p");
            hotelListEl.appendChild(modalParentEl);
            var modalEl = document.createElement("a");
            modalParentEl.appendChild(modalEl);
            modalEl.setAttribute("id","hotel-name" + i);
            modalEl.setAttribute("class","button is-primary modal-button");
            modalEl.setAttribute("data-target","#modal" + i);
            // Naming modal element
            var hotelNameEl = document.querySelector("#hotel-name" + i)
            hotelNameEl.textContent = selectedHotelName;
            // Modal content
            var modalContentEl = document.createElement("div");
            modalContentEl.setAttribute("id","modal" + i); // might need i
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
            modalContentEl9.textContent = selectedHotelName; // [HOTEL NAME]
            modalContentEl8.appendChild(modalContentEl9);
            var modalContentEl10 = document.createElement("section");
            modalContentEl7.appendChild(modalContentEl10);
            var modalContentEl11 = document.createElement("p");
            modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
            modalContentEl11.textContent = hotelAddress;
            modalContentEl7.appendChild(modalContentEl11);
            var modalContentEl12 = document.createElement("section");
            modalContentEl12.setAttribute("class","modal-card-foot");
            modalContentEl3.appendChild(modalContentEl12);
            var modalContentEl13 = document.createElement("p");
            modalContentEl12.appendChild(modalContentEl13);
            // might need i [MAP]
            var mapEl = document.createElement("iframe");
                modalContentEl13.appendChild(mapEl);
                mapEl.setAttribute("width","600");
                mapEl.setAttribute("height","500");
                mapEl.setAttribute("id","gmap_canvas");
                mapEl.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelAddress + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
                mapEl.setAttribute("frameborder","0");
                mapEl.setAttribute("scrolling","no");
                mapEl.setAttribute("marginheight","0");
                mapEl.setAttribute("marginwidth","0");
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
            })
            .catch(err => console.error(err));
            
            // -----------------------------------------------------------------------------------------------------------------------
            // FETCH HOTEL DESCRIPTION
                
                
            fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[2].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function(data){

                var i = 2;
                var selectedHotelName = hotelItems[i].name;

                console.log(data);
                hotelAddress = data.data.body.propertyDescription.address.fullAddress;
            // CREATING MODALS
            
            var modalParentEl = document.createElement("p");
            hotelListEl.appendChild(modalParentEl);
            var modalEl = document.createElement("a");
            modalParentEl.appendChild(modalEl);
            modalEl.setAttribute("id","hotel-name" + i);
            modalEl.setAttribute("class","button is-primary modal-button");
            modalEl.setAttribute("data-target","#modal" + i);
            // Naming modal element
            var hotelNameEl = document.querySelector("#hotel-name" + i)
            hotelNameEl.textContent = selectedHotelName;
            // Modal content
            var modalContentEl = document.createElement("div");
            modalContentEl.setAttribute("id","modal" + i); // might need i
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
            modalContentEl9.textContent = selectedHotelName; // [HOTEL NAME]
            modalContentEl8.appendChild(modalContentEl9);
            var modalContentEl10 = document.createElement("section");
            modalContentEl7.appendChild(modalContentEl10);
            var modalContentEl11 = document.createElement("p");
            modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
            modalContentEl11.textContent = hotelAddress;
            modalContentEl7.appendChild(modalContentEl11);
            var modalContentEl12 = document.createElement("section");
            modalContentEl12.setAttribute("class","modal-card-foot");
            modalContentEl3.appendChild(modalContentEl12);
            var modalContentEl13 = document.createElement("p");
            modalContentEl12.appendChild(modalContentEl13);
            // might need i [MAP]
            var mapEl = document.createElement("iframe");
                modalContentEl13.appendChild(mapEl);
                mapEl.setAttribute("width","600");
                mapEl.setAttribute("height","500");
                mapEl.setAttribute("id","gmap_canvas");
                mapEl.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelAddress + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
                mapEl.setAttribute("frameborder","0");
                mapEl.setAttribute("scrolling","no");
                mapEl.setAttribute("marginheight","0");
                mapEl.setAttribute("marginwidth","0");
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
            })
            .catch(err => console.error(err));
            
            // -----------------------------------------------------------------------------------------------------------
            // FETCH HOTEL DESCRIPTION
                
                
            fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[3].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function(data){

                var i = 3;
                var selectedHotelName = hotelItems[i].name;

                console.log(data);
                hotelAddress = data.data.body.propertyDescription.address.fullAddress;
            // CREATING MODALS
            
            var modalParentEl = document.createElement("p");
            hotelListEl.appendChild(modalParentEl);
            var modalEl = document.createElement("a");
            modalParentEl.appendChild(modalEl);
            modalEl.setAttribute("id","hotel-name" + i);
            modalEl.setAttribute("class","button is-primary modal-button");
            modalEl.setAttribute("data-target","#modal" + i);
            // Naming modal element
            var hotelNameEl = document.querySelector("#hotel-name" + i)
            hotelNameEl.textContent = selectedHotelName;
            // Modal content
            var modalContentEl = document.createElement("div");
            modalContentEl.setAttribute("id","modal" + i); // might need i
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
            modalContentEl9.textContent = selectedHotelName; // [HOTEL NAME]
            modalContentEl8.appendChild(modalContentEl9);
            var modalContentEl10 = document.createElement("section");
            modalContentEl7.appendChild(modalContentEl10);
            var modalContentEl11 = document.createElement("p");
            modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
            modalContentEl11.textContent = hotelAddress;
            modalContentEl7.appendChild(modalContentEl11);
            var modalContentEl12 = document.createElement("section");
            modalContentEl12.setAttribute("class","modal-card-foot");
            modalContentEl3.appendChild(modalContentEl12);
            var modalContentEl13 = document.createElement("p");
            modalContentEl12.appendChild(modalContentEl13);
            // might need i [MAP]
            var mapEl = document.createElement("iframe");
                modalContentEl13.appendChild(mapEl);
                mapEl.setAttribute("width","600");
                mapEl.setAttribute("height","500");
                mapEl.setAttribute("id","gmap_canvas");
                mapEl.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelAddress + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
                mapEl.setAttribute("frameborder","0");
                mapEl.setAttribute("scrolling","no");
                mapEl.setAttribute("marginheight","0");
                mapEl.setAttribute("marginwidth","0");
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
            })
            .catch(err => console.error(err));
            
            // -------------------------------------------------------------------------------------------------------------------------------
            // FETCH HOTEL DESCRIPTION
                
                
            fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + hotelItems[4].destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options3)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function(data){

                var i = 4;
                var selectedHotelName = hotelItems[i].name;

                console.log(data);
                hotelAddress = data.data.body.propertyDescription.address.fullAddress;
            // CREATING MODALS
            
            var modalParentEl = document.createElement("p");
            hotelListEl.appendChild(modalParentEl);
            var modalEl = document.createElement("a");
            modalParentEl.appendChild(modalEl);
            modalEl.setAttribute("id","hotel-name" + i);
            modalEl.setAttribute("class","button is-primary modal-button");
            modalEl.setAttribute("data-target","#modal" + i);
            // Naming modal element
            var hotelNameEl = document.querySelector("#hotel-name" + i)
            hotelNameEl.textContent = selectedHotelName;
            // Modal content
            var modalContentEl = document.createElement("div");
            modalContentEl.setAttribute("id","modal" + i); // might need i
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
            modalContentEl9.textContent = selectedHotelName; // [HOTEL NAME]
            modalContentEl8.appendChild(modalContentEl9);
            var modalContentEl10 = document.createElement("section");
            modalContentEl7.appendChild(modalContentEl10);
            var modalContentEl11 = document.createElement("p");
            modalContentEl11.setAttribute("id","hotel-description"); // might need i [DESCRIPTION]
            modalContentEl11.textContent = hotelAddress;
            modalContentEl7.appendChild(modalContentEl11);
            var modalContentEl12 = document.createElement("section");
            modalContentEl12.setAttribute("class","modal-card-foot");
            modalContentEl3.appendChild(modalContentEl12);
            var modalContentEl13 = document.createElement("p");
            modalContentEl12.appendChild(modalContentEl13);
            // might need i [MAP]
            var mapEl = document.createElement("iframe");
                modalContentEl13.appendChild(mapEl);
                mapEl.setAttribute("width","600");
                mapEl.setAttribute("height","500");
                mapEl.setAttribute("id","gmap_canvas");
                mapEl.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelAddress + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
                mapEl.setAttribute("frameborder","0");
                mapEl.setAttribute("scrolling","no");
                mapEl.setAttribute("marginheight","0");
                mapEl.setAttribute("marginwidth","0");
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
            })
            .catch(err => console.error(err));
            
        }
        // If there are 5 or more hotels, only display 5 hotels
        else if (hotelItems.length >= 5) {
            console.log("MORE THAN 5 HOTELS");
        }
    })
}
//for when the user hits a button
var btnHandler = function(event){
    var userTarget = event.target;
    if(userTarget.matches("#submit")){
        hotelListEl.innerHtml = "";
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
        dailyWeatherEl.innerHTML = "";
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
console.log("test");
//open modal when clicked
   
 
