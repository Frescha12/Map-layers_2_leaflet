
const AWS = require('aws-sdk');

const bucketName = 'wolowo-filip';

const objectName = 'tour.xml';

var map = L.map('map').setView([52.518256, 13.392900], 11); // Koordinaten für den Mittelpunkt der Karte

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Konfigurieren der AWS-Zugangsdaten
AWS.config.update({
    accessKeyId: 'AKIASKLN463ENM63TFRK',
    secretAccessKey: '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'
});

let continuationToken = undefined; // Initialisierung des Continuation Tokens

async function getObjectsWithName(bucketName, objectName) {
    //alert("klappt");
    const s3 = new AWS.S3();
    do {
        try {
            const response = await s3.listObjectsV2({
                Bucket: bucketName,
                ContinuationToken: continuationToken // Setzen Sie den Continuation Token für den nächsten API-Aufruf
            }).promise();

            for (const obj of response.Contents) {
                if (obj.Key.endsWith(objectName)) {
                    console.log(`Found object: s3://${bucketName}/${obj.Key}`);
                    await searchForLatLng(obj);
                }
            }

            // Überprüfen Sie, ob ein Continuation Token in der Antwort vorhanden ist
            continuationToken = response.NextContinuationToken;

        } catch (error) {
            console.error('Error retrieving objects:', error);
            break; // Beenden Sie die Schleife im Falle eines Fehlers
        }

    } while (continuationToken);
}

getObjectsWithName(bucketName, objectName);

const fs = require('fs');
const xml2js = require('xml2js');

//XML_Handling
async function searchForLatLng(xml) {
    try {
// XML-Datei einlesen
    const xmlData = await downloadXmlFile(xml.Key);

// XML zu JSON konvertieren
    const parser = new xml2js.Parser();
    parser.parseString(xmlData, (err, result) => {
        if (err) {
            console.error('Fehler beim Parsen der XML-Datei:', err);
            return;
        }

        // Gewünschte Elemente suchen und auslesen
        const scenes = result.krpano.scene;
        scenes.forEach((scene) => {
            const lat = scene.$.lat;
            const lng = scene.$.lng;
            markerCreation(lat,lng);
            console.log('lat:', lat);
            console.log('lng:', lng);
        });
    });
    } catch (error) {
        console.error('Fehler beim Verarbeiten der XML-Datei:', error);
    }
}

async function downloadXmlFile(key) {
    const s3 = new AWS.S3();
    const params = {
        Bucket: bucketName,
        Key: key
    };
    const data = await s3.getObject(params).promise();
    return data.Body.toString();
}

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