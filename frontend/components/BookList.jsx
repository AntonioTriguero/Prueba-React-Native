import { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    SafeAreaView,
    Dimensions,
    TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import { MotiView } from "moti";
import Icon from "react-native-vector-icons/Entypo";
import { DetailsModal } from "./pages/DetailsModal";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Lista de libros para la página principal
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export function BookList({ setBookId, setModalVisible }) {
    //Datos de los libros
    const [books, setBooks] = useState([]);

    //fetch a localhost:3000/books y guardamos la respuesta en books
    const fetchApi = async () => {
        const res = await axios.get("http://192.168.1.38:3000/books");
        setBooks(res.data);
    };

    useEffect(() => {
        fetchApi();
    }, []);

    //Creamos el render item para la FLatlist
    const renderItem = ({ item, index }) => (
        <MotiView
            style={styles.bookCard}
            from={{ opacity: 0, translateY: 45 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 200 + index * 200 }}
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    setModalVisible(true)
                    setBookId(item.id);
                }}
            >
                <Image source={{ uri: item.cover }} style={styles.image} />
            </TouchableWithoutFeedback>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>{item.title}</Text>
                <View
                    style={{
                        flexDirection: "row",
                        gap: 40,
                        padding: 5,
                        marginTop: 5,
                    }}
                >
                    <Icon color={"white"} name={"edit"} size={20} />
                    <Icon color={"white"} name={"trash"} size={20} />
                </View>
            </View>
        </MotiView>
    );

    //Renderizamos la flatlist
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={books}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}
            />
        </SafeAreaView>
    );
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Estilos
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0,
    },
    bookCard: {
        backgroundColor: "#A1442D",
        alignItems: "center",
        width: Dimensions.get("window").width / 2 - 20,
        height: 280,
        margin: 10,
        borderRadius: 20,
    },
    image: {
        borderWidth: 1,
        borderColor: "white",
        position: "relative",
        bottom: 20,
        width: "80%",
        height: 200,
        objectFit: "fill",
        marginTop: 10,
    },
    title: {
        color: "white",
        fontWeight: "bold",
    },
});
