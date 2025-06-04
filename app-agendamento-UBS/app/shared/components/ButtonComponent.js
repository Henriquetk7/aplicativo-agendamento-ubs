import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function ButtonComponent({ onPress, title }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#016DFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 32,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
