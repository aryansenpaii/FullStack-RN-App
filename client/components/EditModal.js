import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const EditModal = ({ modalVisible, setModalVisible, post }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  //handle post updation
  const updatePostHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/post/update-post/${id}`, {
        title,
        description,
      });
      setLoading(false);
      alert(data?.message);
      navigation.push("MyPosts")
    } catch (error) {
      setLoading(false);
      console.log(error);
      error;
    }
  };

  //initial post data
  useEffect(() => {
    setTitle(post?.title);
    setDescription(post?.description);
  }, [post]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* <Text>{JSON.stringify(post, null, 4)}</Text> */}
              <Text style={styles.modalText}>Update Your Post</Text>
              <Text>Title</Text>
              <TextInput
                style={styles.inputBox}
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                }}
              />
              <Text>Description</Text>
              <TextInput
                style={[styles.inputBox, { height: 100 }]}
                multiline={true}
                numberOfLines={4}
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                }}
              />
              <View style={styles.btnContainer}>
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    updatePostHandler(post && post?._id),
                      setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>{loading?"Please Wait":"Update"}</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputBox: {
    marginBottom: 20,
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    textAlignVertical: "top",
  },
  btnContainer: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "black",
    width: 100,
    margin: 10,
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default EditModal;
