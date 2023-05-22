import React, { useEffect, useState } from "react";
import { orgByUser } from "../axios/axios";
import DropMenu from "./Shared/DropMenu";
import { ToastContainer, toast } from "react-toastify";
import DeleteModal from "./Modals/DeleteModal";
import UpdateModal from "./Modals/UpdateModal";
import CreateModal from "./Modals/CreateModal";
import ReactLoading from "./Shared/ReactLoading";
import { useNavigate } from "react-router-dom";
import Pagination from "./Shared/Pagination";
import Dashboard from "./Shared/Dashboard";
import moment from "moment";

const MyOrganisation = () => {
  const [orgs, setOrgs] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [orgId, setOrgId] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(4);

  useEffect(
    () =>
      async function getOrg() {
        setLoading(true);
        try {
          const res = await orgByUser();
          setOrgs(res.data.org);
          setToggle(false);
          setLoading(false);
        } catch (err) {
          setLoading(true);
          err.response.data.errors
            ? toast.error(err.response.data.errors[0].msg)
            : toast.error(err.response.data.error);
        }
      },
    [toggle]
  );

  const navigate = useNavigate();
  const boardHandler = (id) => {
    localStorage.setItem("orgid", id);

    navigate("/board-list");
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentOrgs = orgs.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <Dashboard>
        <ToastContainer theme="colored" autoClose={3000} />

        {loading ? (
          <div className="flex justify-center items-center w-full h-[80vh]">
            <ReactLoading />
          </div>
        ) : (
          <div className="relative overflow-x-auto w-11/12 mx-10 h-[100vh]">
            <div>
              <h1 className="text-3xl text-center my-5">
                Welcome to <span className="text-green-600"> Org Feed. </span>
              </h1>{" "}
              <h2 className="text-lg text-center my-5 ">
                <span className="opacity-75 text-black">
                  {" "}
                  Get valuable insights and feedback about companies. Make
                  informed decisions and contribute to our transparent community
                  of reviewers.
                </span>
                <br />
              </h2>
              <h2 className="text-xl text-center">
                Start Exploring <span className="text-green-600">Now !</span>
              </h2>
            </div>
            <div>
              {/* The button to open modal */}
              <label
                htmlFor="modal"
                className="btn border-none w-fit bg-green-600 hover:bg-green-800 active:bg-green-800 text-white mb-8 p-4 h-auto flex flex-row"
              >
                <a href="#createorg">Create Organisation </a>
              </label>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-slate-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Organisations Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Website
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              {currentOrgs?.length > 0
                ? currentOrgs.map((org, index) => (
                    <tbody key={index}>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        {/* <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <a
                            className="hover:underline hover:underline-offset-4 hover:cursor-pointer hover:text-green-700"
                            onClick={() => boardHandler(org._id)}
                          >
                            {org.name}
                          </a>
                        </th> */}
                        <td onClick={() => boardHandler(org._id)}>
                          <div className="flex items-center space-x-3 ">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={org.logo} alt="org logo" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold hover:underline hover:underline-offset-4 hover:cursor-pointer hover:text-green-700">
                                {org.name}
                              </div>
                              <div className="text-sm opacity-50">
                                updated at: {moment(org.updatedAt).fromNow()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{org.website}</td>
                        <td className="px-6 py-4">{org.phoneNumber}</td>
                        <td className="px-6 py-4">{org.address}</td>
                        <td className="px-6 py-4 ">
                          <DropMenu
                            org={org}
                            setToggle={setToggle}
                            setOrgId={setOrgId}
                          />
                        </td>
                      </tr>
                    </tbody>
                  ))
                : "NO ORGS"}
            </table>{" "}
            <Pagination
              totalPosts={orgs.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
            <DeleteModal id={orgId} setToggle={setToggle} />
            <UpdateModal id={orgId} setToggle={setToggle} />
            <CreateModal setToggle={setToggle} />
          </div>
        )}
      </Dashboard>
    </>
  );
};

export default MyOrganisation;
