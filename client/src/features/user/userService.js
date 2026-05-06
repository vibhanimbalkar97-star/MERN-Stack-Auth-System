import  axios  from 'axios';

const API = axios.create({
baseURL: "/api/users",
withCredentials:true
})

// get profile
const getProfile = async (token) => {
    const response = await API.get("/me", {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    return response.data;
}

const userService = {
    getProfile
}

export default userService