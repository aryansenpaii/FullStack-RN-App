import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

// we are passing the props as arguments which are passed at the time of usage
const InputBox = ({
  inputTitle,
  autoComplete,
  keyboardType,
  secureTextEntry = false,//by default entry type is not a password
  value,
  setValue
}) => {
  return (
    <View>
      <Text>{inputTitle}</Text>
      <TextInput
        style={styles.inputBox}
        autoCorrect={false}
        //we type the prop name in values because we will assign values at the time of usage
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={
            (text) => setValue(text)
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: "#af9f85",
  },
});
export default InputBox;
