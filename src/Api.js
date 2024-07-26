import axios from "axios"

const BASE_URL = "https://crudcrud.com/api/18302d2af07842239e2e173327744865"

export const getApiCall = async (subUrl) => {
    return await axios.get(`${BASE_URL}/${subUrl}`)
}

export const postApiCall = async (payload, subUrl) => {
    const apiResponse = await axios.post(`${BASE_URL}/${subUrl}`, payload)
    if (apiResponse.status === 201) {
        return true
    }
    return false
}

export const getDetailApi = async (id, subUrl) => {
    return await axios.get(`${BASE_URL}/${subUrl}/${id}`)
}

export const putApiCall = async (id, subUrl, payload) => {
    return await axios.put(`${BASE_URL}/${subUrl}/${id}`, payload)
}

export const getDeleteApi = async (id, subUrl) => {
    return await axios.delete(`${BASE_URL}/${subUrl}/${id}`)
}