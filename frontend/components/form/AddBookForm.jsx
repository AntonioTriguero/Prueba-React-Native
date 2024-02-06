import { useForm } from "react-hook-form";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Button,
    Dimensions,
} from "react-native";
import { ControllerInput } from "./ControllerInput";
import { GenreSelect } from "./GenreSelect";
import { useNavigate } from "react-router-native";
import axios from "axios";
import * as FileSystem from "expo-file-system";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Formulario para añadir libro
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export function AddBookForm({ payload, setPayload }) {
    const navigate = useNavigate();

    //Formulario
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const showAlert = () => {
        Alert.alert(
            "Título de la Alerta",
            "Contenido de la Alerta",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Aceptar",
                    onPress: () => console.log("Aceptar presionado"),
                },
            ],
            { cancelable: false }
        );
    };

    const fetchApi = async () => {
        const fileUri = payload.cover;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        if (!fileInfo.exists) {
            throw new Error("El archivo no existe.");
        }

        const fileExtension = fileInfo.uri.split(".").pop(); // Obtenemos la extensión del archivo
        const fileType = `image/${fileExtension}`; // Establecemos el tipo de archivo

        const formData = new FormData();
        formData.append("title", payload.title);
        formData.append("author", payload.author);
        formData.append("genre", payload.genre);
        formData.append("pages", payload.pages);
        formData.append("cover", {
            uri: fileUri,
            name: `cover.${fileExtension}`,
            type: fileType,
        });

        if (
            formData.title == "undefined" ||
            formData.author == "undefined" ||
            formData.pages == "undefined" ||
            formData.genre == "undefined"
        ) {
            showAlert();
        } else {
            await axios.post(`http://192.168.1.38:3000/books`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/");
        }
    };

    //Opciones de género
    const options = [
        { label: "Fantasia", value: "Fantasia", key: "f" },
        { label: "Ciencia Ficción", value: "Ciencia Ficción", key: "cf" },
        { label: "Acción", value: "Acción", key: "a" },
        { label: "Terror", value: "Terror", key: "t" },
        { label: "Comedia", value: "Comedia", key: "c" },
        { label: "Romance", value: "Romance", key: "r" },
    ];

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ControllerInput
                    payload={payload}
                    setPayload={setPayload}
                    ctrl={control}
                    inputName={"title"}
                >
                    Título:
                </ControllerInput>
                <ControllerInput
                    payload={payload}
                    setPayload={setPayload}
                    ctrl={control}
                    inputName={"author"}
                >
                    Autor:
                </ControllerInput>
                <ControllerInput
                    payload={payload}
                    setPayload={setPayload}
                    ctrl={control}
                    inputName={"pages"}
                    keyboardType={"numeric"}
                >
                    Nº Páginas:
                </ControllerInput>
                <GenreSelect
                    payload={payload}
                    setPayload={setPayload}
                    placeholder={{ label: "...", key: "placeholder" }}
                    options={options}
                >
                    Género:
                </GenreSelect>

                <View style={styles.button}>
                    <Button
                        onPress={() => handleSubmit(fetchApi())}
                        color={"#FFA43E"}
                        title="Crear"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Estilos
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height / 2.7,
        width: Dimensions.get("window").width / 1.7,
        padding: 10,
        marginBottom: 55,
        borderRadius: 20,
    },
    button: { width: 100, marginLeft: 50 },
});
