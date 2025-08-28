import axios from "axios"
import API_BASE_URL from "./common.js"
import { useNavigate } from "react-router-dom"


export const registration = async (userData) => {


    console.log("Creating user...")
    try {
        const registerResponse = await fetch(`${API_BASE_URL}/api/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                companyname: userData.companyName,
                fullname: userData.fullName,
                username: userData.userName,
                phone: userData.phoneNo,
                gender: userData.gender,
                position: userData.position,
                password: userData.password
            })
        });
        console.log("registerresponse", registerResponse);
        if (registerResponse.status == 200) {
            alert("USer created successfully")
        }

    } catch (err) {
        console.log(err.message)
    }
}

// Login user
export const loginUser = async (credentials) => {
    try {
        const loginresponse = await fetch(`${API_BASE_URL}/api/loginuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password
            })
        });
        const responseData = await loginresponse.json();
        console.log("loginresponse", responseData)
        if (loginresponse.status == 200) {
            alert("Login successfull..");
            localStorage.setItem("loginstatus", "true");
            localStorage.setItem("user", JSON.stringify(responseData.user));
            localStorage.setItem("token", responseData.accessToke)
        }
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const getFullProfile = async (e) => {
    console.log("calling getfullprofile function here...")

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("invalid token")
        } else {
            console.log("else")
            const responseData = await fetch(`${API_BASE_URL}/api/getuser`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            const freshUser = await responseData.json();
            console.log("userData...", freshUser)
        }



    } catch (err) {
        console.log(err)
    }


};

