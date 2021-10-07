import { Observation } from "./ObsClass";
import { getDistance } from "./DistanceFunc";
import { idObject } from "./IDObject";

let obsArray = [];

function extractObservation(element, lat, lon) {
  let coordSplit = element.location.split(",");

  let thisLat = parseFloat(coordSplit[0]);
  let thisLon = parseFloat(coordSplit[1]);

  let trueDistance = getDistance(thisLat, thisLon, lat, lon);
  let preDistance = trueDistance.toString();
  let distance = parseFloat(preDistance.slice(0, 4)) + "mi";

  let thisObs = new Observation(
    element.taxon.name,
    element.taxon.preferred_common_name,
    element.place_guess,
    thisLat,
    thisLon,
    distance,
    element.uri,
    element.observation_photos[0].photo.url,
    element.created_at_details.date,
    trueDistance,
    element.id
  );

  if (!obsArray.includes(thisObs)) {
    obsArray.push(thisObs);
  }
}

export const getFile = async (latlon, type) => {
  obsArray = [];

  // console.log("getfile ", idObject[type].ids, type, latlon);

  // const response = await fetch(
  //   `https://cors.bridged.cc/https://api.inaturalist.org/v1/observations/?taxon_id=${idObject[type].ids}&quality_grade=research&captive=false&lat=${latlon[0]}&lng=${latlon[1]}&radius=24&per_page=200&acc_below=100&geoprivacy=open&photos=true`

  // );

  const url = `https://api.inaturalist.org/v1/observations/?taxon_id=${idObject[type].ids}&quality_grade=research&captive=false&lat=${latlon[0]}&lng=${latlon[1]}&radius=24&per_page=200&acc_below=100&geoprivacy=open&photos=true`;

  const response = await fetch(url);

  // console.log(response);

  const resultsObject = await response.json();

  // console.log(resultsObject);

  resultsObject.results.forEach((element) => {
    extractObservation(element, latlon[0], latlon[1]);
  });

  // console.log(obsArray);

  return obsArray;
};

export async function inputRelay(text) {
  // console.log("inputrelay called " + text);

  let geocodedInput;

  if (text != "") {
    let input = text;
    let queryInput = encodeURIComponent(input);
    let file = `https://nominatim.openstreetmap.org/search?format=json&q=${queryInput}`;
    // console.log(file);
    return await fetch(file)
      .then((response) => response.json())
      .then((data) => (geocodedInput = data[0]))
      //        .then(() => console.log(geocodedInput))
      .then(() => {
        return geocodedInput;
      });
  } else {
    return null;
  }
}
