function __init__() {
    getCoords();
}

async function getCoords() {
    let city = 'Asheville+NC';
    let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyCandeVGmVHVrQS03jzYu5y2h0UpA95KoQ`);
    data = await response.json();
    console.log(data.results[0].geometry.location);
    return data.results[0].geometry.location
}

__init__();