import { Text, StyleSheet, View } from "react-native";
import { Link } from "react-router-native";
import Icon from "react-native-vector-icons/Entypo";

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Título mas icono de arriba
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


export function Header({ to, iconName, children }) {
    return (
        <View>
            <Text style={styles.title}>{children}</Text>

            <Link to= {to} style={styles.icon}>
                <Icon color= {"white"}name={iconName} size={25} />
            </Link>
        </View>
    );
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Estilos
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


const styles = StyleSheet.create({
    title: {
        paddingVertical: 10,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 30,
    },
    icon: {
        position: "absolute",
        top: 20,
        left: 340,
        color: "white",
    },
});
