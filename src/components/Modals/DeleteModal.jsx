import React from "react";

import { ToastContainer, toast } from "react-toastify";
import { deleteOrg } from "../../axios/axios";

const DeleteModal = ({ id, setToggle }) => {
  const onDeleteHandler = async () => {
    try {
      const res = await deleteOrg({ id });
      if (res.status === 200) {
        toast.success(res.data.message);

        setToggle(true);
      }
    } catch (err) {
      err.response.data.errors
        ? toast.error(err.response.data.errors[0].msg)
        : toast.error(err.response.data.error);
    }
  };

  return (
    <>
      <ToastContainer theme="colored" autoClose={3000} />
      <div className="modal" id="deleteModal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are You Sure You Want To Delete The Organisation ?
          </h3>
          <p className="py-4 text-red-500 text-sm opacity-80">
            You will not be able to retrive it after you delete
          </p>
          <div className="modal-action">
            <a href="#" className="btn w-[5.5rem] ">
              NO
            </a>
            <a
              href="#"
              className="btn w-[5.5rem] bg-green-600 hover:bg-green-800 active:bg-green-800 text-white"
            >
              <button onClick={onDeleteHandler}>YES</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
