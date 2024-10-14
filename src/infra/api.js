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

// projects
export const postProject = async (params) =>
  axios.post("/projects", snakecaseKeys(params));

export const getProject = async (params) =>
  axios({
    method: "get",
    url: `/projects/${params}`,
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const updateProject = async (params, data) =>
  axios({
    method: "put",
    url: `/projects/${params}`,
    data: snakecaseKeys(data),
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const deleteProject = async (params) =>
  axios({
    method: "delete",
    url: `/projects/${params}`,
  });

export const getProjects = async () =>
  axios({
    method: "get",
    url: "/projects",
  }).then((response) => camelcaseKeys(response, { deep: true }));

// tasks
export const postTask = async (params) =>
  axios.post("/tasks", snakecaseKeys(params));

export const getTask = async (params) =>
  axios({
    method: "get",
    url: `/tasks/${params}`,
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const updateTask = async (params, data) =>
  axios({
    method: "put",
    url: `/tasks/${params}`,
    data: snakecaseKeys(data),
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const deleteTask = async (params) =>
  axios({
    method: "delete",
    url: `/tasks/${params}`,
  });

export const getTasks = async () =>
  axios({
    method: "get",
    url: "/tasks",
  }).then((response) => camelcaseKeys(response, { deep: true }));
