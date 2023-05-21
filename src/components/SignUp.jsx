import React, { useState } from "react";
import keyBro from "../assets/Key-bro.svg";
import InputField from "./Shared/InputFiled";
import { signup } from "../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    try {
      const res = await signup({
        fullName,
        username,
        email,
        password,
        phone,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setVerified(res.data.user.emailVerified);
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
      <div className="flex justify-center items-center h-[100vh] mx-16 p-5">
        {/* image */}
        <div className=" mb-12 w-5/12 mr-5 p-2">
          <img src={keyBro} alt="Key Bro image" />
        </div>
        <div className=" justify-center flex-1 items-center max-w-[35%] p-5">
          <div>
            <h1 className="text-4xl mb-5 ml-2 font-normal">
              Let's Start,{" "}
              <span className="text-success2">with Registration!</span>
            </h1>
          </div>
          <InputField
            placeholder={"Jhon Doe"}
            name="Full Name"
            type="text"
            onChange={(e) => setFullName(e.target.value)}
          />{" "}
          <InputField
            placeholder={"Jhon96"}
            name="User Name"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />{" "}
          <InputField
            placeholder={"JhonDoe@example.com"}
            name="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <InputField
            placeholder={"**********"}
            name="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <InputField
            placeholder={"9812345678"}
            name="Phone Number"
            type="text"
            value={phone}
            onChange={(e) => {
              if (isNaN(e.target.value)) return;
              setPhone(e.target.value);
            }}
            pattern="[0-9]+"
          /> */}
          <p className="text-sm opacity-60 mt-2 ml-2">
            By creating an account or signing you agree to our Terms and
            Conditions
          </p>
          <button
            className="bg-success2 border rounded-md w-full px-3 py-2"
            onClick={onSubmitHandler}
          >
            <span className=" font-semibold text-xl text-white">Signup</span>
          </button>
          <p className="flex justify-center mt-2 ">
            Already have an account?<span> </span>
            <Link to="/login" className="underline hover:text-success2">
              Log in
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
