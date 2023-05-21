import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { deleteComment } from "../../axios/axiosBoard";

const DeleteCommentModal = ({ id, setToggle }) => {
  const onDeleteHandler = async () => {
    try {
      const res = await deleteComment({ id });

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <>
      <ToastContainer theme="colored" autoClose={3000} />
      <div className="modal" id="deleteComment">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are You Sure You Want To Delete The Comment ?
          </h3>
          <p className="py-4 text-red-500 text-sm opacity-80">
            Comment will be Deleted Permanently
          </p>
          <div className="modal-action">
            <a href="#" className="btn w-[5.5rem]">
              NO
            </a>
            <a
              href="#"
              className="btn w-[5.5rem] bg-green-600 hover:bg-green-800 active:bg-green-800 text-white"
              onClick={onDeleteHandler}
            >
              <button>YES</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCommentModal;
