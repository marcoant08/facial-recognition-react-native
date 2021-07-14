import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "45%",
    height: 170,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#ddd0d0d0",
    marginVertical: 10,
    marginHorizontal: "2%",
    justifyContent: "center",
    alignItems: "center",
  },

  photo: {
    width: "100%",
    height: "100%",
  },

  deleteContainer: {
    borderWidth: 1,
    borderColor: "#B12D19",
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    // marginTop: -200,
    // justifyContent: "center",
    // alignItems: "center",
    position: "absolute",
  },

  deleteIcon: {
    margin: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default styles;
