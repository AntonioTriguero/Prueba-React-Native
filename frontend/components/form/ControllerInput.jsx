import { Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Inputs del formulario de añadir libro
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export function ControllerInput({ editValue, ctrl, inputName, children }) {
    return (
        <>
            <Text style={styles.text}>{children}</Text>
            <Controller
                control={ctrl}
                render={({ field }) => (
                    <TextInput
                        defaultValue={editValue}
                        {...field}
                        style={styles.textInput}
                    />
                )}
                name={inputName}
                rules={{ required: "Este campo es obligatorio" }}
            />
        </>
    );
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Estilos
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

const styles = StyleSheet.create({
    text: { color: "#FFA43E", fontWeight: "bold" },
    textInput: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 5,
        marginVertical: 5,
    },
});
