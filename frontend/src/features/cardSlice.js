import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
    cartItems:localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : [],
    cardTotalQuantity:0,
    cartTotalAmount:0
}


const cardSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart(state,action){
           const itemIndex = state.cartItems.findIndex((item)=> item._id === action.payload._id);
           if(itemIndex >=0){
              state.cartItems[itemIndex].cartQuantity +=1;
              toast.info(`Increased ${state.cartItems[itemIndex].name} Quantity`,{position:"bottom-left"})
           }
           else{ const tempProduct = {...action.payload, cartQuantity:1}
           state.cartItems.push(tempProduct);
           toast.success(`${action.payload.name} added to cart`,{position:"bottom-left"})
        }
          
        localStorage.setItem("cartItem", JSON.stringify(state.cartItems))
        },
        removeFromCart(state,action){
           const nextCartItems =  state.cartItems.filter(
                cartitem => cartitem._id !== action.payload._id
            )
            state.cartItems = nextCartItems;


            toast.error(`${action.payload.name} removed from Cart`,{ position:"bottom-left"})
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems))
        },
        decreaseCart(state,action){
            const itemIndex = state.cartItems.findIndex((item)=> item._id === action.payload._id);
            if(state.cartItems[itemIndex].cartQuantity >1){
                state.cartItems[itemIndex].cartQuantity -=1 ;
                toast.error(`${action.payload.name} quantity decreased`,{ position:"bottom-left"})
            }
            else if (state.cartItems[itemIndex].cartQuantity === 1){
                const nextCartItems =  state.cartItems.filter(
                    cartitem => cartitem._id !== action.payload._id
                )
                state.cartItems = nextCartItems;
    
    
                toast.error(`${action.payload.name} removed from Cart`,{ position:"bottom-left"})
            }
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems))
        },
        clearCart(state,action){
            state.cartItems = []
            toast.warning(`Cart is Empty Now`,{ position:"bottom-left"})
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems))
        },
        getTotal(state,action){
          let { total,quantity } = state.cartItems.reduce((cartTotal, cartItem)=>{
                const {price,cartQuantity} = cartItem;
                const itemTotal = price*cartQuantity;

                cartTotal.total += itemTotal
                cartTotal.quantity +=cartQuantity

                return cartTotal;
            },{
                total:0,
                quantity:0
            })
            state.cardTotalQuantity = quantity;
            state.cartTotalAmount = total; 
        } 
    }
})

export const {addToCart,removeFromCart,decreaseCart,clearCart,getTotal} = cardSlice.actions;

export default cardSlice.reducer;