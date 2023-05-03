import axios from "axios";

const baseURL = "http://localhost:8000/orgFeeder/api/";

const api = axios.create({
  baseURL: baseURL,
});

export const signup = async (data) =>
  api.post("user/register", data, {
    headers: {
      "Content-type": "application/json",
    },
  });

export const login = async (data) =>
  api.post("user/login", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
export const forgotPW = async (data) =>
  api.post("user/forgot-password", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
export const resetPW = async (data) =>
  api.post("user/reset-password", data, {
    headers: {
      "Content-type": "application/json",
    },
  });

export const createOrg = async (data) =>
  api.post("/organization/create-organization", data, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
export const orgByUser = async () =>
  api.get(
    `/organization/get-all-organizations-by-user/${localStorage.getItem(
      "userID"
    )}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

export const deleteOrg = async ({ id }) =>
  api.delete(`/organization/delete-organization/${id}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateOrg = async ({ id, name, website, phone, address }) =>
  api.patch(
    `/organization/update-organization/${id}`,
    { name, website, phone, address },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

export default api;
