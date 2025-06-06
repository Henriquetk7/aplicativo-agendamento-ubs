import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function Ajuda({ title, content }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
        <Image
          style={styles.goBackIcon}
          source={require("../../assets/arrow-right.png")}
        />
      </TouchableOpacity>

      <Text style={styles.titleFaq}>{title}</Text>
      <Text style={styles.contentFaq}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  goBackIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
    position: "relative",
    right: 6,
  },
  titleFaq: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
  },
  contentFaq: {
    fontSize: 14,
    marginTop: 16,
  },
});
