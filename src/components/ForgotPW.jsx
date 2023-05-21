import React, { useState } from "react";
import InputField from "./Shared/InputFiled";
import { forgotPW } from "../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import keyicon from "../assets/icon-key.svg";
import { Link, useNavigate } from "react-router-dom";

const ForgotPW = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    try {
      const res = await forgotPW({ email });
      if (res.status === 200) {
        toast.success("Email Confirmed Redirecting to Reset Page");
        navigate("/ResetPassword");
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };
  return (
    <>
      <ToastContainer theme="colored" autoClose={3000} />
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <img src={keyicon} className=" w-32 mb-5" />
        <div>
          <h1 className="text-3xl font-normal text-center">
            Forgot Password ?
          </h1>
          <p className="opacity-50">
            No worries, we'll send you reset instruction
          </p>
        </div>
        <div className="px-10 py-5 w-4/12">
          <InputField
            placeholder={"Enter Your Email Address"}
            name="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <button
            className="bg-success2 border rounded-md w-full px-3 py-2 mt-5"
            onClick={onSubmitHandler}
          >
            <span className=" font-semibold text-xl text-white">Send</span>
          </button>
        </div>
        <Link to="/login" className="hover:underline">
          Get Back To Login ?
        </Link>{" "}
      </div>
    </>
  );
};

export default ForgotPW;
