import {
    Modal,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from "react-native";
import axios from "axios";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
// Modal para eliminar libro
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export function DeleteModal({
    deleteBook,
    bookId,
    setBookId,
    deleteModal,
    setDeleteModal,
}) {
    const fetchApi = async () => {
        try {
            await axios.delete(`http://192.168.1.38:3000/books/` + bookId);
            console.log("Eliminación exitosa");
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    return (
        <Modal animationType="fade" transparent={true} visible={deleteModal}>
            <View style={styles.container}>
                <Text style={styles.title}>¿Estás seguro?</Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.acceptButton}
                        onPress={() => {
                            fetchApi();
                            deleteBook(bookId);
                            setBookId();
                            setDeleteModal(false);
                        }}
                    >
                        <Text style={styles.accept}>Eliminar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => {
                            setDeleteModal(false);
                            setBookId();
                        }}
                    >
                        <Text style={styles.cancel}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Estilos
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height / 5,
        width: Dimensions.get("window").width / 1.4,
        position: "absolute",
        top: 300,
        left: 57,
        backgroundColor: "#FFA43E",
        borderRadius: 20,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
    },
    title: { color: "white", fontWeight: "bold", fontSize: 20 },
    btnContainer: {
        flexDirection: "row",
        gap: 30,
    },
    acceptButton: {
        padding: 5,
        backgroundColor: "#A1442D",
        width: 100,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    cancelButton: {
        padding: 5,
        borderWidth: 2,
        borderColor: "#A1442D",
        width: 100,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    accept: { fontSize: 15, color: "white" },
    cancel: { fontSize: 15, color: "#A1442D" },
});
