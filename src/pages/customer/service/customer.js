import instance from "../../../environment/axiosInstance";

export const getBooks=async ()=>{
    try{
        const response=await instance.get(`/api/customer/book`)
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


export const searchBook=async (genre)=>{
    try{
        const response=await instance.get(`/api/customer/book/search/${genre}`)
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


export const addBookToCart=async (bookId)=>{
    try{
        const response=await instance.post(`/api/customer/cart/${bookId}`)
        return response;
    }
    catch(error){
        if (error.response) {
            console.error("Error response data:", error.response.data);  // Log the error response
        } else {
            console.error("Error adding book to cart:", error.message);
        }
        throw error;
    }
}


export const getCartByUser=async ()=>{
    try{
        const response=await instance.get(`/api/customer/cart`)
        return response;
    }
    catch(error){
        if (error.response) {
            console.error("Error response data:", error.response.data);  // Log the error response
        } else {
            console.error("Error getting cart:", error.message);
        }
        throw error;
    }
}


export const placeOrder=async (data)=>{
    try{
        const response=await instance.post(`/api/customer/order`,data)
        return response;
    }
    catch(error){
        if (error.response) {
            console.error("Error response data:", error.response.data);  // Log the error response
        } else {
            console.error("Error placing order:", error.message);
        }
        throw error;
    }
}

export const getMyOrders=async ()=>{
    try{
        const response=await instance.get(`/api/customer/order`)
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