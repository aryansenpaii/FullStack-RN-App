import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login = ({ navigation }) => {
  //global state
  const [state, setState] = useContext(AuthContext);
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //functions
  //button functions
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        setLoading(false);
        return Alert.alert("Please Fill All Fields!");
      }
      setLoading(false);
      const { data } = await axios.post(
        "/auth/login",
        { email, password }
      );

      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      navigation.navigate("Home");
      console.log("Login Data==>", { email, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
    //temp function to check local storage working or not (made using async storage)
    const getLocalStorage = async () => {
      let temp = await AsyncStorage.getItem("@auth");
      console.log("Local Storage==> ", temp);
    };
    getLocalStorage();
  };

  //function to clear async-storage (testing)!
  const clearLocalStorage = async () => {
    await AsyncStorage.clear();
    alert("Storage Cleared!!");
    let temp = await AsyncStorage.getItem("@auth");
    console.log("Local Storage==> ", temp);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox
          inputTitle={"E-MAIL"}
          keyboardType={"email-address"}
          autoComplete={"email"}
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"PASSWORD"}
          secureTextEntry={true}
          autoComplete={"password"}
          value={password}
          setValue={setPassword}
        />
      </View>
      <SubmitButton
        btnTitle={"Login"}
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Not a User?, Please{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          REGISTER
        </Text>
      </Text>
      {/* this is a test functionality to clear the phone's async storage */}
      <Text
        onPress={clearLocalStorage}
        style={[
          styles.linkText,
          { color: "blue", fontSize: 20, paddingTop: 150 },
        ]}
      >
        CLEAR_STORAGE(TESTING)
      </Text>
      {/* <Text>{JSON.stringify({name,email,password},null,4)}</Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e2225",
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: "#af9f85",
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "red",
  },
});

export default Login;
