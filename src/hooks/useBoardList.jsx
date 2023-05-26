import { useEffect, useState } from "react";
import { getBoard, getPosts } from "../axios/axiosBoard";

const useBoardList = () => {
  const [posts, setPosts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBoards = async () => {
      setLoading(true);
      try {
        const res = await getPosts(localStorage.getItem("boardID"));
        if (res.status === 200) {
          console.log("woo2");
          setLoading(false);
          setPosts(res.data.posts);
          setToggle(false);
        }
      } catch (err) {
        setLoading(true);
      }
    };

    getBoards();
  }, [toggle]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(4);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentposts = posts.slice(firstPostIndex, lastPostIndex);

  return {
    posts,
    setPosts,
    toggle,
    setToggle,
    loading,
    setLoading,
    currentPage,
    setCurrentPage,
    postsPerPage,
    setPostPerPage,
    lastPostIndex,
    firstPostIndex,
    currentposts,
  };
};

export default useBoardList;
