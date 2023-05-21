import React, { useEffect, useState } from "react";
import CreatePost from "../board/CreatePost";
import { getPosts } from "../../axios/axiosBoard";
import Dashboard from "../Dashboard";
import Posts from "../board/Posts";
import ReactLoading from "../Shared/ReactLoading";

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      return async () => {
        const res = await getPosts(localStorage.getItem("boardID"));
        if (res.status === 200) {
          console.log("Posts retrive succesfully");
          setLoading(false);
          setPosts(res.data.posts);
          setToggle(false);
        }
      };
    } catch (err) {
      setLoading(true);
      console.log(err.response);
    }
  }, [toggle]);

  return (
    <Dashboard>
      <div className="my-4 flex flex-row bg-white w-full">
        <div className="mx-4 w-2/6">
          <CreatePost setToggle={setToggle} />
        </div>
        {loading ? (
          <div className="flex justify-center items-center w-full h-[80vh]">
            <ReactLoading />
          </div>
        ) : (
          <div className="w-4/6 mx-8">
            {posts?.length > 0
              ? posts.map((post, index) => <Posts post={post} key={index} />)
              : "NO POSTS"}
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Board;
