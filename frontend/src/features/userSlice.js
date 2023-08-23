import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const initialState = {
    list:[],
    status:null,
    deleteStatus:null
}

export const userFetch = createAsyncThunk("users/userFetch" , async ()=>{
    try{
const response = await axios.get(`${url}/users/alluser`, setHeaders());
return  response.data;  //this response.data will go to action.payload
    }catch(err){
        console.log(err)
    }
})

export const userDelete = createAsyncThunk(
"users/userDelete",
async (id)=>{
    try{
        const res=await axios.delete(`${url}/users/${id}`,setHeaders() )
         return res.data; // data will go to action payload 
    }catch(err){
        console.log(err)
    }
}
)
const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:{
        [userFetch.pending]: (state, action) => {
            state.status = "pending";
          },
          [userFetch.fulfilled]: (state, action) => {
            state.status = "success";
            state.list = action.payload;
          },
          [userFetch.rejected]: (state, action) => {
            state.status = "Rejected";
            
          },

          // delete order
          [userDelete.pending]: (state, action) => {
            state.status = "pending";
          },
          [userDelete.fulfilled]: (state, action) => {
            const newList = state.list.filter((user)=> user._id !== action.payload._id )
            
            state.list = newList;
            state.deleteStatus = "success";
            toast.error("User Deleted",{position:"bottom-left"})
          },
          [userDelete.rejected]: (state, action) => {
            state.status = "Rejected";
            
          },
    }
})

export default userSlice.reducer;