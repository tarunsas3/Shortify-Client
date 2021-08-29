import axios from "axios";

const URL = "https://shortify-it.herokuapp.com";

export const login = async (formData) => {
  let { data } = await axios.post(`${URL}/login`, formData);
  return data;
};

export const signup = async (formData) => {
  let { data } = await axios.post(`${URL}/signup`, formData);
  return data;
};

export const forgotPassword = async (email) => {
  let { data } = await axios.post(`${URL}/forgot-password`, { email });
  return data;
};

export const verifyResetURL = async (obj) => {
  let { data } = await axios.post(`${URL}/verify-resetURL`, obj);
  return data;
};

export const resetPassword = async (obj) => {
  let { data } = await axios.post(`${URL}/reset-password`, obj);
  return data;
};

export const verifySignup = async (hash) => {
  let { data } = await axios.post(`${URL}/verify-signup`, { hash });
  return data;
};

export const shortenURL = async (longURL) => {
  let { data } = await axios.post(`${URL}/shorten-url`, { longURL });
  return data;
};

export const redirectURL = async (url) => {
  let { data } = await axios.post(`${URL}/redirect-url`, { url });
  return data;
};

export const fetchLinks = async () => {
  let { data } = await axios.get(`${URL}/`);
  return data.links;
};

export const getCount = async () => {
  let { data } = await axios.get(`${URL}/count`);
  return data;
};
