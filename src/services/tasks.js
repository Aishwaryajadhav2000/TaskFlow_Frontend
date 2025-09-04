import API_BASE_URL from "./common"
import { useNavigate } from 'react-router-dom';



export const createTaskservice = async (taskData) => {
    const token = localStorage.getItem("token");
    try {
        const createTaskResponse = await fetch(`${API_BASE_URL}/api/createtask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(taskData
                //     {
                //     description : taskData.description,
                //     taskAssign : taskData.taskAssign,
                //     taskStatus : taskData.taskStatus
                // }
            )
        });
       return createTaskResponse

    } catch (err) {
        console.log("error occured",err.message)
    }
}

export const updateTaskService = async (taskId, taskUpdateData) => {
    const taskUpdateRes = await fetch(`${API_BASE_URL}/api/updatetask/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body:
            JSON.stringify(taskUpdateData)

    });
    const responseData = await taskUpdateRes.json();
    console.log("response data", responseData);
    return taskUpdateRes;
}

export const getTaskById = async (taskId) => {
    const taskResponse = await fetch(`${API_BASE_URL}/api/gettask/${taskId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const taskData = await taskResponse.json();
    console.log("cirrent taks", taskData)
    return taskData;
}

export const deleteTaskserv = async (taskId) => {
    const taskRes = await fetch(`${API_BASE_URL}/api/deletetask/${taskId}`, {
        method: "DELETE",
    });
    // const deleteresponse = await taskRes.json();
    // console.log("response", deleteresponse)
    // return deleteresponse;
    return taskRes
}

