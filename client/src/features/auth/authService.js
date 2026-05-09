import axios from 'axios';

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
    withCredentials:true //needed for cookies, applied globally
})

// refreshtoken  (create new access token)
const refresh = async () => {
    const response = await API.get("/refresh")
    return response.data
}

// logout
const logout = async () => {
    const response = await API.post("/logout")
    return response.data
}

// login (form passed here)
const login = async (formData) => { 
    const response = await API.post("/login", formData)
    return response.data
}

// register
const register = async (formData) => {
    const response = await API.post("/register", formData)
    return response.data
}

const authService = {
    refresh,
    logout,
    login,
    register
}

export default authService





























// import axios from "axios";

// const API = axios.create({
//   baseURL: "/api/auth",
//   withCredentials: true, //  needed for cookies
// });

// // refresh token (create new access token)
// const refresh = async () => {
//   const response = await API.get("/refresh");
//   return response.data;
// };

// const authService = {
//   refresh,
// };

// export default authService;
