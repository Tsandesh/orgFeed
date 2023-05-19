import React, { useEffect, useState } from "react";
import { orgByUser } from "../axios/axios";
import DropMenu from "./Shared/DropMenu";
import { ToastContainer, toast } from "react-toastify";
import DeleteModal from "./Modals/DeleteModal";
import UpdateModal from "./Modals/UpdateModal";
import CreateModal from "./Modals/CreateModal";
import createico from "../assets/create.svg";

const MyOrganisation = () => {
  const [orgs, setOrgs] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [orgId, setOrgId] = useState("");

  useEffect(
    () =>
      async function getOrg() {
        try {
          const res = await orgByUser();
          setOrgs(res.data.org);
          setToggle(false);
        } catch (err) {
          err.response.data.errors
            ? toast.error(err.response.data.errors[0].msg)
            : toast.error(err.response.data.error);
        }
      },
    [toggle]
  );

  return (
    <>
      <ToastContainer theme="colored" autoClose={3000} />

      <div className="relative overflow-x-auto w-11/12 mx-10 h-[100vh]">
        <h1 className="text-3xl text-center my-5">MY ORGANIZATION</h1>
        <div>
          {/* The button to open modal */}
          <label
            htmlFor="modal"
            className="btn border-none w-fit bg-[#3E363F]  text-white mb-8 p-4 h-auto flex flex-row"
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
          {orgs?.length > 0
            ? orgs.map((org, index) => (
                <tbody key={index}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {org.name}
                    </th>
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
        </table>
        <DeleteModal id={orgId} setToggle={setToggle} />
        <UpdateModal id={orgId} setToggle={setToggle} />
        <CreateModal setToggle={setToggle} />
      </div>
    </>
  );
};

export default MyOrganisation;
