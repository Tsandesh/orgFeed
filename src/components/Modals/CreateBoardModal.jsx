import React from "react";
import InputField from "../Shared/InputFiled";
import { useState } from "react";
import { createBoard } from "../../axios/axiosBoard";
import { ToastContainer, toast } from "react-toastify";

const CreateBoardModal = ({ setToggle }) => {
  const [name, setName] = useState("");
  const [boardType, setBoardType] = useState("bugReport");
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createBoardHandler = async () => {
    setIsLoading(true);
    try {
      const res = await createBoard({
        name,
        description: desc,
        boardType,
        organization: localStorage.getItem("orgid"),
      });
      setToggle(true);
      toast.success("Board Created Succesfully");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer theme="colored" autoClose={3000} />
      <div className="modal" id="createboard">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Create a board to your organisation
          </h3>
          <InputField
            placeholder="Organisation XYZ"
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />{" "}
          <InputField
            placeholder="XYZ Company is blah blah blah"
            name="description"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />{" "}
          <select
            className="select select-bordered select-sm max-w-xs mt-3"
            onChange={(e) => setBoardType(e.target.value)}
          >
            <option value={"bugReport"}>Bug Report</option>
            <option value={"featureRequest"}>Feature Request</option>
            <option value={"feedback"}>Feedback</option>
          </select>
          <div className="modal-action">
            <a href="#" className="btn w-[5.5rem] ">
              NO
            </a>
            <a
              href="#"
              className="btn w-[5.5rem] "
              onClick={() => createBoardHandler()}
              disabled={isLoading}
            >
              YES
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBoardModal;
