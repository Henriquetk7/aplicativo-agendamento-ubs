import * as Location from "expo-location";
import { Alert } from "react-native";

export const getLocalizacaoAtual = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permissão negada", "Não foi possível acessar a localização.");
    return null;
  }

  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};
