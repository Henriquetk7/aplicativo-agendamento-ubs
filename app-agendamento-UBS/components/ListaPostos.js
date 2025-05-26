import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";

export default function ListaPostos({ onPressPosto }) {
  const [postos_saude, setPostos_saude] = useState([]);

  const buscarPostos = async () => {
    try {
      const response = await fetch("http://192.168.0.40:3000/");
      if (!response.ok) {
        throw new Error(`Erro na resposta: ${response.status}`);
      }
      const data = await response.json();
      setPostos_saude(data);
    } catch (error) {
      console.error("Erro ao buscar postos: ", error.message);
    }
  };

  useEffect(() => {
    buscarPostos();
  }, []);

  return (
    <FlatList
      data={postos_saude}
      keyExtractor={(item, index) => index.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            console.log("Clicou no posto com ID:", item.id_posto_saude);
            onPressPosto(item.id_posto_saude);
          }}
        >
          <View style={styles.listItem}>
            <View style={styles.circle}>
              <Image
                style={styles.icon}
                source={require("../assets/local-icon.png")}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.textItem}>
                {item.nome.length < 20
                  ? item.nome
                  : item.nome.substring(0, 20) + "..."}
              </Text>
              <Text style={styles.kmItem}>0 Km</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },

  listItem: {
    padding: 12,
    backgroundColor: "#fff",
    height: 128,
    width: 120,
    borderRadius: 16,
    justifyContent: "center",
    gap: 8,
  },

  circle: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: "#016DFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 16,
    height: 16,
  },

  item: {
    gap: 4,
  },
  textItem: {
    fontSize: 12,
  },
  kmItem: {
    fontSize: 10,
    color: "#808080",
  },
});
