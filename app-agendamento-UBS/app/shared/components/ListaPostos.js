import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { getLocalizacaoAtual } from "../../../helpers/getLocalizacaoAtual";
import { geocodeEndereco } from "../../../helpers/geocodeEndereco";
import { calcularDistancia } from "../../../helpers/calcularDistancia";

export default function ListaPostos({ onPressPosto }) {
  const [postos_saude, setPostos_saude] = useState([]);
  const [carregando, setCarregando] = useState(true); // estado de loading

  const buscarPostos = async () => {
    try {
      const localizacao = await getLocalizacaoAtual();
      const response = await fetch(
        "https://backend-app-agendamento-1.onrender.com/"
      );
      const data = await response.json();

      const dataComDistancia = await Promise.all(
        data.map(async (posto) => {
          const coordsPosto = await geocodeEndereco(posto.endereco);
          if (!coordsPosto) return { ...posto, distancia: null };

          const distancia = calcularDistancia(
            localizacao.latitude,
            localizacao.longitude,
            coordsPosto.latitude,
            coordsPosto.longitude
          );

          return {
            ...posto,
            distancia: distancia.toFixed(2),
          };
        })
      );
      const ordenado = dataComDistancia.sort(
        (a, b) => a.distancia - b.distancia
      );
      setPostos_saude(ordenado);
    } catch (error) {
      console.error("Erro ao buscar postos:", error.message);
    } finally {
      setCarregando(false); // loading finalizado
    }
  };

  useEffect(() => {
    buscarPostos();
  }, []);

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#016DFF" />
        <Text style={styles.loadingText}>
          Buscando postos de saúde próximos à você...
        </Text>
      </View>
    );
  }

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
            onPressPosto(item.id_posto_saude);
          }}
        >
          <View style={styles.listItem}>
            <View style={styles.circle}>
              <Image
                style={styles.icon}
                source={require("../../../assets/local-icon.png")}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.textItem}>
                {item.nome.length < 15
                  ? item.nome
                  : item.nome.substring(0, 15) + "..."}
              </Text>
              <Text style={styles.kmItem}>
                {item.distancia ? `${item.distancia} km` : "Distância..."}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    paddingVertical: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 12,
    color: "#808080",
  },
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
