import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { clearCart } from "../features/cardSlice";


const CheckoutSuccess = ()=>{
    const cart = useSelector((state)=> state.cart)
const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(clearCart())
    },[dispatch])

   

    return (
        <Container>
        <h2>CheckOut Success</h2>
        <p>Your Order Might take some time to process</p>
        <p>Check your order status at your profile after about 10 mint</p>
        <p>Incase of any inqueries contact the support at {""}</p>
         <strong>raokhan@gmail.com</strong>
        </Container>
    )
}

export default CheckoutSuccess;

const Container = styled.div`
min-height: 80vh;
max-width: 800px;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
h2{
    margin-bottom: 0.5rem;
    color: #029e02;
}
`