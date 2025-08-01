import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../../screens/auth/Register";
import Home from "../../screens/Home";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";
import HeaderMenu from "./HeaderMenu";
import About from "../../screens/About";
import Post from "../../screens/Post";
import Account from "../../screens/Account";
import MyPosts from "../../screens/MyPosts";
const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  //Auth condition for (Authenticated user??)
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* condition to check if the authentication token is present or not */}
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
                title:"Full Stack App",
                headerRight:()=><HeaderMenu />
            }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{
                headerBackTitle:"Back",
                headerRight:()=><HeaderMenu />
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
                headerBackTitle:"Back",
                headerRight:()=><HeaderMenu />
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
                headerBackTitle:"Back",
                headerRight:()=><HeaderMenu />
            }}
          />
          <Stack.Screen
            name="MyPosts"
            component={MyPosts}
            options={{
                headerBackTitle:"Back",
                headerRight:()=><HeaderMenu />
            }}
          />
        </>
      ) : (
        // we use empty <> </> whenever we want to store multiple jsx components in javascript code
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
