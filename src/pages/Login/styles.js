import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#f00",
    fontWeight: "bold",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#f00",
    width: "80%",
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
});

export default styles;
