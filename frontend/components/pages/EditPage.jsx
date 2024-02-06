import { Background } from "../Background";
import { Header } from "../Header";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import Constants from "expo-constants";
import { EditBookForm } from "../form/EditBookForm";
import Icon from "react-native-vector-icons/Entypo";
import { useParams } from "react-router-native";
import { useState, useEffect } from "react";
import axios from "axios";

export function EditPage() {
    const { id } = useParams();
    const [book, setBook] = useState({});

    const fetchApi = async () => {
        const res = await axios.get(`http://192.168.1.38:3000/books/` + id);
        setBook(res.data);
    };

    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <>
            <Background />
            <View style={styles.container}>
                <Header to={"/"} iconName={"cross"}>
                    EDITAR LIBRO
                </Header>
                <View style={styles.compContainer}>
                    <View style={styles.card}>
                        {/*aqui hacer un image picker */}
                        <Image style= {styles.imgContainer}source={{ uri: book.cover }} />
                        <EditBookForm book={book}></EditBookForm>
                    </View>
                </View>
            </View>
        </>
    );
}

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
        height: 310,
        borderWidth: 1,
        borderColor: "white",
        position: "absolute",
        left: 40,
        top: -50,
    },
});
