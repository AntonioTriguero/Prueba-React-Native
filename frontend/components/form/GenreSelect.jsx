import { Text, View, StyleSheet } from "react-native";
import  PickerSelect  from "react-native-picker-select";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Select options
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export function GenreSelect({payload, setPayload, options, placeholder, children}) {
    return (
        <>
            <Text style={styles.text}>{children}</Text>
            <View style={styles.container}>
                <PickerSelect
                    onValueChange={(value) => {
                        setPayload({...payload, genre: value})
                    }}
                    placeholder={placeholder}
                    items={options}
                />
            </View>
        </>
    );
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Estilos
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


const styles = StyleSheet.create({
    text: { color: "#FFA43E", fontWeight: "bold" },
    container: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 5,
        marginVertical: 5,
        height: 38,
        justifyContent: "center",
        marginBottom: 15,
    },
});
