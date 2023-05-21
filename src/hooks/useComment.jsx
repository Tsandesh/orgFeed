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
      toast.error(err.response);
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
      toast.error(error);
    }
  };

  const handleEditComment = async () => {
    try {
      const res = await patchComment({
        id: commentId,
        comment: editComment.current,
      });

      toast.success(res.data.message);
      setToggle(true);
    } catch (error) {
      toast.error(error);
    }
  };

  const voteHandler = async () => {
    try {
      const id = localStorage.getItem("postID");
      const res = await votePost({ id });

      if (res.data?.message) {
        toast.success(res.data.message);
        setToggle(true);
      }
    } catch (error) {
      // console.log(error.response.data.error);
      toast.error(error);
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
