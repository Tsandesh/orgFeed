import React, { useState } from "react";
import InputField from "../Shared/InputFiled";
import { createPost } from "../../axios/axiosBoard";
import { ToastContainer, toast } from "react-toastify";

const CreatePost = ({ setToggle }) => {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("open");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);

  const onCreateHandler = async () => {
    setIsLoading(true);
    try {
      const res = await createPost({
        title,
        email,
        board: localStorage.getItem("boardID"),
        description: desc,
        status,
        priority,
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        setToggle(true);
        setTitle("");
        setEmail("");
        setDesc("");
        setIsLoading(false);
      }
    } catch (err) {
      //   console.log("error", err.response);
      setIsLoading(false);
      err.response.data
        ? toast.error(err.response.data.errors[0].msg)
        : toast.error(err.response.data.error);
    }
  };

  return (
    <div>
      <ToastContainer theme="colored" autoClose={3000} />
      <div className="card w-[400px] bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title">Create Post</h2>
          <hr />
          <InputField
            placeholder="Title"
            name="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />{" "}
          <InputField
            placeholder="Jhon@google.com"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <h2 className="font-semibold">Description</h2>
          <textarea
            name=""
            id=""
            rows="5"
            className="border rounded-md w-full mb-0 p-4"
            placeholder="Descrition About your Post"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="flex flex-row">
            <div className="mx-3">
              <h4 className="mb-1 ml-2">Status</h4>
              <select
                className="select  select-sm max-w-xs select-bordered"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={"open"}>open</option>
                <option value={"inProgress"}>inProgress</option>
                <option value={"done"}>done</option>
              </select>
            </div>
            <div className="mx-3">
              <h4 className="mb-1 ml-2">Priorites</h4>
              <select
                className="select select-bordered select-sm max-w-xs"
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value={"low"}>low</option>
                <option value={"medium"}>medium</option>
                <option value={"high"}>high</option>
              </select>
            </div>
          </div>
          <div className="card-actions justify-end mt-2">
            <button
              className="btn btn-gray-650 py-0"
              onClick={onCreateHandler}
              disabled={isLoading}
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
