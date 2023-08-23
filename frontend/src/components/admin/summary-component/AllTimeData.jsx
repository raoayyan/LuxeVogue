import { styled } from "styled-components";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../features/api";
import { setHeaders } from "../../../features/api";

const AllTimeData = () => {
const {items} = useSelector( state => state.products)
const [totalOrders, setTotalOrders] = useState(0);
const [isLoading, setIsLoading] = useState(false);
const [totalUsers, setTotalUsers] = useState(0);
const [totalIncome, setTotalIncome] = useState(0);

useEffect(() => {
  async function fetchData() {
    setIsLoading(true);
    try {
      const res = await axios.get(`${url}/orders/allorders`, setHeaders());

      // Set the totalOrders to the length of the orders array
      setTotalOrders(res.data.length);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }
  fetchData();
}, []);

useEffect(() => {
    async function fetchData1() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${url}/users/alluser`, setHeaders());
  
        // Set the totalOrders to the length of the orders array
        setTotalUsers(res.data.length);
        
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
    fetchData1();
  }, []);

  useEffect(() => {
    async function fetchData1() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${url}/orders/income/alltime`, setHeaders());
       
        // Set the totalOrders to the length of the orders array
        setTotalIncome(res.data[0].total);
        
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
    fetchData1();
  }, []);

  return (
    <Main>
      <h3>All TIme</h3>
      <Info>
        <Title>Users</Title>
        <Data>{totalUsers}</Data>
      </Info>

      <Info>
        <Title>Products</Title>
        <Data>{items.length}</Data>
      </Info>

      <Info>
        <Title>Orders</Title>
        <Data>{totalOrders}</Data>
      </Info>

      <Info>
        <Title>Earning</Title>
        <Data>${totalIncome}</Data>
      </Info>
    </Main>
  );
};

export default AllTimeData;

const Main = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  margin-top: 1.5rem;
  border-radius: 5px;
  padding: 1rem;
  font-size: 14px;
`;
const Info = styled.div`
  display: flex;
  margin-top: 1rem;
  padding: 0.3rem;
  border-radius: 3px;
  background: rgba(38, 198, 249, 0.12);
  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`;

const Title = styled.div`
  flex: 1;
`;

const Data = styled.div`
  flex: 1;
  font-weight: 700;
`;
