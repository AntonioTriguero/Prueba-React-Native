import { useForm} from "react-hook-form";
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

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Formulario para añadir libro
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export function EditBookForm({ editBook, id, payload, setPayload, book }) {
    const navigate = useNavigate();
    //Formulario
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
                    editValue={book.title}
                    ctrl={control}
                    inputName={"title"}
                >
                    Título:
                </ControllerInput>
                <ControllerInput
                    payload={payload}
                    setPayload={setPayload}
                    editValue={book.author}
                    ctrl={control}
                    inputName={"author"}
                >
                    Autor:
                </ControllerInput>
                <ControllerInput
                    payload={payload}
                    setPayload={setPayload}
                    editValue={`${book.pages}`}
                    ctrl={control}
                    inputName={"pages"}
                    keyboardType={"numeric"}
                >
                    Nº Páginas:
                </ControllerInput>
                <GenreSelect
                    payload={payload}
                    setPayload={setPayload}
                    placeholder={{ label: book.genre, key: "placeholder"}}
                    options={options}
                >
                    Género:
                </GenreSelect>

                <View style={styles.button}>
                    <Button
                        color={"#FFA43E"}
                        title="Editar"
                        onPress={() => handleSubmit(editBook())}
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
