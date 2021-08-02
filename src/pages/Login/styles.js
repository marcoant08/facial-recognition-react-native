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

  input: {
    backgroundColor: "#ddd",
    width: "80%",
    height: 60,
    margin: 4,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16
  },

  picker: {
    height: 50,
    width: "80%",
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "#ddd",
    marginHorizontal: 15
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

  buttonRegister: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5
  },

  buttonRegisterText: {
    fontSize: 16,
    color: "#f00",
  },
});

export default styles;
