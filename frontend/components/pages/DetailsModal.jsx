import {
    Modal,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { useState, useEffect } from "react";
import axios from "axios";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Modal donde aparecen los detalles del libro
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export function DetailsModal({
    bookId,
    setBookId,
    modalVisible,
    setModalVisible,
}) {
    //Almacenamos los datos en book
    const [book, setBook] = useState({});

    const fetchApi = async () => {
        const res = await axios.get(`http://192.168.1.38:3000/books/` + bookId);
        setBook(res.data);
    };

    useEffect(() => {
        fetchApi();
    }, [bookId]);

    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                        setModalVisible(false);
                        setBookId();
                    }}
                >
                    <Icon color={"white"} name={"cross"} size={25} />
                </TouchableOpacity>
                <Image style={styles.image} source={{ uri: book.cover }} />
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.redText}>{book.author}</Text>
                <View style={styles.textContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.whiteText}>Páginas</Text>
                        <Text style={styles.redText}>{book.pages}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.whiteText}>Género</Text>
                        <Text style={styles.redText}>{book.genre}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height / 1.5,
        width: Dimensions.get("window").width / 1.4,
        position: "absolute",
        top: 155,
        left: 57,
        backgroundColor: "#FFA43E",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
    },
    touchable: { position: "relative", left: 110 },
    image: {
        borderWidth: 1,
        borderColor: "white",
        position: "relative",
        bottom: 20,
        width: 200,
        height: 300,
        objectFit: "fill",
        marginTop: 30,
    },
    title: { color: "white", fontWeight: "bold", fontSize: 20 },
    textContainer: { flexDirection: "row", gap: 80, marginTop: 15 },
    redText: { color: "#A1442D" },
    whiteText: { fontSize: 12, color: "white" },
    infoContainer: { alignItems: "center" },
});