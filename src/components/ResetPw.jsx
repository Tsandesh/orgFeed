import React, { useState } from "react";
import InputField from "./Shared/InputFiled";
import { resetPW } from "../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import keyicon from "../assets/Reset-PW.svg";
import { Link, useNavigate } from "react-router-dom";

const ForgotPW = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    try {
      const res = await resetPW({ email, newPassword: password, otp });
      if (res.status === 200) {
        toast.success("Password has been Reset... Redirecting to Login Page");
        navigate("/");
      }
    } catch (err) {
      err.response.data.errors
        ? toast.error(err.response.data.errors[0].msg)
        : toast.error(err.response.data.Error);
    }
  };
  return (
    <>
      <ToastContainer theme="colored" autoClose={3000} />
      <div className="flex  justify-center items-center h-[100vh]">
        {/* image */}
        <div className="w-5/12 mb-5 p-5">
          <img src={keyicon} alt="reset img" />
        </div>
        {/* form */}
        <div className="px-10 py-5 w-4/12">
          {" "}
          <div>
            <h1 className="text-3xl font-normal text-center">
              Reset Password ?
            </h1>
            <p className="opacity-50 text-center">
              No worries, just follow the instruction
            </p>
          </div>
          <InputField
            placeholder={"Enter Your Email Address"}
            name="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <InputField
            placeholder={"Enter Your New Password"}
            name="New Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <InputField
            placeholder={"Enter OTP sent to you mail"}
            name="Otp"
            type="tel"
            value={otp}
            onChange={(e) => {
              if (isNaN(e.target.value)) return;
              setOtp(e.target.value);
            }}
          />{" "}
          <button
            className="bg-success2 border rounded-md w-full px-3 py-2 mt-5"
            onClick={onSubmitHandler}
          >
            <span className=" font-semibold text-xl text-white">
              Reset Password{" "}
            </span>
          </button>
          <div className="text-center">
            <Link to="/login" className="hover:underline">
              Get Back To Login ?
            </Link>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPW;
