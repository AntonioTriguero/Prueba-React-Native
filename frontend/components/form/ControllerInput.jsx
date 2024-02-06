import { Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Inputs del formulario de añadir libro
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export function ControllerInput({
    payload,
    setPayload,
    editValue,
    ctrl,
    inputName,
    children,
    keyboardType,
}) {
    return (
        <>
            <Text style={styles.text}>{children}</Text>
            <Controller
                control={ctrl}
                render={({ field }) => (
                    <TextInput
                        autoFocus={false}
                        keyboardType={keyboardType}
                        onChangeText={(text) => {
                            setPayload({ ...payload, [inputName]: text });
                        }}
                        defaultValue={editValue}
                        {...field}
                        style={styles.textInput}
                        rules={{ required: "Este campo es obligatorio" }}
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
