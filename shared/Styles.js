import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "#8dc08d",
  },
  pageBackground: {
    backgroundColor: "#796d5b",
    flex: 1,
  },
  cardstackContainer: {
    flex: 1,
    padding: 5,
  },
  homeCardText: {
    margin: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f8ecdb",
    borderColor: "#575046",
    borderStyle: "solid",
    borderWidth: 3,
  },
  cardContainerStyle: {
    flex: 1,
    flexDirection: "row",
    borderStyle: "solid",
    // borderColor: "#575046",
    borderWidth: 3,
    padding: 0,
  },
  cardImg: {
    height: "100%",
    width: 100,
    alignContent: "flex-start",
  },
  mainCardBody: {
    flexDirection: "row",
    height: 100,
    // backgroundColor: "lightgrey",
    minWidth: "100%",
    maxWidth: "100%",
  },
  cardText: {
    fontSize: 12,
    alignSelf: "center",
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: "bold",
    // alignSelf: "center",
    textAlign: "center",
    paddingTop: 5,
    paddingHorizontal: 5,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
  cardLocation: {
    fontSize: 12,
    // alignSelf: "center",
    textAlign: "center",
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  cardSubheader: {
    fontSize: 16,
    fontStyle: "italic",
    // alignSelf: "center",
    textAlign: "center",
    paddingHorizontal: 0,
    paddingBottom: 5,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
  flatlist: {
    borderStyle: "solid",
    borderColor: "#575046",
    borderWidth: 3,
    borderRadius: 25,
    backgroundColor: "#AFA392",
  },
  mapContainer: {
    margin: 20,
    marginBottom: 5,
    backgroundColor: "#796d5b",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    borderStyle: "solid",
    borderColor: "#575046",
    borderWidth: 3,
    borderRadius: 25,
    flex: 1,
  },
  addressInput: {
    backgroundColor: "white",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  switch: {
    padding: 10,
  },
  swipeButtons: {
    marginRight: 20,
    marginTop: 12,
    // height: 106,
    backgroundColor: "#f8ecdb",
    borderStyle: "solid",
    borderColor: "#575046",
    borderWidth: 1,
    padding: 2,
  },
  swipeBtnText: {
    backgroundColor: "#f8ecdb",
    textAlign: "center",
    fontWeight: "bold",
  },
  stackicon: {
    marginLeft: 10,
    // color: "#575046",
    color: "#34302A",
  },
  taxaHeader: {
    fontSize: 36,
    fontWeight: "bold",
    // alignSelf: "center",
    textAlign: "center",
    paddingTop: 5,
    paddingHorizontal: 5,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
    margin: 10,
  },
});
