import React from "react";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";
import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "./postsSlice";

const PostsLists = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const error = useSelector(getPostsError);
  const postsStatus = useSelector(getPostsStatus);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);


  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading...</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post}></PostsExcerpt>
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsLists;
