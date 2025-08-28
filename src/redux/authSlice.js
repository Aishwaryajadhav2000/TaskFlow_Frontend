import {createSlice} from "@reduxjs/toolkit";

const user = localStorage.getItem("user");

const initialState = {
    user : user ? JSON.parse(user) : null
}