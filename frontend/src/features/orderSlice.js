import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
// import { toast } from "react-toastify";

const initialState = {
    list:[],
    status:null,
}

export const orderFetch = createAsyncThunk("orders/orderFetch" , async ()=>{
    try{
const response = await axios.get(`${url}/orders`, setHeaders());
return  response.data;  //this response.data will go to action.payload
    }catch(err){
        console.log(err)
    }
})

export const ordersEdit = createAsyncThunk(
"orders/ordersEdit",
async (values,{getState})=>{
         const state = getState();

    let currentOrder = state.orders.list.filter((order)=> order._id === values.id);

    const newOrder = {
        ...currentOrder[0],
        delivery_status:values.delivery_status,
    };
    try{
        const res=await axios.put(`${url}/orders/${values.id}`,newOrder,setHeaders() )
         return res.data; // data will go to action payload 
    }catch(err){
        console.log(err)
    }
}
)
const orderSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{},
    extraReducers:{
        [orderFetch.pending]: (state, action) => {
            state.status = "pending";
          },
          [orderFetch.fulfilled]: (state, action) => {
            state.status = "success";
            state.list = action.payload;
          },
          [orderFetch.rejected]: (state, action) => {
            state.status = "Rejected";
            
          },

          // edit order
          [ordersEdit.pending]: (state, action) => {
            state.status = "pending";
          },
          [ordersEdit.fulfilled]: (state, action) => {
            const updatedOrders = state.list.map((order)=> order._id === action.payload._id  ? action.payload:order)
            
            state.list = updatedOrders;
            state.status = "success";
          },
          [ordersEdit.rejected]: (state, action) => {
            state.status = "Rejected";
            
          },
    }
})

export default orderSlice.reducer;