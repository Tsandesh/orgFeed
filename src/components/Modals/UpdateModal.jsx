import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import InputField from "../Shared/InputFiled";
import { updateOrg } from "../../axios/axios";

const UpdateModal = ({ id, setToggle }) => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const onUpdateHandler = async (id) => {
    try {
      const res = await updateOrg({ id, name, website, phone, address });
      if (res.status === 200 || 201) {
        toast.success(res.data.message);
        setToggle(true);
      }
    } catch (err) {
      err.response.data?.errors
        ? toast.error(err.response.data.errors[0].msg)
        : toast.error(err.response.data.error);
    }
  };

  return (
    <>
      <ToastContainer theme="colored" autoClose={3000} />
      <div className="modal" id="updateModal">
        <div className="modal-box">
          <h3 className="font-bold text-3xl text-center text-slate-800">
            Update Organisation
          </h3>
          <InputField
            placeholder="Name"
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />{" "}
          <InputField
            placeholder="Website"
            name="website"
            type="text"
            onChange={(e) => setWebsite(e.target.value)}
          />{" "}
          <InputField
            placeholder="Phone Number"
            name="phone"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
          />{" "}
          <InputField
            placeholder="Address"
            name="address"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />{" "}
          <p className="my-3 text-semibold">
            Please Review All the Information Before Confirming
          </p>
          <div className="modal-action">
            <a href="#" className="btn w-[5.5rem] ">
              NO
            </a>
            <a
              href="#"
              className="btn w-[5.5rem] bg-green-600 hover:bg-green-800 active:bg-green-800 text-white"
            >
              <button onClick={() => onUpdateHandler(id)}>YES</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
