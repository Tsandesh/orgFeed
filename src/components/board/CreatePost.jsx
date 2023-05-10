import React, { useState } from "react";
import InputField from "../Shared/InputFiled";
import { createPost } from "../../axios/axiosBoard";
import { ToastContainer, toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("open");
  const [priority, setPriority] = useState("low");
  const [image, setImage] = useState("");

  const onCreateHandler = async () => {
    try {
      const res = await createPost({
        title,
        email,
        board: "64577181ff2c76c45cc57eaf",
        description: desc,
        image,
        status,
        priority,
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        // console.log(res.data.token);
      }
    } catch (err) {
      //   console.log("error", err.response);
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div>
      <ToastContainer theme="colored" autoClose={3000} />
      <div className="card w-90 m-8 bg-green-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-cyan-950">Create Post</h2>
          <hr />
          <InputField
            placeholder="Title"
            name="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
          <InputField
            placeholder="Jhon@google.com"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <InputField
            placeholder="Descrition About your Post"
            name="description"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />{" "}
          <InputField
            name="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />{" "}
          <div className="flex flex-row">
            <div className="mx-3">
              <h4 className="mb-1 ml-2 text-cyan-950">Status</h4>
              <select
                className="select  select-sm max-w-xs select-bordered  text-white  py-0 bg-green-600"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option className="text-white" value={"open"}>
                  open
                </option>
                <option className="text-white" value={"inProgress"}>
                  inProgress
                </option>
                <option value={"done"}>done</option>
              </select>
            </div>
            <div className="mx-3">
              <h4 className="mb-1 ml-2 text-cyan-950">Priorites</h4>
              <select
                className="select select-bordered select-sm max-w-xs text-white bg-green-600"
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
              className="btn text-white  py-0 bg-green-700"
              onClick={onCreateHandler}
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
