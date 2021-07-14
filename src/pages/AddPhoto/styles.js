import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-evenly",
  },

  text: {
    color: "#f00",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#f00",
    width: "85%",
    height: 60,
    margin: 4,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  photoContainer: {
    width: "85%",
    height: 300,
    borderRadius: 15,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    overflow: "hidden",
  },

  photo: {
    width: "100%",
    height: "100%",
  },

  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
    height: 70,
    marginVertical: 10,
  },

  loaderContainer: {
    borderWidth: 0.5,
    borderColor: "#555",
    borderRadius: 8,
    height: 30,
    width: "80%",
    overflow: "hidden",
    marginRight: 20,
  },

  loaderContent: {
    borderRadius: 8,
    backgroundColor: "#f00",
    height: "100%",
  },
});

export default styles;
