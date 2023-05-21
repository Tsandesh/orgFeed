import React from "react";
import voteico from "../../assets/uparrow.svg";
import commentico from "../../assets/comment.svg";
import { useNavigate } from "react-router-dom";

const Posts = ({
  post: { _id, title, email, description, status, priority, vote, comments },
}) => {
  const navigate = useNavigate();
  const postHandler = () => {
    localStorage.setItem("postID", _id);
    navigate("/postexplore");
  };

  return (
    <>
      <div
        className="flex flex-row w-full justify-between p-8 hover:scale-105 border rounded-2xl mt-4 shadow-md"
        onClick={() => postHandler()}
      >
        <div className="w-1/12 h-16 bg-[#fcfcfc]  rounded-md mr-4 justify-center">
          <img src={voteico} alt="voteicon" className="w-10" />
          <span className="p-2">{vote}</span>
        </div>
        <div className="w-10/12">
          <h1 className="font-semibold text-base">{title}</h1>{" "}
          <p className="text-sm opacity-60  ">{description}</p>
        </div>
        <div className="flex flex-row w-1/12">
          <img src={commentico} alt="commentico" className="w-4 h-4 mx-2" />
          <span className="text-sm">{comments.length}</span>
        </div>
      </div>
    </>
  );
};

export default Posts;
