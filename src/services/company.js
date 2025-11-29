import API_BASE_URL from "./common"


export const getUsersByCompany = async (companyname) => {
    try {
        const getResponse = await fetch(`${API_BASE_URL}/api/getusersbycompanyname/${companyname}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const reposne = await getResponse.json();
        console.log("service calling", reposne)
        return reposne;
    } catch (err) {
        console.log("error occured", err.message)
    }
}


//Creating new client/company
export const createNewOrg = async(data)=>{

    console.log("creating...")

    try{
        const createRes = await fetch(`${API_BASE_URL}/api/createcompany` , {
            method : "POST" ,
            headers : {
                "Content-Type" : "application/json",
            },
            body:JSON.stringify({
                companyname : data.companyName ,
                companyDescription : data.description
            })
        })
        console.log("data response" , createRes)
        return createRes
    }catch(err){
        console.log("error" , err)
    }
}

//Get all clients/companies
export const getCompaniesList = async()=>{
    try{
        const getResponse = await fetch(`${API_BASE_URL}/api/getcompanies` , {
            method:"GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })
        return getResponse;
    }catch(err){
        console.log("error" , err)
    }
}


//Delete client / company details with userids
export const deleteClient = async(companyname)=>{


        const deleteRes = await fetch(`${API_BASE_URL}/api/deleteclient/${companyname}` ,{
            method : "DELETE",

        });

        return deleteRes

    
}


//get clientdetails / company details
export const getClient = async(companyname) =>{
    try{

        const getRes = await fetch(`${API_BASE_URL}/api/getcompany/${companyname}` , {
           method: "GET",
            headers: {
                "Content-Type": "application/json",
            }  
        });

        const details = await getRes.json();
        console.log("response in service" , details)
        return details;

    }catch(err){
        console.log("error in service" , err)
    }
}