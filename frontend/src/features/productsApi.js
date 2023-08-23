import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
// fetch data from backend api using redux RTK which is new way of fetching data 
export const productApi = createApi ({
    reducerPath: "productsApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000"}),
    endpoints : (builder)=>({
           getAllproducts:builder.query({
            query:() => "products"      //this products will go in http://localhost:5000/products
           }),                          // if you want to get a single product you can pass id from component and then in here query(id) = "products/id" nad this will be automatically added to the 
            
        }),
});

export const { useGetAllproductsQuery } = productApi

