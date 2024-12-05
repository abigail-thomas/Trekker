let firstSearch = localStorage.getItem('firstSearch') === 'true' ? false : true;
const key2 = 'tSvNEYpBqMruetD9GyNW8WMsYNJKanhO5bbhW4hD';
async function __init__() {
    let form = document.getElementById('formID');
    let parksContainer1 = document.getElementById('parks-container1');

    form.addEventListener('submit', async function getLocation(event){
        event.preventDefault();

        
        let formInput = document.getElementById('location').value;
        if (!firstSearch){
            clearPrev(parksContainer1);
        }
        let location = formInput.replaceAll(/, /g, '+');

        firstSearch = false;

        await performSearch(location, parksContainer1);
});

}

function clearPrev(parksContainer1) {
    // Clear input field
    document.getElementById('location').value = '';

    // Clear previous results from the search results container
    parksContainer1.innerHTML = '';
}



async function performSearch(location, parksContainer1) {
    try {
        // Fetch the coordinates for the given location
        // let place = await getCoords(location);
        
        // Perform the second search using these coordinates
        await getParks(location, parksContainer1);
    } catch (error) {
        console.error("Error during search:", error);
    }
}


/*
async function getCoords(location) {

    try {
        let response = await fetch(`https://geocode.maps.co/search?q=${location}&api_key=674602f427fbe194124983rcya9edbe`);
        data = await response.json();

        // console.log(location);
        
        return {
          
            // lat: data[0].lat,
            // lng: data[0].lon,
            location: location
        };
    }
    catch (error) {
        console.log("Error: ", error);
    }
}*/

async function getParks(location, parksContainer1) {

    try {
        console.log(location);
        let locationFormatted = location.replaceAll(/,/g, '%2C');
        locationFormatted = locationFormatted.replaceAll(/ /g, '%20');


        console.log(locationFormatted);
        let r = await fetch(`https://developer.nps.gov/api/v1/parks?q=${locationFormatted}&api_key=${key2}`);
        let d = await r.json();
        console.log(d.data);
        await showParks(location, d.data, parksContainer1);
        
    }

    catch (error) {
        console.log("Error: ", error);
    }
}


async function showParks(location, data, parksContainer1) {
    try {
    let h1 = document.getElementById('header');
    let printLoc = location.replaceAll(/\+/g, ', ');
    h1.textContent = 'Results for ' + printLoc + ': ';

    
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].fullName)
            
            let col = document.createElement('div');
            col.classList.add('col-4', 'mb-4');
            let card = document.createElement('div');
            card.classList.add('card');
            card.style.width = '100%'; 
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            let parkName = document.createElement('h2');
            parkName.classList.add('card-title', 'hover-target');
            parkName.textContent = data[i].fullName;

            cardBody.appendChild(parkName);

            if (data[i].images) {
                let parkLocation = document.createElement('p');
                parkLocation.classList.add('card-text');
                
                let img = document.createElement('img');
                img.classList.add('image');
                img.src = data[i].images[1].url;

                cardBody.style.backgroundImage = `url(${img.src})`;
                cardBody.style.backgroundSize = 'cover';
                cardBody.style.height = '300px';
            
            }
            else {
                let img = document.createElement('img');
                img.src = 'imgs/noImage.png';
                cardBody.appendChild(img);
            }


                let maps = document.createElement('a');
                maps.classList.add('addy', 'pt-3');
                maps.href = data[i].directionsUrl;
                maps.textContent = 'Address: ' + data[i].addresses[0].city + ', ' + data[i].addresses[0].stateCode + ', ' + data[i].addresses[0].postalCode + ', ' + data[i].addresses[0].countryCode;

                cardBody.appendChild(maps);
        
            
            let det = data[i].description;
            details = document.createElement('p');
            details.classList.add('det');
            details.textContent = det;


            let hover = document.createElement('div');
            let popUp = document.createElement('div');
            hover.classList.add('hover-container');
            popUp.classList.add('hover-box');
            hover.appendChild(popUp);
            popUp.appendChild(details);
            popUp.textContent = det;

            cardBody.appendChild(hover);

            let ratings = document.createElement('p');
            ratings.classList.add('stars');

            // ★
            let numStars = data[i].relevanceScore;
            numStars = Math.floor(numStars);
            
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
            

                ratings.textContent = 'No rating available';
            }
            cardBody.appendChild(ratings);

            card.appendChild(cardBody);
            col.appendChild(card);
            parksContainer1.appendChild(col);


            
            parkName.addEventListener('mouseenter', function() {
            popUp.style.opacity = '1'; 
            popUp.style.visibility = 'visible';
            });

            parkName.addEventListener('mouseleave', function() {
                popUp.style.opacity = '0';
                popUp.style.visibility = 'hidden';
            });
        }

        }
        catch (error) {
            console.log('Error: ', error);
        }

}

/*
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
}*/


__init__();
