import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    minHeight: 90,
    width: "100%",
    backgroundColor: "#f00",
  },

  content: {
    paddingTop: 60,
    marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 15,
  },

  headerText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
