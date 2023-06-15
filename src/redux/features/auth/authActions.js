import axios from "axios";
import { loginRequest, loginSuccess, loginFailure, logout } from "./authSlice";
import { fetchPlaylists } from "../playlist/playlistAction";

const apiUrl = "https://wav-port.herokuapp.com";

export const loginUser = (email, password) => async (dispatch) => {
  console.log("Email:", email);
  console.log("Password:", password);
  dispatch(loginRequest());

  try {
    const response = await axios.post(`${apiUrl}/api/users/login`, {
      email,
      password,
    });

    const { token, refreshToken, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);

    dispatch(loginSuccess({ user, token, refreshToken }));
    dispatch(fetchPlaylists());
    return { payload: { success: true } };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";
    dispatch(loginFailure(errorMessage));
    return { payload: { success: false, error: errorMessage } };
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  dispatch(logout());
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/api/users/register`, userData);
    const { token, user } = response.data;

    localStorage.setItem("token", token);
    dispatch(loginSuccess({ user, token: token }));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Registration failed";
    dispatch(loginFailure(errorMessage));
  }
};
