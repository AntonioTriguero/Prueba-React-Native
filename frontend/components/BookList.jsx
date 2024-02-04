import { useEffect, useState } from "react";
import {
    View,
    Image,
    Text,
    FlatList,
    SafeAreaView,
    Dimensions,
} from "react-native";
import axios from "axios";

export function BookList() {
    const [books, setBooks] = useState([]);

    const fetchApi = async () => {
        const res = await axios.get("http://192.168.1.38:3000/books");
        setBooks(res.data);
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const renderItem = ({ item }) => (
        <View
            style={{
                backgroundColor: "#A1442D",
                alignItems: "center",
                width: Dimensions.get("window").width / 2 - 20,
                height: 250,
                margin: 10,
                borderRadius: 20,
            }}
        >
            <Image
                source={{ uri: item.cover }}
                style={{
                    borderWidth: 1,
                    borderColor: "white",
                    position: "relative",
                    bottom: 20,
                    width: "80%",
                    height: 200,
                    objectFit: "fill",
                    marginTop: 10,
                }}
            />
            <View>
                <Text style= {{color: "white", fontWeight: "bold"}}>{item.title}</Text>
            </View>
        </View>
    );

    return (
        <>
            <SafeAreaView style={{ flex: 1, zIndex: 0 }}>
                <FlatList
                    data={books}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    style={{ paddingTop: 10 }}
                />
            </SafeAreaView>
        </>
    );
}
