import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
//context
const AuthContext = createContext();

//context provider
const AuthProvider = ({ children }) => {
  //global state
  const [state,setState] = useState({
    user: null,
    token: "",
  });

  //default axios setting
    //for sending authorization token when updating account
  axios.defaults.headers.common["Authorization"]=`Bearer ${state?.token}`
    //for every routing purpose
  axios.defaults.baseURL="http://192.168.1.4:8080/api/v1"

  //initial local storage data
  useEffect(() => {
    const loadLocalStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);
      //destructuring the state into user and token (if present)
      setState({ ...state, user: loginData?.user, token: loginData?.token });
    };
    loadLocalStorageData();
  }, []); //dependencies are left empty.(we don't need them here)
  
  return (
    <AuthContext.Provider value={[state,setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext,AuthProvider};