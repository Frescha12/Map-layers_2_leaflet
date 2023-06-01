/*
var map = L.map('map').setView([52.518256, 13.392900], 11); // Koordinaten für den Mittelpunkt der Karte

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);


function markerCreation(latitude,longitude) {
    var marker = L.marker([latitude,longitude]).addTo(map);

    let number = Math.floor(Math.random() * (6) + 1);
    let picname = "images/" + number + ".jpg";



    let template2 = `
    <h3>Empire State Building</h3>
    <div style="text-align:center">
        <img id="picId" width="150" height="150" src="${picname}" >
    </div>
    `
    marker.bindPopup(template2);
}
*/

function dummyMarker() {
    let latitude = (Math.random() * (52.600000 - 52.400000) + 52.400000).toFixed(6);
    let longitude = (Math.random() * (13.600000 - 13.100000) + 13.100000).toFixed(6);

    //alert(latitude + "\n" + longitude);
    var marker = L.marker([latitude,longitude]).addTo(map);

    let number = Math.floor(Math.random() * (6) + 1);
    let picname = "images/" + number + ".jpg";



    let template2 = `
    <h3>Empire State Building</h3>
    <div style="text-align:center">
        <img id="picId" width="150" height="150" src="${picname}" >
    </div>
    `
    marker.bindPopup(template2);
}
