import { Observation } from "../ObsClass";
import { getDistance } from "./DistanceFunc";
import { idObject } from "./IDObject";

// let obsArray = [];

function milesToKM(miles) {
  return miles * 1.60934;
}

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

  return thisObs;

  // if (!obsArray.includes(thisObs)) {
  //   obsArray.push(thisObs);
  // }
}

export const getFile = async (latlon, type, unfiltered, radius) => {
  let obsArray = [];
  let filterMode = "&quality_grade=research";

  if (unfiltered) {
    filterMode = "";
  }

  // console.log(radius);

  let url;

  if (idObject[type]) {
    url = `https://api.inaturalist.org/v1/observations/?taxon_id=${
      idObject[type].ids
    }${filterMode}&captive=false&lat=${latlon[0]}&lng=${
      latlon[1]
    }&radius=${milesToKM(
      radius
    )}&per_page=200&acc_below=100&geoprivacy=open&photos=true`;
  } else {
    url = `https://api.inaturalist.org/v1/observations/?taxon_id=${type}${filterMode}&captive=false&lat=${
      latlon[0]
    }&lng=${latlon[1]}&radius=${milesToKM(
      radius
    )}&per_page=200&acc_below=100&geoprivacy=open&photos=true`;
  }

  const response = await fetch(url);

  const resultsObject = await response.json();

  // console.log(resultsObject);

  if (resultsObject.results) {
    resultsObject.results.forEach((element) => {
      let thisObs = extractObservation(element, latlon[0], latlon[1]);

      if (!obsArray.includes(thisObs)) {
        obsArray.push(thisObs);
      }
    });
  }

  return obsArray;
};

export async function inputRelay(text) {
  let geocodedInput;

  if (text != "") {
    let input = text;
    let queryInput = encodeURIComponent(input);
    let file = `https://nominatim.openstreetmap.org/search?format=json&q=${queryInput}`;
    return await fetch(file)
      .then((response) => response.json())
      .then((data) => (geocodedInput = data[0]))
      .then(() => {
        return geocodedInput;
      });
  } else {
    return null;
  }
}
