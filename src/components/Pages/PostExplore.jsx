import React, { useRef } from "react";
import Dashboard from "../Dashboard";
import { ToastContainer, toast } from "react-toastify";
import DeleteComment from "../Modals/DeleteComment";
import moment from "moment";
import voteico from "../../assets/uparrow.svg";
import commentico from "../../assets/comment.svg";
import avatar_man from "../../assets/avatar_man.svg";
import useComment from "../../hooks/useComment";
import ReactLoading from "../Shared/ReactLoading";

const PostExplore = () => {
  const {
    post,
    comment,
    setComment,
    commentId,
    setCommentId,
    editComment,
    toggleEdit,
    setToggleEdit,
    commentPostHandler,
    handleEditComment,
    voteHandler,
    toast,
    isLoading,
    loading,
  } = useComment();
  return (
    <Dashboard>
      <ToastContainer theme="colored" autoClose={3000} />
      {loading ? (
        <div className="flex justify-center items-center w-full h-[80vh]">
          <ReactLoading />
        </div>
      ) : (
        <div className="w-screen flex justify-center bg-[#f5f5f5]">
          <div className="w-5/6 flex flex-row bg-white p-8 border rounded-2xl mt-4 shadow-md">
            <div className="w-1/12 h-16 bg-[#fcfcfc]  rounded-md mr-4 justify-center">
              {" "}
              <img
                src={voteico}
                alt="voteicon"
                className="w-8 hover:scale-125"
                onClick={() => voteHandler()}
              />
              <p className="ml-2 text-sm font-bold">{post.vote}</p>
            </div>
            <div className="w-10/12">
              {" "}
              <div className="mb-8">
                <h1 className="font-semibold text-3xl">{post.title}</h1>{" "}
                <p className="text-sm font-normal italic">
                  created at {moment(post.createdAt ?? "").fromNow()}
                </p>
                <div className="flex flex-row mr-4 mt-4">
                  <h2 className="mr-1">Status :</h2>
                  {post.status == "open" ? (
                    <p className="badge bg-blue-300  text-[#141414] border-none font-normal px-4 py-3 mr-4">
                      {post.status ?? ""}
                    </p>
                  ) : post.status == "inProgress" ? (
                    <p className="badge bg-purple-300 font-normal text-[#141414] border-none px-4 py-3 mr-4">
                      {post.status ?? ""}
                    </p>
                  ) : (
                    <p className="badge bg-green-300 font-normal text-[#141414] border-none px-4 py-3 mr-4">
                      {post.status ?? ""}
                    </p>
                  )}

                  <h2 className="mr-1">Priority :</h2>
                  {post.priority == "low" ? (
                    <p className="badge bg-gray-300 font-normal text-[#141414] border-none px-4 py-3 mr-4">
                      {post.priority ?? ""}
                    </p>
                  ) : post.priority == "medium" ? (
                    <p className="badge bg-yellow-300 font-normal text-[#141414] border-none px-4 py-3 mr-4">
                      {post.priority ?? ""}
                    </p>
                  ) : (
                    <p className="badge bg-red-300 font-normal text-[#141414] border-none px-4 py-3 mr-4">
                      {post.priority ?? ""}
                    </p>
                  )}
                </div>
                <p className="opacity-80 mt-8 ">{post.description ?? ""}</p>
              </div>{" "}
              <p className="text-2xl mb-2"> Comment Here</p>{" "}
              <div>
                <textarea
                  name=""
                  id=""
                  rows="8"
                  className="border w-full mb-0 p-4"
                  placeholder="Share Your Thoughts Here"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  value={comment}
                ></textarea>
                <div className="mt-0 flex justify-end">
                  <button
                    className="btn"
                    onClick={() => {
                      commentPostHandler();
                      setComment("");
                    }}
                    disabled={isLoading}
                  >
                    {" "}
                    Comment
                  </button>
                </div>
              </div>
              <div>
                <div className="flex flex-row mb-4">
                  <h1 className="text-2xl">Comments </h1>
                  <img src={commentico} alt="" className="ml-4 w-8" />
                </div>

                <hr />
                {post.comments?.length > 0
                  ? post.comments.map((comment) => (
                      <div className="flex flex-row mt-4">
                        <div className="w-1/12 ">
                          {" "}
                          <img
                            // src={comment.createdBy.avatar}
                            src={avatar_man}
                            alt="profile"
                            className="border rounded-full w-12"
                          />
                        </div>
                        <div className="w-10/12 ml-4">
                          {" "}
                          <p className="text-xs font-bold">
                            {comment.createdBy.username}
                            <span className="text-slate-400 font-normal ml-2">
                              {moment(comment.createdAt).fromNow()}
                            </span>
                          </p>
                          <div className="flex justify-between">
                            {comment._id == commentId && toggleEdit ? (
                              <div>
                                <input
                                  size={80}
                                  onChange={(e) =>
                                    (editComment.current = e.target.value)
                                  }
                                  className="border-[1px] rounded-md p-2 border-slate-600"
                                  defaultValue={editComment.current}
                                />
                                <br />
                                <button
                                  className="bg-black text-white border-none mt-2 rounded-md py-1 px-4"
                                  onClick={() => {
                                    setToggleEdit(false);
                                    handleEditComment(comment._id);
                                  }}
                                >
                                  Done
                                </button>
                              </div>
                            ) : (
                              <p className="font-normal">{comment.comment}</p>
                            )}

                            <div className="dropdown dropdown-end">
                              <label tabIndex={0} className="m-1">
                                ⛓️
                              </label>
                              <ul
                                tabIndex={0}
                                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36 "
                              >
                                <li
                                  onClick={() => {
                                    setToggleEdit(true);
                                    setCommentId(comment._id);
                                    editComment.current = comment.comment;
                                  }}
                                >
                                  <a>⚒️ Edit</a>
                                </li>
                                <li
                                  onClick={() => {
                                    setCommentId(comment._id);
                                    localStorage.setItem(
                                      "commentID",
                                      commentId
                                    );
                                  }}
                                >
                                  <a href="#deleteComment">🗑️ Delete</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : "NO comments till now"}
              </div>
            </div>
          </div>
        </div>
      )}

      <DeleteComment id={commentId} />
    </Dashboard>
  );
};

export default PostExplore;
