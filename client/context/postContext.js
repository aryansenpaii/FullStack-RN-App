import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//context
const PostContext = createContext();

const PostProvider = ({ children }) => {
  //state
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  //get posts
  const getAllPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/post/get-all-posts");
      setLoading(false);
      setPosts(data?.posts);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //initial posts (calling the above function initially!)
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <PostContext.Provider value={[posts, setPosts,getAllPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
