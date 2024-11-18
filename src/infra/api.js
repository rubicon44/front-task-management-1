import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

// auth
export const signIn = async (params, idToken) => {
  try {
    const response = await axios.post("/auth/sign_in", snakecaseKeys(params), {
      headers: {
        Authorization: idToken,
      },
    });
    return camelcaseKeys(response.data, { deep: true });
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// users
export const postUser = async (params, idToken) => {
  try {
    const response = await axios.post("/users", snakecaseKeys(params), {
      headers: {
        Authorization: idToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUser = async (userId, idToken) =>
  axios({
    method: "get",
    url: `/users/${userId}?user_id=${userId}`,
    headers: {
      Authorization: idToken,
    },
  }).then((response) => camelcaseKeys(response, { deep: true }));

  export const getUserByIdToken = async (idToken) =>
  axios({
    method: "get",
    url: `/users`,
    headers: {
      Authorization: idToken,
    },
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const updateUser = async (userId, data) =>
  axios({
    method: "put",
    url: `/users/${userId}`,
    data: snakecaseKeys(data),
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const deleteUser = async (userId) =>
  axios({
    method: "delete",
    url: `/users/${userId}`,
  });

export const getUsers = async () =>
  axios({
    method: "get",
    url: "/users",
  }).then((response) => camelcaseKeys(response, { deep: true }));

// projects
export const postProject = async (userId, params, idToken) => {
  return axios({
    method: "post",
    url: `/users/${userId}/projects`,
    headers: {
      Authorization: idToken,
    },
    data: snakecaseKeys(params),
  })
  .then((response) => camelcaseKeys(response.data, { deep: true }))  // response.dataのみ変換
};

export const getProject = async (userId, projectId, idToken) =>
  axios({
    method: "get",
    url: `/users/${userId}/projects/${projectId}`,
    headers: {
      Authorization: idToken,
    },
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const updateProject = async (userId, projectId, data, idToken) =>
  axios({
    method: "put",
    url: `/users/${userId}/projects/${projectId}`,
    headers: {
      Authorization: idToken,
    },
    data: snakecaseKeys(data),
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const deleteProject = async (userId, projectId, idToken) =>
  axios({
    method: "delete",
    url: `/users/${userId}/projects/${projectId}`,
    headers: {
      Authorization: idToken,
    },
  });

export const getProjects = async (userId, idToken) =>
  axios({
    method: "get",
    url: `/users/${userId}/projects`,
    headers: {
      Authorization: idToken,
    },
  }).then((response) => camelcaseKeys(response, { deep: true }));

// tasks
export const postTask = async (userId, projectId, params, idToken) => {
  return axios({
    method: "post",
    url: `/users/${userId}/projects/${projectId}/tasks`,
    headers: {
      Authorization: idToken,
    },
    data: snakecaseKeys(params),
  })
  .then((response) => camelcaseKeys(response.data, { deep: true }))  // response.dataのみ変換
};

export const getTask = async (userId, projectId, taskId, idToken) =>
  axios({
    method: "get",
    url: `/users/${userId}/projects/${projectId}/tasks/${taskId}`,
    headers: {
      Authorization: idToken,
    },
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const updateTask = async (userId, projectId, taskId, data, idToken) =>
  axios({
    method: "put",
    url: `/users/${userId}/projects/${projectId}/tasks/${taskId}`,
    headers: {
      Authorization: idToken,
    },
    data: snakecaseKeys(data),
  }).then((response) => camelcaseKeys(response, { deep: true }));

export const deleteTask = async (userId, projectId, taskId, idToken) =>
  axios({
    method: "delete",
    url: `/users/${userId}/projects/${projectId}/tasks/${taskId}`,
    headers: {
      Authorization: idToken,
    },
  });

export const getTasks = async (userId, projectId, idToken) =>
  axios({
    method: "get",
    url: `/users/${userId}/projects/${projectId}/tasks`,
    headers: {
      Authorization: idToken,
    },
  }).then((response) => camelcaseKeys(response, { deep: true }));
