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
  card: {
    backgroundColor: "#f8ecdb",
    borderStyle: "solid",
    borderColor: "#575046",
    borderWidth: 3,
  },
  cardContainerStyle: {
    flex: 1,
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "#575046",
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
  },
  flatlist: {
    borderStyle: "solid",
    borderColor: "#575046",
    borderWidth: 3,
    borderRadius: 5,
    backgroundColor: "#AFA392",
  },
  mapContainer: {
    padding: 20,
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
});
