import { StyleSheet, View } from "react-native";

export function Screen({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    backgroundColor: "#FEFFD2",
  },
});
