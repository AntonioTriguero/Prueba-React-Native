import { useForm, Controller } from "react-hook-form";
import {
    StyleSheet,
    SafeAreaView,
    View,
    TextInput,
    Button,
    Dimensions,
    Text,
} from "react-native";
import { useState } from "react";
import { ControllerInput } from "./ControllerInput";
import { GenreSelect } from "./GenreSelect";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Formulario para añadir libro
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export function BooksForm() {
    //Formulario
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //Opciones de género
    const options = [
        { label: "Fantasia", value: "fantasia" },
        { label: "Ciencia Ficción", value: "cienciaFiccion" },
        { label: "Acción", value: "accion" },
        { label: "Terror", value: "terror" },
        { label: "Comedia", value: "comedia" },
        { label: "Romance", value: "romance" },
    ];

    //Submited data me sirve para hacer el fetch y crear el nuevo libro
    const [submittedData, setSubmittedData] = useState(null);

    const onSubmit = (data) => {
        // Simulate form submission
        console.log("Submitted Data:", data);
        setSubmittedData(data);
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ControllerInput ctrl={control} inputName={"title"}>
                    Título:
                </ControllerInput>
                <ControllerInput ctrl={control} inputName={"author"}>
                    Título:
                </ControllerInput>
                <ControllerInput ctrl={control} inputName={"pages"}>
                    Nº Páginas:
                </ControllerInput>
                <GenreSelect placeholder={{ label: "..." }} options={options}>
                    Género:
                </GenreSelect>

                <View style={styles.button}>
                    <Button
                        color={"#FFA43E"}
                        title="Crear"
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

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
