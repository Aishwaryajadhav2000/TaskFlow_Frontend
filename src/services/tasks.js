import API_BASE_URL from "./common"


export const createTaskservice = async (taskData) =>{
    const token = localStorage.getItem("token");
    console.log("token" , token)
    try{
        const createTaskResponse = await fetch(`${API_BASE_URL}/api/createtask`, {
            method : "POST",
            headers:{
                 "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`
            },
            body : JSON.stringify( taskData
            //     {
            //     description : taskData.description,
            //     taskAssign : taskData.taskAssign,
            //     taskStatus : taskData.taskStatus
            // }
        )
        });
        const responseData = await createTaskResponse.json();
        console.log("task" , responseData)
        if(createTaskResponse.status === 200){
            console.log("task created successfully...")
        }
    }catch(err){
        console.log(err.message)
    }
}