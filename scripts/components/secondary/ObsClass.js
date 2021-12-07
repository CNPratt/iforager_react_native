export class Observation {
  constructor(
    name,
    species,
    genLocation,
    obsLat,
    obsLon,
    distance,
    url,
    image,
    createDate,
    trueDistance,
    trueID
  ) {
    this.name = name;
    this.species = species;
    this.genLocation = genLocation;
    this.obsLat = obsLat;
    this.obsLon = obsLon;
    this.distance = distance;
    this.url = url;
    this.image = image.replace("square", "original");
    this.createDate = createDate;
    this.trueDistance = trueDistance;
    this.trueID = trueID;
  }
}
