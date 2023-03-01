import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native";
import { signInApi } from "../../firebaseFunctions/firebaseFunctions";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions/auth";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

function LoginScreen({ navigation }) {
  const [mail, setmail] = useState("");
  const [pass, setpass] = useState("");
  const [hide, setHide] = useState(true);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const managePasswordVisibility = () => {
    setHide(!hide);
  };

  const handlePress = async () => {
    Keyboard.dismiss();

    if (mail == "" && pass == "") {
      return Toast.show("email and Passowrd missing");
    }
    if (mail == "") {
      return Toast.show("Email field is required.");
    }
    if (pass == "") {
      return Toast.show("Password field is required.");
    } else if (mail && pass) {
      setVisible(true);
      await signInApi(mail, pass)
        .then(async (response) => {
          if (response.success == false) {
            setVisible(false);
            return Toast.show("Wrong Email password combination");
          }
          const token = response?.resp._tokenResponse.idToken;
          setVisible(false);
          if (token) {
            dispatch(loginSuccess(token));
            await AsyncStorage.setItem("token", token);
            setmail("");
            setpass("");
            navigation.replace("dashBoard");
          }
        })
        .catch((e) => {
          console.log("error:", e);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {/* <Image source={require("../../assets/logo.png")} style={styles.image} /> */}
        <View>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={{ marginTop: HEIGHT / 8 }}>
              <Text style={styles.login}>
                Welcome to
                <Text style={{ ...styles.login, color: "#f77219" }}>
                  {" "}
                  <Text style={{ ...styles.login, color: "#F76300" }}>Car</Text>
                  <Text style={{ ...styles.login, color: "#f77219" }}>
                    Portal
                  </Text>
                </Text>
              </Text>
            </View>
            <Text style={{ ...styles.login, color: "#F76300", fontSize: 30 }}>
              Log In
            </Text>

            <View style={{ ...styles.form, marginTop: HEIGHT / 15 }}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Email Address"
                value={mail}
                onChangeText={(text) => setmail(text)}
              />

              <View style={styles.passwordContainer}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderWidth: 0,
                    padding: 0,
                    width: "90%",
                    // marginTop: 2,
                  }}
                  placeholder="Password"
                  secureTextEntry={hide}
                  keyboardType="default"
                  value={pass}
                  onChangeText={(text) => setpass(text)}
                />

                <TouchableOpacity onPress={() => managePasswordVisibility()}>
                  <AntDesign
                    name={hide ? "eyeo" : "eye"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{ alignSelf: "flex-end", marginTop: 5 }}
                onPress={() => {}}
              >
                <Text style={{ fontWeight: "bold", color: "#F76300" }}>
                  Forgot Password ?
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  borderRadius: 14,
                  backgroundColor: "#c54f00",
                  padding: 16,
                  marginTop: "10%",
                  alignItems: "center",
                }}
              >
                {visible ? (
                  <ActivityIndicator
                    visible={visible}
                    color="#fff"
                    size="small"
                  />
                ) : (
                  <TouchableOpacity
                    style={{ width: "100%", alignItems: "center" }}
                    onPress={() => handlePress()}
                    activeOpacity={0.9}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      Log in
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.bottom}>
              <Text
                style={{
                  ...styles.login,
                  color: "#F76300",
                  marginHorizontal: 15,
                  fontSize: 16,
                }}
              >
                Don't have an account?
              </Text>
              <Text
                onPress={() => navigation.replace("signup")}
                style={{
                  ...styles.login,
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Sign Up
              </Text>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
    flex: 1,
  },

  image: {
    height: HEIGHT / 8,
    width: WIDTH / 3.3,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 30,
  },
  login: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5B5B5B",
    alignSelf: "center",
    marginTop: 20,
  },
  input: {
    fontSize: 14,
    padding: 16,
    borderRadius: 14,
    borderColor: "#A3A4AA",
    borderWidth: 0.5,
    // marginTop: "6.5%",
  },
  form: {
    marginHorizontal: "5%",
    marginTop: "6%",
  },
  bottom: {
    justifyContent: "center",
    flexDirection: "row",
  },
  passwordContainer: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#A3A4AA",
    paddingHorizontal: 20,
    marginTop: 20,
    borderWidth: 0.5,
  },
});

export default LoginScreen;
