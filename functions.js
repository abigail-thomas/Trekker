async function __init__() {
    let {lat, lng} = await getCoords();
    console.log(lat, lng);
}

async function getCoords() {
    let location = 'Orlando+FL';
    // let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyCandeVGmVHVrQS03jzYu5y2h0UpA95KoQ`);
    let response = await fetch(`https://geocode.maps.co/search?q=${location}&api_key=674602f427fbe194124983rcya9edbe`);
    data = await response.json();
    //console.log(data.results[0].geometry.location);
    // console.log(data[0].lat);
    return {
        // lat: data.results[0].geometry.location.lat,
        // lng: data.results[0].geometry.location.lng
        lat: data[0].lat,
        lng: data[0].lon
    };
}



__init__();