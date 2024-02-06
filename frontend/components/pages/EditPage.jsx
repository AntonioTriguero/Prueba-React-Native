import { Background } from "../Background";
import { Header } from "../Header";
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
} from "react-native";
import Constants from "expo-constants";
import { EditBookForm } from "../form/EditBookForm";
import { useParams } from "react-router-native";
import { useState, useEffect } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useNavigate } from "react-router-native";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Página para editar el libro
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export function EditPage() {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [payload, setPayload] = useState({});
    const [imagePicked, setImagePicked] = useState(imagePicked);
    const navigate = useNavigate();

    //Fetch para recoger los datos actuales
    const fetchApi = async () => {
        const res = await axios.get(`http://192.168.1.38:3000/books/` + id);

        setBook(res.data);
        setImagePicked(res.data.cover);
        setPayload({
            ...payload,
            title: res.data.title,
            author: res.data.author,
            pages: res.data.pages,
            genre: res.data.genre,
        });
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImagePicked(result.assets[0].uri);

            const fileUri = result.assets[0].uri;
            const fileInfo = await FileSystem.getInfoAsync(fileUri);

            if (!fileInfo.exists) {
                throw new Error("El archivo no existe.");
            }

            const fileExtension = fileInfo.uri.split(".").pop(); // Obtenemos la extensión del archivo
            const fileType = `image/${fileExtension}`; // Establecemos el tipo de archivo
            setPayload({
                ...payload,
                cover: {
                    uri: fileUri,
                    name: `cover.${fileExtension}`,
                    type: fileType,
                },
            });
        }
    };

    const editBook = async () => {
        const formData = new FormData();
        formData.append("title", payload.title);
        formData.append("author", payload.author);
        formData.append("genre", payload.genre);
        formData.append("pages", payload.pages);
        formData.append("cover", payload.cover);


        await axios.put(`http://192.168.1.38:3000/books/` + id, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        navigate("/");
    };

    return (
        <>
            <Background />
            <View style={styles.container}>
                <Header to={"/"} iconName={"cross"}>
                    EDITAR LIBRO
                </Header>
                <View style={styles.compContainer}>
                    <View style={styles.card}>
                        <TouchableOpacity
                            onPress={() => {
                                pickImage();
                            }}
                        >
                            <Image
                                style={styles.imgContainer}
                                source={{ uri: imagePicked }}
                            />
                        </TouchableOpacity>
                        <EditBookForm
                            editBook={editBook}
                            id={id}
                            payload={payload}
                            setPayload={setPayload}
                            book={book}
                        ></EditBookForm>
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
        height: 310,
        borderWidth: 1,
        borderColor: "white",
        position: "absolute",
        left: 40,
        top: -50,
    },
});
