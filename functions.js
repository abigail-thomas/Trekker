// locationEntered = false;
let firstSearch = localStorage.getItem('firstSearch') === 'true' ? false : true;
const key = 'AIzaSyCmLL1N_bBudEjGSeDdYlqo0olQJ7r0ykc';
const key2 = 'tSvNEYpBqMruetD9GyNW8WMsYNJKanhO5bbhW4hD';
async function __init__() {
    // let location = 'Lakeland+FL';
    let form = document.getElementById('formID');
    // let parks = document.getElementById('parks');
    let parksContainer1 = document.getElementById('parks-container1');


    // console.log(location);
    form.addEventListener('submit', async function getLocation(event){
        event.preventDefault();

        
        let formInput = document.getElementById('location').value;
        if (!firstSearch){
            clearPrev(parksContainer1);
        }
        let location = formInput.replaceAll(/, /g, '+');

        firstSearch = false;

        await performSearch(location, parksContainer1);

        // console.log(location);
        // locationEntered = true;

        // return location


    /*const {lat, lng} = await getCoords(location);
    console.log(`Coordinates for ${location}:`, lat, lng);

    // console.log(lat, lng);
    getParks(lat, lng);
    
    // console.log(test);*/
});

}

function clearPrev(parksContainer1) {
    // Clear input field
    document.getElementById('location').value = '';

    // Clear previous results from the search results container
    // const searchResultsContainer = document.getElementById('searchResults').value;
    // console.log(searchResultsContainer);
    // searchResultsContainer.innerHTML = ''; // This clears the container

    parksContainer1.innerHTML = '';
}



async function performSearch(location, parksContainer1) {
    try {
        // Fetch the coordinates for the given location
        let { lat, lng } = await getCoords(location);
        
        // Perform the second search using these coordinates
        // console.log("Searching for parks near:", lat, lng);
        await getParks(lat, lng, location, parksContainer1);
    } catch (error) {
        console.error("Error during search:", error);
    }
}



async function getCoords(location) {
    // console.log("Fetching coordinates for:", location);
    

    try {
        // let location = getLocation();
        // let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyCmLL1N_bBudEjGSeDdYlqo0olQJ7r0ykc`);

        // let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCmLL1N_bBudEjGSeDdYlqo0olQJ7r0ykc`);
        let response = await fetch(`https://geocode.maps.co/search?q=${location}&api_key=674602f427fbe194124983rcya9edbe`);
        data = await response.json();
        
        // console.log(data.results);
        // console.log(data[0].lat);
        return {
            // lat: data.results[0].geometry.location.lat,
            // lng: data.results[0].geometry.location.lng,
            
            lat: data[0].lat,
            lng: data[0].lon,
            location: location
        };
    }
    catch (error) {
        console.log("Error: ", error);
    }
}

async function getParks(lat, lng, location, parksContainer1) {

    // console.log(lat, lng);

    try {
        // console.log(lat, lng);
        let locationFormatted = location.replaceAll(/,/g, '%2C');
       //  console.log(locationFormatted);

        locationFormatted = locationFormatted.replaceAll(/ /g, '%20');
        // console.log(locationFormatted);


// Fetch parks within the bounding box
        let r = await fetch(`https://developer.nps.gov/api/v1/parks?q=${locationFormatted}&api_key=${key2}`);
        let d = await r.json();
        console.log(d.data);
                // let response = await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&key=AIzaSyDp_BWGVtBDdliDAM-_YUe2HOX1lYHlpmo`);
        // let response = await fetch(`https://cors-anywhere.herokuapp.com/https://places.googleapis.com/v1/places/ChIJj61dQgK6j4AR4GeTYWZsKWw?fields=id,displayName&key=AIzaSyCmLL1N_bBudEjGSeDdYlqo0olQJ7r0ykc`);
        // let response = await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=park&key=AIzaSyCmLL1N_bBudEjGSeDdYlqo0olQJ7r0ykc`);
        
        // let response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=natural_feature&key=${key}`)}`);
        // let rawData = await response.text();
        //console.log(rawData);

        // let getID = await fetch (`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-${lat},${lng}&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCmLL1N_bBudEjGSeDdYlqo0olQJ7r0ykc`);
        
        // let data = await getID.json();
        // let bypass = await response.json();
        // console.log(data);
        // let data = JSON.parse(bypass.contents);
       //  console.log(data);

        
        // console.log(data.displayName.text);
        //const placeId = data.id;
        // let testy = await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyCmLL1N_bBudEjGSeDdYlqo0olQJ7r0ykc`);
        // let tester = await testy.json();
        // console.log(tester);
        await showParks(location, d.data, parksContainer1);
        
    }

    catch (error) {
        console.log("Error: ", error);
    }


    /*const query = `
    [out:json];
    node["leisure"="park"](around:10000, ${lat}, ${lng});
    out body;
`;

    const overpass = 'https://overpass-api.de/api/interpreter';
    let response = await fetch(overpass, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`
    });
    
    let data = await response.json();
    // return data;
    for (i in data.elements) {
        //console.log(data.elements[i].tags);

    }
    // console.log(data.elements);
     // Check if parks are found
    if (data.elements.length > 0) {
        // console.log("Parks found:", data.elements);
        // You can process and display the park data here, for example:
        data.elements.forEach(park => {
            // ]);
            // console.log(`Park Name: ${park.tags.name}, Location: (${park.lat}, ${park.lon})`);
        });
    } else {
        console.log("No parks found nearby.");
    }*/
}


async function showParks(location, data, parksContainer1) {
    try {
    let h1 = document.getElementById('header');
    let printLoc = location.replaceAll(/\+/g, ', ');
    h1.textContent = 'Results for ' + printLoc + ': ';

    
    // const allPlaces = data.results;
    /*let places = [];
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i].latitude, data[i].longitude);
        //if (data[i].latitude === lat && data[i].longitude === lng) {
            // console.log('here');
            places.push(data[i]);


//        }

    }*/
    // console.log(places.length);
    let nextPageToken = data.next_page_token;
    // parksContainer1.innerHTML = '';
    // places.forEach(place => {
        

        /*let card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('m-2');
       //  card.style.border = 'solid 20px';

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        let parkName = document.createElement('h5');
        parkName.textContent = place.name;
        cardBody.appendChild(parkName);

        parks.appendChild(cardBody);*/
       // console.log(places.length);

    // console.log(places.length);

        for (let i = 0; i < data.length; i++) {
            // for (let j = 0; j < i; j++)
            // console.log(places[i]);

            /*let parkName = document.createElement('h5');
            parkName.textContent = place.name;
            cardBody.appendChild(parkName);*/
            let col = document.createElement('div');
            col.classList.add('col-4', 'mb-4');

                // Create a new card element
            let card = document.createElement('div');
            card.classList.add('card');
            card.style.width = '100%';  // Optional: Set width of card

            // Card body
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');


            // Park name (Place Name)
            let parkName = document.createElement('h2');
            parkName.classList.add('card-title', 'hover-target');
            parkName.textContent = data[i].fullName;

            cardBody.appendChild(parkName);

            




             // Park location (if available)
            if (data[i].images) {
                let parkLocation = document.createElement('p');
                parkLocation.classList.add('card-text');
                // let locationText = `Location: ${places[i].geometry.location.lat}, ${places[i].geometry.location.lng}`;
                //parkLocation.textContent = locationText;
                // let photo_ref = places[i].photos[0].photo_reference;
                // let response = await fetch (`https://api.allorigins.win/get?url=${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_ref}&key=${key}`)}`);
                // let bypass = await response.json();
                // console.log(data);
                // let data = JSON.parse(bypass.contents);
                // let photo = await get.json();
                // let data = await response.json();
                // console.log(data);
                let img = document.createElement('img');
                img.classList.add('image');
                img.src = data[i].images[1].url;
                

                // console.log(img.src);
                cardBody.style.backgroundImage = `url(${img.src})`;
                // console.log(cardBody);
                cardBody.style.backgroundSize = 'cover';
                cardBody.style.height = '300px';
                

                // Append the image to the DOM
                //cardBody.appendChild(img);
                


                // cardBody.appendChild(parkLocation);
            }
            else {
                let img = document.createElement('img');
                img.src = 'imgs/noImage.png';
                cardBody.appendChild(img);
            }


            // get a summary
            // if (data[i].description) {
      

               //  let body = document.querySelector('body');
                // body.appendChild(hover);


                // hover.innerHTML = details;


                // details.textContent = 'Address: ' + result.formatted_address;
                let maps = document.createElement('a');
                maps.classList.add('addy', 'pt-3');
                maps.href = data[i].directionsUrl;
                maps.textContent = 'Address: ' + data[i].addresses[0].city + ', ' + data[i].addresses[0].stateCode + ', ' + data[i].addresses[0].postalCode + ', ' + data[i].addresses[0].countryCode;

                // console.log(details);

                //<p><a href="chess.com">chess</a></p>

                // details.innerHTML = maps;
                

                cardBody.appendChild(maps);
                // console.log(details);

            // }

            
            let det = data[i].description;
            // console.log(result);
            details = document.createElement('p');
            details.classList.add('det');
            details.textContent = det;

           


            

            let hover = document.createElement('div');
            let popUp = document.createElement('div');
            hover.classList.add('hover-container');
            // hover.textContent = 'See Park Description';
            popUp.classList.add('hover-box');
            hover.appendChild(popUp);
            popUp.appendChild(details);
            popUp.textContent = det;

            cardBody.appendChild(hover);

            // if rating availible
            let ratings = document.createElement('p');
            ratings.classList.add('stars');

            // ★
            let numStars = data[i].relevanceScore;
            // console.log(numStars);
            numStars = Math.floor(numStars);
            // console.log(numStars);
            
            if (data[i].relevanceScore){
                if (numStars === 1){
                    ratings.textContent = 'Rating: ★';
                }
                else if (numStars === 2) {
                    ratings.textContent ='Rating: ★★';
                }
                else if (numStars === 3) {
                    ratings.textContent ='Rating: ★★★';
                }
                else if (numStars === 4) {
                    ratings.textContent ='Rating: ★★★★';
                }
                else {
                    ratings.textContent ='Rating: ★★★★★';
                }
            }
            else {
                // console.log("here");

                ratings.textContent = 'No rating available';
            }
            cardBody.appendChild(ratings);

            // let card = document.querySelector('#card');
            // let col = document.getElementsByClassName('.col');
            // console.log(col);
            

            card.appendChild(cardBody);
            col.appendChild(card);
            parksContainer1.appendChild(col);


   // Add hover effect to the park name (hover-target)
   parkName.addEventListener('mouseenter', function() {
    popUp.style.opacity = '1'; // Show the hover box when hovering over the park name
    popUp.style.visibility = 'visible';
});

parkName.addEventListener('mouseleave', function() {
    popUp.style.opacity = '0'; // Hide the hover box when mouse leaves the park name
    popUp.style.visibility = 'hidden';
});
           
            // console.log(cardBody);
            
            // parksContainer1.innerHTML = cardBody;
            // console.log(parksContainer1);

        }

        // console.log('Name:', place.name);
        /*console.log('Location:', place.geometry.location);
        console.log('Icon:', place.icon);
        console.log('Business Status:', place.business_status);
        console.log('ID:', place.place_id);
        console.log('----------------------------------------');*/
    // });
    if (nextPageToken) {
        // console.log('Next page available. Use token:', nextPageToken);
        // You can use the next_page_token to fetch more places (make another API call).
    }
}
catch (error) {
    console.log('Error: ', error);
}

}



/*
async function showParks(location, data, parksContainer1) {
    try {
    let h1 = document.getElementById('header');
    let printLoc = location.replaceAll(/\+/g, ', ');
    h1.textContent = 'Results for ' + printLoc + ': ';

    
    // const allPlaces = data.results;
    let places = [];
    for (let i = 0; i < data.results.length; i++) {
        // console.log();
        if (data.results[i].photos && data.results[i].name) {
            // console.log(data.results[i]);
            places.push(data.results[i]);


        }

    }
    // console.log(places.length);
    let nextPageToken = data.next_page_token;
    // parksContainer1.innerHTML = '';
    // places.forEach(place => {
        

        let card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('m-2');
       //  card.style.border = 'solid 20px';

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        let parkName = document.createElement('h5');
        parkName.textContent = place.name;
        cardBody.appendChild(parkName);

        parks.appendChild(cardBody);
       // console.log(places.length);

    // console.log(places);

        for (let i = 0; i < places.length; i++) {
            // for (let j = 0; j < i; j++)
            // console.log(places[i]);

            let parkName = document.createElement('h5');
            parkName.textContent = place.name;
            cardBody.appendChild(parkName);
            let col = document.createElement('div');
            col.classList.add('col-4', 'mb-4');

                // Create a new card element
            let card = document.createElement('div');
            card.classList.add('card');
            card.style.width = '100%';  // Optional: Set width of card

            // Card body
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            // Park name (Place Name)
            let parkName = document.createElement('h2');
            parkName.classList.add('card-title');
            parkName.textContent = places[i].name;
            cardBody.appendChild(parkName);

            




             // Park location (if available)
            if (places[i].photos) {
                let parkLocation = document.createElement('p');
                parkLocation.classList.add('card-text');
                let locationText = `Location: ${places[i].geometry.location.lat}, ${places[i].geometry.location.lng}`;
                parkLocation.textContent = locationText;
                let photo_ref = places[i].photos[0].photo_reference;
                let response = await fetch (`https://api.allorigins.win/get?url=${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_ref}&key=${key}`)}`);
                // let bypass = await response.json();
                // console.log(data);
                // let data = JSON.parse(bypass.contents);
                // let photo = await get.json();
                let data = await response.json();
                // console.log(data);
                let img = document.createElement('img');
                img.classList.add('image');
                img.src = data.contents;
                

                // console.log(img.src);
                cardBody.style.backgroundImage = `url(${img.src})`;
                // console.log(cardBody);
                cardBody.style.backgroundSize = 'cover';
                cardBody.style.height = '300px';
                

                // Append the image to the DOM
                //cardBody.appendChild(img);
                


                // cardBody.appendChild(parkLocation);
            }
            else {
                let img = document.createElement('img');
                img.src = 'imgs/noImage.png';
                cardBody.appendChild(img);
            }


            // get a summary
            if (places[i].place_id) {
                let result = await getInfo(places[i].place_id);
                // console.log(result);
                // let details = document.createElement('p');
                // details.classList.add('details');
                // details.textContent = 'Address: ' + result.formatted_address;
                let maps = document.createElement('a');
                maps.classList.add('addy', 'pt-3');
                maps.href = result.url;
                maps.textContent = 'Address: ' + result.formatted_address;

                // console.log(maps);

                //<p><a href="chess.com">chess</a></p>

                // details.innerHTML = maps;

                cardBody.appendChild(maps);
                // console.log(details);

            }

            // if rating availible
            let ratings = document.createElement('p');
            ratings.classList.add('stars');

            // ★
            let numStars = places[i].rating;
            // console.log(numStars);
            numStars = Math.floor(numStars);
            // console.log(numStars);
            
            if (places[i].rating){
                if (numStars === 1){
                    ratings.textContent = 'Rating: ★';
                }
                else if (numStars === 2) {
                    ratings.textContent ='Rating: ★★';
                }
                else if (numStars === 3) {
                    ratings.textContent ='Rating: ★★★';
                }
                else if (numStars === 4) {
                    ratings.textContent ='Rating: ★★★★';
                }
                else {
                    ratings.textContent ='Rating: ★★★★★';
                }
            }
            else {
                // console.log("here");

                ratings.textContent = 'No rating available';
            }
            cardBody.appendChild(ratings);

            // let card = document.querySelector('#card');
            // let col = document.getElementsByClassName('.col');
            // console.log(col);
            

            card.appendChild(cardBody);
            col.appendChild(card);
            parksContainer1.appendChild(col);



           
            // console.log(cardBody);
            
            // parksContainer1.innerHTML = cardBody;
            // console.log(parksContainer1);

        }

        // console.log('Name:', place.name);
        /*console.log('Location:', place.geometry.location);
        console.log('Icon:', place.icon);
        console.log('Business Status:', place.business_status);
        console.log('ID:', place.place_id);
        console.log('----------------------------------------');
    // });
    if (nextPageToken) {
        // console.log('Next page available. Use token:', nextPageToken);
        // You can use the next_page_token to fetch more places (make another API call).
    }
}
catch (error) {
    console.log('Error: ', error);
}

}

*/

async function getInfo(place_id) {
    try {
        // get the formatted address
        // url to googl emaps

        let response = await fetch (`https://api.allorigins.win/get?url=${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,formatted_address,url&types,photos,editorial_summary,&key=${key}`)}`);
        let bypass = await response.json();
        // console.log(data);
        let data = JSON.parse(bypass.contents);
        // console.log(data);
        return data.result;
        

    }
    catch (error) {
        console.log('Error: ', error);
    }
}




__init__();
