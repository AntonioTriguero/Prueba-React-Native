import { View, Text } from "react-native";
import { BookList } from "../BookList";
import Icon from "react-native-vector-icons/Entypo";
import Constants from "expo-constants";

export function HomePage() {
    return (
        <>
            <Text
                style={{
                    backgroundColor: "#FFA43E",
                    width: "100%",
                    height: 300,
                    position: "absolute",
                    zIndex: 2,
                }}
            ></Text>
            <View
                style={{
                    flex: 1,
                    position: "relative",
                    marginTop: Constants.statusBarHeight,
                    zIndex: 1,
                }}
            >
                <Text
                    style={{
                        paddingVertical: 10,
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 30,
                    }}
                >
                    TUS LIBROS
                </Text>
                <Icon name="add-to-list" color={"white"} size={25} style={{position: "absolute", top: 20, left: 340}}/>
                <BookList />
            </View>
        </>
    );
}
