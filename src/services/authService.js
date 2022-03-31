import jwtDecode from "jwt-decode";
import http from "./httpService";
import url from "../config";

const signInEndpoint = url + "/auth/login";
const signUpEndpoint = url + "/auth/register";
const signUpEndpointGetStats = url + "/stats";
const tokenKey = "token";

//TODO :delete
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export async function getStats() {
  const data = await http.get(signUpEndpointGetStats);
  return data;
}
export async function login(login, password) {
  const data = await http.post(signInEndpoint, {
    login,
    password,
  });
  localStorage.setItem(tokenKey, data.data.access_token);
}
export async function register(
  firstName,
  lastName,
  secondName,
  agroName,
  phoneNumber,
  frankId,
  regionId,
  districtId,
  clusterId,
  address,
  login,
  password,
  passwordConfirm
) {
  const { data } = await http.post(signUpEndpoint, {
    firstName,
    lastName,
    secondName,
    agroName,
    phoneNumber,
    frankId,
    regionId,
    districtId,
    clusterId,
    address,
    login,
    password,
    passwordConfirm,
  });
  localStorage.setItem(tokenKey, data.access_token);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  window.location.replace("/login");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const authApi = {
  getStats,
  login,
  logout,
  register,
  getCurrentUser,
  getJwt,
};

export default authApi;
