import { Observation } from "../components/secondary/ObsClass";
import { getDistance } from "./DistanceFunc";
import { idObject } from "../data/IDObject";
import * as Location from "expo-location";
// let obsArray = [];

let idRegex = /^[-,0-9]+$/;

function milesToKM(miles) {
  return miles * 1.60934;
}

function extractObservation(element, lat, lon) {
  let coordSplit = element.location.split(",");

  let thisLat = parseFloat(coordSplit[0]);
  let thisLon = parseFloat(coordSplit[1]);

  let trueDistance = getDistance(thisLat, thisLon, lat, lon);
  // let preDistance = trueDistance.toString();
  // let distance = parseFloat(preDistance.slice(0, 4)) + "mi";

  let thisObs = new Observation(
    element.taxon.name,
    element.taxon.preferred_common_name,
    element.place_guess,
    thisLat,
    thisLon,
    trueDistance,
    element.uri,
    element.observation_photos[0].photo.url,
    element.created_at_details.date,
    trueDistance,
    element.id
  );

  // console.log(thisObs);
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
  // let geocodedInput;

  if (text != "") {
    try {
      let geocoder = await Location.geocodeAsync(text);

      // console.log(geocoder);

      return geocoder[0];
    } catch (e) {
      return e;
    }
  } else {
    return null;
  }
}

export async function taxaSearch(input) {
  let encoded = encodeURI(input);

  console.log(encoded);

  let url;

  if (idRegex.test(input)) {
    url = `https://api.inaturalist.org/v1/taxa/${encoded}`;
  } else {
    url = `https://api.inaturalist.org/v1/taxa?q=${encoded}`;
  }
  let response = await fetch(url);
  let parsed = await response.json();

  // parsed.results.forEach((result) => console.log(result.preferred_common_name));

  let extractedResults = [];

  parsed.results.forEach((result) =>
    extractedResults.push({
      name: result.name,
      commonName: result.preferred_common_name,
      taxonId: result.id,
      rank: result.rank,
    })
  );

  console.log(parsed.results[0]);

  return extractedResults;
}
