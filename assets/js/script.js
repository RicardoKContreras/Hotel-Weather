var hotelListEl = document.querySelector("#hotel-list");
var ModalListEl = document.querySelector("#first-Modal");




const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '570d281ac0msh9eb53b8d43d10f4p1b02f6jsn16a2cbd64cdf',
		'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
    }
};
/*fetch('https://hotels4.p.rapidapi.com/locations/v2/search?query=charlotte%20north%20carolina&locale=en_US&currency=USD', options)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var hotelArray = data;
        var hotelItems = hotelArray.suggestions[1].entities;
        console.log(hotelArray);
        //console.log(hotelItems);
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
  //  .then(response => console.log(response))
    .catch(err => console.error(err))
    .then(function (response) {
        return response.json();
    })*/
    





var modal = document.getElementById("firstModal");
var modalBtn = document.getElementById("openModal");
var closeModal = document.getElementById("exit-Modal");


modalBtn.onclick = function(e) {
    // e.target gives you the item of whatever you clicked
    console.log(e.target.value);
    
    fetch('https://hotels4.p.rapidapi.com/locations/v2/search?query=charlotte%20north%20carolina&locale=en_US&currency=USD', options)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        
        var hotelArray = data;
        var hotelItems = hotelArray.suggestions[1].entities;
        console.log(hotelItems);
        var clickedHotel;
        for (var i = 0; i < hotelItems.length; i++) {
            // clickedHotel shows descriptive info for a hotel such as name, longititude, latitude, and destinationId
            // longitiude and latitude can be used for the google maps, destinationId can be used for the API endpoint properties/get-details to dsiplay hotel information on the page
            
            if(hotelItems[i].name === e.target.value) {
               clickedHotel = hotelItems[i];

                console.log(clickedHotel);
            }   
        }

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '570d281ac0msh9eb53b8d43d10f4p1b02f6jsn16a2cbd64cdf',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
            }
        };
        
        fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=` + clickedHotel.destinationId + `&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options)
        .then(function (response) {
            console.log(response);
            return response.json();
            
        })
        // HotelfullInfo shows a unique description about the hotel
        
        .then(function(hotelDescription){
            //hotelInfo GETS FULL ADDREESS
            var hotelInfo = hotelDescription.data.body.propertyDescription.address.fullAddress;
            console.log(hotelInfo);
           
            

            //Creates a GOOGLE MAP ON THE PAGE
            var createMap =  document.getElementById("gmap_canvas");
           var makeMap = createMap.setAttribute("src", "https://maps.google.com/maps?q=2880%20B%20" + hotelInfo + "%20&t=&z=13&ie=UTF8&iwloc=&output=embed");
            
            
            console.log(makeMap);
            //ModalListEl.append(hotelfullInfo);
            ModalListEl.append(createMap);

            console.log(hotelInfo);
            console.log(hotelFullInfo);
            
        })

      
        
                //this console log logs the hotels description
                 //console.log(response.neighborhood.neighborhoodLongDescription)
            
                 
            .catch(err => console.error(err));
            
            
            
        
    })
};

