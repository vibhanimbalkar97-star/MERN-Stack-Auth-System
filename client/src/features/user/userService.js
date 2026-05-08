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

// get users
const getUsers = async ({page, limit, token}) => {
    const response = await API.get(`/?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        
    })
    return response.data
}

// delete user
const deleteUser = async({id, token}) => {
    const response = await API.delete(`${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
const userService = {
    getProfile,
    getUsers,
    deleteUser
}

export default userService