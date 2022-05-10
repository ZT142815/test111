import React from "react";
import { useSelector } from "react-redux";
import PostList from "./postList";
import AddPostList from "./addPostList";
import "./index.less";
const Posts = () => {

  return (
    <div>
        <AddPostList />
        <PostList />
    </div>
  );
};

export default Posts;
