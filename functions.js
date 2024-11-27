async function __init__() {
    let {lat, lng} = await getCoords();
    // console.log(lat, lng);
    getParks(lat, lng);
    // console.log(test);

}

async function getCoords() {
    let location = 'Moab+UT';
    try {
        let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCmLL1N_bBudEjGSeDdYlqo0olQJ7r0ykc`);
        // let response = await fetch(`https://geocode.maps.co/search?q=${location}&api_key=674602f427fbe194124983rcya9edbe`);
        data = await response.json();
        // console.log(data.results);
        // console.log(data[0].lat);
        return {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng
            // lat: data[0].lat,
            // lng: data[0].lon
        };
    }
    catch (error) {
        console.log("Error: ", error);
    }
}

async function getParks(lat, lng) {

    console.log(lat, lng);

    try {
        // let response = await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&key=AIzaSyDp_BWGVtBDdliDAM-_YUe2HOX1lYHlpmo`);
        // let response = await fetch(`https://cors-anywhere.herokuapp.com/https://places.googleapis.com/v1/places/ChIJj61dQgK6j4AR4GeTYWZsKWw?fields=id,displayName&key=AIzaSyCmLL1N_bBudEjGSeDdYlqo0olQJ7r0ykc`);
        let response = await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=100000&type=natural_feature&key=AIzaSyCmLL1N_bBudEjGSeDdYlqo0olQJ7r0ykc`);
        // let rawData = await response.text();
        //console.log(rawData);

        // let getID = await fetch (`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-${lat},${lng}&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCmLL1N_bBudEjGSeDdYlqo0olQJ7r0ykc`);
        
        // let data = await getID.json();
        let data = await response.json();
        console.log(data);

        const places = data.results;
        const nextPageToken = data.next_page_token;
        places.forEach(place => {
            console.log('Name:', place.name);
            console.log('Location:', place.geometry.location);
            console.log('Icon:', place.icon);
            console.log('Business Status:', place.business_status);
            console.log('ID:', place.place_id);
            console.log('----------------------------------------');
        });
        if (nextPageToken) {
            console.log('Next page available. Use token:', nextPageToken);
            // You can use the next_page_token to fetch more places (make another API call).
        }

        
        // console.log(data.displayName.text);
        //const placeId = data.id;
        // let testy = await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyCmLL1N_bBudEjGSeDdYlqo0olQJ7r0ykc`);
        // let tester = await testy.json();
        // console.log(tester);
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


__init__();
