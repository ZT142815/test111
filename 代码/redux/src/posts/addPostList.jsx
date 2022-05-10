import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { actions } from "./reducer";

const AddPostList = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };
  const onContentChanged = (e) => {
    setContent(e.target.value);
  };
  const onSave = () => {
    if (title !== "" && content !== "") {
      const newData = {
        id: nanoid(),
        title,
        content,
      };
      dispatch(actions.addPost(newData));
      setTitle("");
      setContent("");
    }
  };
  return (
    <section>
      <h2>新建Post</h2>
      <form>
        <label htmlFor="postTitle">标题:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">内容:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSave}>
          保存
        </button>
      </form>
    </section>
  );
};

export default AddPostList;
