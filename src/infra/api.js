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
export const postProject = async (userId, params) =>
  axios.post(`/users/${userId}/projects`, snakecaseKeys(params));

export const getProject = async (userId, projectId) =>
  axios({
    method: "get",
    url: `/users/${userId}/projects/${projectId}`,
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const updateProject = async (userId, projectId, data) =>
  axios({
    method: "put",
    url: `/users/${userId}/projects/${projectId}`,
    data: snakecaseKeys(data),
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const deleteProject = async (userId, projectId) =>
  axios({
    method: "delete",
    url: `/users/${userId}/projects/${projectId}`,
  });

export const getProjects = async (userId) =>
  axios({
    method: "get",
    url: `/users/${userId}/projects`,
  }).then((response) => camelcaseKeys(response, { deep: true }));

// tasks
export const postTask = async (userId, projectId, params) =>
  axios.post(`/users/${userId}/projects/${projectId}/tasks`, snakecaseKeys(params));

export const getTask = async (userId, projectId, taskId) =>
  axios({
    method: "get",
    url: `/users/${userId}/projects/${projectId}/tasks/${taskId}`,
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const updateTask = async (userId, projectId, taskId, data) =>
  axios({
    method: "put",
    url: `/users/${userId}/projects/${projectId}/tasks/${taskId}`,
    data: snakecaseKeys(data),
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const deleteTask = async (userId, projectId, taskId) =>
  axios({
    method: "delete",
    url: `/users/${userId}/projects/${projectId}/tasks/${taskId}`,
  });

export const getTasks = async (userId, projectId) =>
  axios({
    method: "get",
    url: `/users/${userId}/projects/${projectId}/tasks`,
  }).then((response) => camelcaseKeys(response, { deep: true }));
