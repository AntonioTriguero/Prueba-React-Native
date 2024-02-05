import { Text, StyleSheet } from "react-native";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Fondo naranja
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export function Background() {
    return <Text style={styles.background}></Text>;
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#FFA43E",
        width: "100%",
        height: 300,
        position: "absolute",
        zIndex: 0,
    },
});
