import instance from "../../../environment/axiosInstance";

export const postBook=async (bookDto)=>{
    try{
        console.log("Posting book with data:", bookDto);
        const response=await instance.post(`/api/admin/book`,bookDto)
        return response;
    }
    catch(error){
        if (error.response) {
            console.error("Error response data:", error.response.data);  // Log the error response
        } else {
            console.error("Error posting book:", error.message);
        }
        throw error;
    }
}

export const deleteBook=async (id)=>{
    try{
        const response=await instance.delete(`/api/admin/book/${id}`)
        return response;
    }
    catch(error){
        if (error.response) {
            console.error("Error response data:", error.response.data);  // Log the error response
        } else {
            console.error("Error deleting book:", error.message);
        }
        throw error;
    }
}

export const getBooks=async ()=>{
    try{
        const response=await instance.get(`/api/admin/book`)
        return response;
    }
    catch(error){
        if (error.response) {
            console.error("Error response data:", error.response.data);  // Log the error response
        } else {
            console.error("Error getting books:", error.message);
        }
        throw error;
    }
}

export const getBookById=async (id)=>{
    try{
        const response=await instance.get(`/api/admin/book/${id}`)
        return response;
    }
    catch(error){
        if (error.response) {
            console.error("Error response data:", error.response.data);  // Log the error response
        } else {
            console.error("Error retreiving book:", error.message);
        }
        throw error;
    }
}

export const updateBook=async (id,bookDto)=>{
    try{
        const response=await instance.put(`/api/admin/book/${id}`,bookDto)
        return response;
    }
    catch(error){
        if (error.response) {
            console.error("Error response data:", error.response.data);  // Log the error response
        } else {
            console.error("Error updating book:", error.message);
        }
        throw error;
    }
}

export const searchBook=async (genre)=>{
    try{
        const response=await instance.get(`/api/admin/book/search/${genre}`)
        return response;
    }
    catch(error){
        if (error.response) {
            console.error("Error response data:", error.response.data);  // Log the error response
        } else {
            console.error("Error retreiving book:", error.message);
        }
        throw error;
    }
}

export const getOrders=async ()=>{
    try{
        const response=await instance.get(`/api/admin/order`)
        return response;
    }
    catch(error){
        if (error.response) {
            console.error("Error response data:", error.response.data);  // Log the error response
        } else {
            console.error("Error getting orders:", error.message);
        }
        throw error;
    }
}