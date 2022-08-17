import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";
import React from "react";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😳",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const ReactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <div>{ReactionButtons}</div>;
};

export default ReactionButtons;
