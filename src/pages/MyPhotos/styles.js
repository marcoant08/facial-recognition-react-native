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

    photosContainer: {
        flexDirection: "row",
    },

    photo: {
        width: 100,
        height: 100,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#000",
        marginVertical: 30,
        marginHorizontal: 5
    },

    avatar: {
        width: 200,
        height: 200,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#000",
        marginVertical: 30,
    },
});

export default styles;
