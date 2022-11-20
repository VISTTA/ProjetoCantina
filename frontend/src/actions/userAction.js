import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_ERRORS,
REGISTER_USER_REQUEST, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS,
LOAD_USER_REQUEST, LOAD_USER_FAIL, LOAD_USER_SUCCESS,
LOGOUT_SUCCESS, LOGOUT_FAIL } from "../constants/userConstants";
import axios from "axios";

//Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type:LOGIN_REQUEST });

        const config = { headers: { "Content-type": "application/json" } };

        const { data } = await axios.post(`/api/v1/login`, { email, password }, config);

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({type: LOGIN_FAIL, payload: error.responde.data.message});
    }
}

//Registrar
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_USER_REQUEST})

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`/api/v1/register`, userData, config);

        dispatch({type: REGISTER_USER_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
}

//Loading User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`/api/v1/me`);

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
}

//Logout usuario
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/ap1/v1/logout`);

        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
}

//Tratando Error
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}