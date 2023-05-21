import { useEffect, useRef, useState } from "react";
import {
  getPostId,
  patchComment,
  postcomment,
  votePost,
} from "../axios/axiosBoard";
import { ToastContainer, toast } from "react-toastify";

const useComment = () => {
  const [post, setPost] = useState({});
  const [toggle, setToggle] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      return async () => {
        setIsLoading(true);
        const res = await getPostId(localStorage.getItem("postID"));
        if (res.status === 200) {
          // console.log(res.data.post);
          setPost(res.data.post);
          setToggleEdit(false);
          setLoading(false);
          setToggle(false);
          setIsLoading(false);
        }
      };
    } catch (err) {
      setLoading(true);
      setIsLoading(false);
      console.log(err.response);
    }
  }, [toggle]);

  const [comment, setComment] = useState();
  const [commentId, setCommentId] = useState("");
  // const [editComment, setEditComment] = useState(" ");
  const editComment = useRef(null);

  const commentPostHandler = async () => {
    try {
      const res = await postcomment({
        comment,
        post: localStorage.getItem("postID"),
      });
      toast.success(res.data.message);
      res.status == 200 && setToggle(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = async () => {
    try {
      // console.log(editComment.current);
      const res = await patchComment({
        id: commentId,
        comment: editComment.current,
      });
      // console.log(res.data.message);
      toast.success(res.data.message);
      setToggle(true);
    } catch (error) {
      console.log(error);
    }
  };

  const voteHandler = async () => {
    try {
      const id = localStorage.getItem("postID");
      const res = await votePost({ id });
      console.log(res.data);
      if (res.data?.message) {
        toast.success(res.data.message);
        setToggle(true);
      }
    } catch (error) {
      // console.log(error.response.data.error);
      console.log(error);
    }
  };
  return {
    post,
    setPost,
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
  };
};

export default useComment;
