import React, { useState } from "react";
import loginBro from "../assets/Login-amico.svg";
import InputField from "./Shared/InputFiled";
import { login } from "../axios/axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    try {
      const res = await login({
        email,
        password,
      });
      if (res.status === 200) {
        toast.success(res.data.message);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userID", res.data.user._id);

        navigate("/");
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
      <div className="flex justify-center items-center h-[100vh] mx-10">
        <div className=" w-full h-[100vh] flex items-center  justify-center ml-5">
          <div>
            <h1 className="text-4xl mb-5 font-normal ml-3">
              Hey,<span className="text-success2"> Welcome</span> back.
            </h1>
            <InputField
              placeholder={"Jhondoe@email.com"}
              name="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <InputField
              placeholder={"*********"}
              name="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <div className="flex flex-row justify-between ml-2">
              <div>
                {" "}
                <input
                  type="checkbox"
                  id="remem"
                  name="remember_me"
                  value="true"
                />
                <label for="remem"> Remember me ?</label>
              </div>

              <p className="font-semibold">
                <Link to="/forgotPW" className="underline hover:text-success ">
                  Forgot Password ?
                </Link>{" "}
              </p>
            </div>
            <button
              className="bg-success2 border rounded-md w-full px-3 py-2 mt-5"
              onClick={onSubmitHandler}
            >
              <span className=" font-semibold text-xl text-white">Login</span>
            </button>
            <p className="ml-2 mt-2">
              New on our platform?<span> </span>
              <Link
                to="/signup"
                className="underline hover:text-success text-bold"
              >
                Create an account
              </Link>{" "}
            </p>
          </div>
        </div>
        {/* Login Image  */}
        <div className="w-7/12 flex justify-center items-center mr-60">
          <img src={loginBro} alt="login image" />
        </div>
      </div>
    </>
  );
};

export default Login;
