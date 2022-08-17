import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
// import { nanoid } from "@reduxjs/toolkit";
// import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { addNewPost } from "./postsSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus,setAddRequestStatus]=useState('idle')

  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

const canSave=[title,content,userId].every(Boolean) && addRequestStatus==="idle"


  const onSavePostClicked = () => {
    if(canSave){
      try{
        setAddRequestStatus('pending')
        dispatch(addNewPost({title,body:content,userId})).unwrap()

        setTitle('')
        setContent('')
        setUserId('')

      }catch(err){
        console.error('failed to save the post',err)
      }finally{
        setAddRequestStatus('idle')
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a new Post</h2>
      <form action="">
        <label htmlFor="postTitle">Post title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          name="postAuthor"
          id="postAuthor"
          value={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChanged}
        ></textarea>
        <button type="button" onClick={onSavePostClicked}
        disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
