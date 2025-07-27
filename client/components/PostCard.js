import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import axios from "axios";
import {
  useNavigation,
  useNavigationContainerRef,
} from "@react-navigation/native";
import EditModal from "./EditModal";

const PostCard = ({ posts, myPostScreen }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});
  const handleDeletePrompt = (id) => {
    Alert.alert("Attention!", "Are you sure want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel press");
        },
      },
      {
        text: "Delete",
        onPress: () => handleDeletePost(id),
      },
    ]);
  };

  //delete user post data
  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };
  return (
    <View>
      <Text style={styles.heading}>Total Posts {posts?.length}</Text>
      {/* only render edit menu when myPosts screen is active */}
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {/* mapping every post data to cards */}
      {posts?.map((post, i) => (
        <View style={styles.card} key={i}>
          {/* only show delete and edit button on the myPosts screen */}
          {myPostScreen && (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ marginHorizontal: 20 }}>
                <FontAwesome5
                  size={16}
                  name="pen"
                  color={"dark blue"}
                  onPress={() => {setPost(post),setModalVisible(true)}}
                />{" "}
              </Text>
              <Text style={{ textAlign: "right" }}>
                <FontAwesome5
                  size={16}
                  name="trash"
                  color={"red"}
                  onPress={() => handleDeletePrompt(post?._id)}
                />{" "}
              </Text>
            </View>
          )}

          <Text style={styles.title}>Title: {post?.title}</Text>
          <Text style={styles.desc}>{post?.description}</Text>

          <View style={styles.footer}>
            {post?.postedBy?.name && (
              <Text>
                {" "}
                <FontAwesome5 name="user" color={"orange"} />{" "}
                {post?.postedBy?.name}
              </Text>
            )}

            <Text>
              {" "}
              <FontAwesome5 name="clock" color={"orange"} />{" "}
              {moment(post?.createdAt).format("DD-MM-YYYY HH:MM")}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 10,
    borderBottomWidth: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  desc: {
    marginTop: 10,
  },
});

export default PostCard;
