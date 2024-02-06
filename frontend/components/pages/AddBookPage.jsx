import { Background } from "../Background";
import { Header } from "../Header";
import { View, StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import { AddBookForm } from "../form/AddBookForm";
import Icon from "react-native-vector-icons/Entypo";
import { useState } from "react";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Página de añadir libro
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export function AddBookPage() {
    const [payload, setPayload] = useState({});

    return (
        <>
            <Background />
            <View style={styles.container}>
                <Header to={"/"} iconName={"cross"}>
                    AÑADIR LIBRO
                </Header>
                <View style={styles.compContainer}>
                    <View style={styles.card}>
                        <Icon
                            style={styles.icon}
                            color={"white"}
                            name={"attachment"}
                            size={25}
                        />
                        {/*aqui hacer un image picker */}
                        <View style={styles.imgContainer}></View>
                        <AddBookForm></AddBookForm>
                    </View>
                </View>
            </View>
        </>
    );
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Estilos
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        marginTop: Constants.statusBarHeight,
        zIndex: 1,
    },
    compContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        height: Dimensions.get("window").height / 1.3,
        width: Dimensions.get("window").width / 1.4,
        backgroundColor: "#A1442D",
        borderRadius: 20,
        position: "relative",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 30,
    },
    icon: {
        position: "relative",
        bottom: 130,
    },
    imgContainer: {
        width: 200,
        height: 300,
        borderWidth: 1,
        borderColor: "white",
        position: "absolute",
        left: 40,
        top: -50,
    },
});
