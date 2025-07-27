import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";
const MyPosts = () => {
  //state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();

  //get user posts
  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/get-user-posts");
      setLoading(false);
      setPosts(data?.userPosts);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };
  //initial call of the above function
  useEffect(()=>{
    getUserPosts();
  },[])
  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard posts={posts} myPostScreen={true}/>
        {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
        <FooterMenu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
export default MyPosts;
