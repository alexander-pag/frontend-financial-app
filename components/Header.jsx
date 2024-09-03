import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

const Header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require("../assets/dollar.png")} style={styles.logo} />
        <Text style={styles.title}>Cuentas Claras</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#FF7D29",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FF7D29",
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 20,
    color: "#FEFFD2",
  },
});

export default Header;
