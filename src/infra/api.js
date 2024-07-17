import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

// users
export const postUser = async (params) =>
  axios.post("/users", snakecaseKeys(params));

export const getUser = async (params) =>
  axios({
    method: "get",
    url: `/users/${params}`,
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const updateUser = async (params, data) =>
  axios({
    method: "put",
    url: `/users/${params}`,
    data: snakecaseKeys(data),
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const deleteUser = async (params) =>
  axios({
    method: "delete",
    url: `/users/${params}`,
  });

export const getUsers = async () =>
  axios({
    method: "get",
    url: "/users",
  }).then((response) => camelcaseKeys(response, { deep: true }));
