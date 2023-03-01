import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigateScreen();
    }, 2000);
  }, [navigation]);

  const navigateScreen = async () => {
    token = await AsyncStorage.getItem("token");
    console.log("token ", token);
    if (token == null) {
      navigation.replace("login");
    } else {
      navigation.replace("dashBoard");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Car Portal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    color: "orange",
  },
});

export default SplashScreen;
