import React from "react";
import Dashboard from "../Dashboard";
import { useEffect } from "react";
import { getBoard } from "../../axios/axiosBoard";
import CreateBoardModal from "../Modals/CreateBoardModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "../Shared/ReactLoading";
import Pagination from "../Pagination";

const BoardList = () => {
  const [boards, setBoard] = useState([]);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(9);

  const boardHandler = (id) => {
    // console.log("dasdasd", id);
    localStorage.setItem("boardID", id);
    navigate("/board");
  };
  console.log(toggle);

  useEffect(() => {
    setLoading(true);
    try {
      return async () => {
        const res = await getBoard(localStorage.getItem("orgid"));
        if (res.status === 200) {
          console.log(res.data.boards);
          setBoard(res.data.boards);
          setLoading(false);
          setToggle(false);
        }
      };
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  }, [toggle]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentboards = boards.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <Dashboard>
        {loading ? (
          <div className="flex justify-center items-center w-full h-[80vh]">
            <ReactLoading />
          </div>
        ) : (
          <main className=" mt-5">
            <div className="ml-8">
              {/* The button to open modal */}
              <label htmlFor="modal" className="btn mb-4 ml-4">
                <a href="#createboard">Create Board</a>
              </label>{" "}
            </div>{" "}
            <div className="grid grid-cols-3 gap-16 ml-4">
              {currentboards?.length > 0 ? (
                currentboards.map((board, index) => (
                  <div className="card w-96 bg-base-100 shadow-md hover:scale-110">
                    <div className="card-body">
                      <h2 className="card-title ">
                        <span className="truncate">{board.name}</span>
                        {board.boardType === "feedback" ? (
                          <span className="badge bg-white hover:bg-orange-300 font-normal text-black p-2">
                            {board.boardType}
                          </span>
                        ) : board.boardType === "featureRequest" ? (
                          <span className="badge bg-white hover:bg-orange-300 font-normal text-black p-2">
                            {board.boardType}
                          </span>
                        ) : (
                          <span className="badge bg-white hover:bg-orange-300 font-normal text-black p-2">
                            {board.boardType}
                          </span>
                        )}
                      </h2>

                      <p className="truncate">{board.description}</p>

                      <div className="card-actions justify-end">
                        <button
                          className="p-2 rounded-md text-slate-700 border border-black hover:bg-success hover:border-none"
                          onClick={() => boardHandler(board._id)}
                        >
                          Show More
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Boards to show please create some boards to continue</p>
              )}
            </div>
          </main>
        )}

        <CreateBoardModal setToggle={setToggle} />
      </Dashboard>
      <Pagination
        totalPosts={boards.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default BoardList;
