import { View, StyleSheet } from "react-native";
import { BookList } from "../BookList";
import Constants from "expo-constants";
import { Background } from "../Background";
import { Header } from "../Header";
import { useState } from "react";
import { DetailsModal } from "./DetailsModal";
import { DeleteModal } from "./DeleteModal";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Página principal
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export function HomePage() {
    //Visibilidad del modal de detalles
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [books, setBooks] = useState([]);
    const [bookId, setBookId] = useState(bookId);

    function deleteBook () {
        const filteredBooks = books.filter(
            (book) => book.id !== bookId
        );
        setBooks(filteredBooks);
    }

    return (
        <>
            <Background />
            <View style={styles.container}>
                <Header to={"/add"} iconName={"add-to-list"}>
                    {" "}
                    TUS LIBROS
                </Header>
                <BookList
                    books={books}
                    setBooks={setBooks}
                    setBookId={setBookId}
                    setModalVisible={setModalVisible}
                    setDeleteModal={setDeleteModal}
                />
            </View>
            <DetailsModal
                bookId={bookId}
                setBookId={setBookId}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            ></DetailsModal>
            <DeleteModal
                deleteBook={deleteBook}
                bookId={bookId}
                setBookId={setBookId}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
            ></DeleteModal>
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
});
