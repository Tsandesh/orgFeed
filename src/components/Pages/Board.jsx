import React from "react";
import CreatePost from "../board/CreatePost";
import { getPosts } from "../../axios/axiosBoard";
import Dashboard from "../Shared/Dashboard";
import Posts from "../board/Posts";
import ReactLoading from "../Shared/ReactLoading";
import Pagination from "../Shared/Pagination";
import useBoardList from "../../hooks/useBoardList";

const Board = () => {
  const {
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
  } = useBoardList();
  return (
    <>
      <Dashboard>
        <div className="my-4 flex flex-row bg-white w-full mt-12">
          <div className="mx-4 w-2/6">
            <CreatePost setToggle={setToggle} />
          </div>
          {loading ? (
            <div className="flex justify-center items-center w-full h-[80vh]">
              <ReactLoading />
            </div>
          ) : (
            <div className="w-4/6">
              <h1 className="text-xl text-center mb-8 font-semibold">
                Some of the Popular Posts Right now 🔥
              </h1>
              {currentposts?.length > 0
                ? currentposts.map((post, index) => (
                    <Posts post={post} key={index} />
                  ))
                : "NO POSTS"}
            </div>
          )}
        </div>
      </Dashboard>
      <div className="mb-4">
        <Pagination
          totalPosts={posts.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Board;
