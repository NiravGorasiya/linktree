import axios from "axios";

const url="http://localhost:5556"

export const adminLogin =(data)=>{
    return axios.post(`${url}/user/login`,data)
};

export const adminRegister =(data)=>{
    return axios.post(`${url}/user/register`,data)
};

export const forgotAdminPass =(data)=>{
    return axios.patch(`${url}/user/forgotpassword`,data)
}

export const resetAdminPass =(data)=>{
    return axios.patch(`${url}/user/resetpassword`,data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
}

export const updateuser =(data)=>{
    return axios.patch(`${url}/user/updateuser`,data)
}

export const verifyemail =(data)=>{
    return axios.post(`${url}/user/verifyemail`,data)
}
export const addUser = (data) => {
    return axios.post(`${url}/user`, data)
};

export const getuser =(data)=>{
    return axios.get(`${url}/customer/all`,data)
};


export const getaddons =(data)=>{
    return axios.get(`${url}/addOns/all`,data)
}

export const addOns=(data)=>{
    return axios.post(`${url}/addOns/add`,data)
}

// delete  addOns
export const deleteaddOns = (id) => {
    return axios.delete(`${url}/addOns/delete/${id}`,{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
};

// delete multiplr addOns
export const deleteMultiaddOns = (data) => {
    return axios.delete(`${url}/addOns/deleteMultiaddOns`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { Ids: data },
    });
};