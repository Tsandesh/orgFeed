import React from "react";
import Dashboard from "../Shared/Dashboard";
import { useEffect } from "react";
import { getBoard } from "../../axios/axiosBoard";
import CreateBoardModal from "../Modals/CreateBoardModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "../Shared/ReactLoading";
import Pagination from "../Shared/Pagination";

const BoardList = () => {
  const [boards, setBoard] = useState([]);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(9);

  const boardHandler = (id) => {
    localStorage.setItem("boardID", id);
    navigate("/board");
  };

  useEffect(() => {
    setLoading(true);
    try {
      return async () => {
        const res = await getBoard(localStorage.getItem("orgid"));
        if (res.status === 200) {
          setBoard(res.data.boards);
          setLoading(false);
          setToggle(false);
        }
      };
    } catch (error) {
      setLoading(true);
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
            <div className="text-center text-xl font-normal">
              <h1>
                Board Section will contain all the Organization's Board of type{" "}
                <br />
                <span className="text-green-600"> Bug Report</span>,
                <span className="text-green-600"> Feedback </span>
                and <span className="text-green-600"> Feature Request</span>
                <br />
                <label
                  htmlFor="modal"
                  className="btn mt-4 mb-4 border-none shadow-sm bg-green-600 hover:bg-green-800 active:bg-green-800 "
                >
                  <a href="#createboard" className="hover:text-white">
                    Create Board
                  </a>
                </label>{" "}
              </h1>
              {/* The button to open modal */}
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
                          className="p-2 rounded-md text-slate-700 border border-black hover:bg-green-600 hover:text-white hover:border-none"
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
