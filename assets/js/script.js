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
fetch('https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id=193124', options2)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));



