import React, { useEffect, useState } from "react";
import Dashboard from "../Shared/Dashboard";
import profileico from "../../assets/girl.jpeg";
import { ToastContainer, toast } from "react-toastify";
import { getUserById, updateProfile } from "../../axios/axios";
import moment from "moment";

const Profile = () => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await getUserById();

        setUser(res.data.user);
        setToggle(false);
      } catch (err) {
        toast.error(err);
      }
    };

    getProfile();
  }, [toggle]);

  const [user, setUser] = useState({});
  const [editToggle, setEditToggle] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [username, setUserName] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleEdit = async () => {
    try {
      const res = await updateProfile({ fullName, email, username });
      toast.success(res.data.message);
      setToggle(true);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Dashboard>
      <ToastContainer theme="colored" autoClose={3000} />
      <div className="w-screen flex justify-center bg-[#f5f5f5]">
        <div className="w-5/6 bg-white p-8 border rounded-2xl mt-4 shadow-md">
          <h1 className="text-2xl mb-8">Account Settings</h1>

          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={profileico} />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="mt-4">
              <h1 className="text-3xl underline decoration-solid">Profile</h1>{" "}
            </div>
            <div>
              {editToggle ? (
                <div>
                  <button
                    className="btn w-[5.5rem] mr-4"
                    onClick={() => setEditToggle(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn w-[5.5rem]  border-none  bg-green-600 hover:bg-green-800 active:bg-green-800 text-white"
                    onClick={() => {
                      handleEdit();
                      setEditToggle(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  className="btn w-[5.5rem]  border-none bg-green-600 hover:bg-green-800 active:bg-green-800 text-white"
                  onClick={() => setEditToggle(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="mt-12">
            <p className="font-normal underline-offset-auto text-xl ">
              Update your profile and personal details
            </p>
            <div className="grid grid-cols-2 mb-4 mt-4">
              <h2 className="">Full Name</h2>
              {editToggle ? (
                <input
                  size={80}
                  className="border-[1px] rounded-md p-2 border-slate-600"
                  defaultValue={user.fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              ) : (
                <p className="">{user.fullName}</p>
              )}
            </div>{" "}
            <hr />
            <div className="grid grid-cols-2 my-4">
              <h2 className="">Username</h2>
              {editToggle ? (
                <input
                  size={80}
                  className="border-[1px] rounded-md p-2 border-slate-600"
                  defaultValue={user.username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              ) : (
                <p className="">{user.username}</p>
              )}
            </div>{" "}
            <hr />
            <div className="grid grid-cols-2 my-4">
              <h2 className="">Email</h2>
              {editToggle ? (
                <input
                  size={80}
                  className="border-[1px] rounded-md p-2 border-slate-600"
                  defaultValue={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <p className="">{user.email}</p>
              )}
            </div>
            <hr />{" "}
            <div className="grid grid-cols-2 my-4">
              <h2 className="">User Type</h2>

              <p className="">{user.userType}</p>
            </div>
            <hr />
            <div className="grid grid-cols-2 my-4">
              <h2 className="">Created At</h2>
              <p className="">
                {" "}
                {moment(user.createdAt).format("dddd, MMMM Do YYYY")}
              </p>
            </div>
            <hr />{" "}
            <div className="grid grid-cols-2 my-4">
              <h2 className="">Updated At</h2>
              <p className="">
                {moment(user.updatedAt).format("dddd, MMMM Do YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Profile;
