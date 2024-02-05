import { View, StyleSheet } from "react-native";
import { BookList } from "../BookList";
import Constants from "expo-constants";
import { Background } from "../Background";
import { Header } from "../Header";
import { useState } from "react";
import { DetailsModal } from "./DetailsModal";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Página principal
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export function HomePage() {
    //Visibilidad del modal de detalles
    const [modalVisible, setModalVisible] = useState(false);
    const [bookId, setBookId] = useState(bookId);

    return (
        <>
            <Background />
            <View style={styles.container}>
                <Header to={"/add"} iconName={"add-to-list"}>
                    {" "}
                    TUS LIBROS
                </Header>
                <BookList
                    setBookId={setBookId}
                    setModalVisible={setModalVisible}
                />
            </View>
            <DetailsModal
                bookId={bookId}
                setBookId={setBookId}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            ></DetailsModal>
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
});
