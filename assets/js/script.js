var hotelListEl = document.querySelector("#hotel-list");




const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
        'X-RapidAPI-Key': 'b40fbb7a75msh7ad2cc034897e7dp14d8bbjsnf5d6a567e31e'
    }
};
fetch('https://hotels4.p.rapidapi.com/locations/v2/search?query=charlotte%20north%20carolina&locale=en_US&currency=USD', options)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var hotelArray = data;
        console.log(hotelArray);

        for (var i = 0; i < 5; i++) {
            var hotelListItem = document.createElement("li");
            hotelListEl.appendChild(hotelListItem);
            hotelListItem.textContent = hotelArray.suggestions[1].entities[i].caption;
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



