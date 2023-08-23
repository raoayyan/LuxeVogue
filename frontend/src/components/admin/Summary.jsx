import styled from "styled-components"
import {FaUsers,FaChartBar,FaClipboard} from "react-icons/fa"
import Widget from "./summary-component/Widget"
import { useState,useEffect } from "react"
import axios from "axios"
import { url,setHeaders } from "../../features/api"
import Chart from "./summary-component/Charts"
import Transactions from "./summary-component/Transaction"
import AllTimeData from "./summary-component/AllTimeData"
const Summary = ()=>{
    const [users,setUsers] = useState([]);
    const [userPerc,setUserPerc] = useState(0)

    const [orders,setOrders] = useState([]);
    const [orderPerc,setOrderPerc] = useState(0)
    
    const [income,setIncome] = useState([])
    const [incomePerc,setIncomePerc] = useState(0)

   


    // function compare(a, b) {
    //     if (a[0]._id === b[0]._id) {
    //       return 0;
    //     }
    //     return a[0]._id > b[0]._id ? -1 : 1;
    //   }
      
      function compare(a,b){
        if(a._id < b._id){
            return 1;
        }
        if(a._id > b._id){
            return -1;
        }
        return 0;
      }
   //this is fetching user of one month
    useEffect(()=>{       //this is they way to fetch data without redux
        async function fetchData (){
            try{
                 const res = await axios.get(`${url}/users/stats`, setHeaders())
                 
                 res.data.sort(compare)
                 
                 setUsers(res.data);
                 setUserPerc(((res.data[0].total - res.data[1].total)/res.data[1].total)*100)
            }catch(err){

            }
        }
        fetchData();
    },[])
   
    useEffect(()=>{       //this is they way to fetch data without redux
        async function fetchData (){
            try{
                 const res = await axios.get(`${url}/orders/stats`, setHeaders())
                 
                 res.data.sort(compare)
                 
                 
                 setOrders(res.data);
                 setOrderPerc(((res.data[0].total - res.data[1].total)/res.data[1].total)*100)
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
    },[])
   
    useEffect(()=>{       //this is they way to fetch data without redux
        async function fetchData (){
            try{
                 const res = await axios.get(`${url}/orders/income/stats`, setHeaders())
                 
                 res.data.sort(compare)
                 
                 
                 setIncome(res.data);
                 setIncomePerc(((res.data[0].total - res.data[1].total)/res.data[1].total)*100)
            }catch(err){
                 console.log(err)
            }
        }
        fetchData();
    },[])

   const data = [
    {
        icon:<FaUsers />,
        digits:users[0]?.total ?? 0,
        isMoney:false,
        title:"users",
        color:"rgb(102,108,255)",
        bgColor:"rgba(102,108,255,0.12)",
        percentage:userPerc
    },
    {
        icon:<FaClipboard />,
        digits:orders[0]?.total ?? 0,
        isMoney:false,
        title:"Orders",
        color:"rgb(38,198,249)",
        bgColor:"rgba(38,198,249,0.12)",
        percentage:orderPerc
    },
    {
        icon:<FaChartBar />,
        digits:income[0]?.total ?? 0,
        isMoney:true,
        title:"Earnings",
        color:"rgb(253,181,40)",
        bgColor:"rgba(253,181,40,0.12)",
        percentage:incomePerc
    }
   ]


    return (
        <StyledSummary>
        <MainStats>
         <Overview>
         <Title>
         <h2>OverView</h2>
         <p>How you shop is performing compared to the previous month</p>
         </Title>
         <WidgetWrapper>
         {data?.map((data,index)=><Widget key={index} data={data}/>)}
         </WidgetWrapper>
         </Overview>
         <Chart>
         
         </Chart>
        </MainStats>
        <SideStats>
        <Transactions>
        
        </Transactions>
        <AllTimeData></AllTimeData>
        </SideStats>
        
        </StyledSummary>
    )
}
export default Summary;

const StyledSummary = styled.div`
width:100%;
display:flex;

`;
const MainStats = styled.div`
flex:2;
width:100%;
`;
const Title = styled.div`
font-size: 14px;
color: rgba(234,234,255,0.68);

`;
const SideStats = styled.div`
flex:1;
width:100%;
display: flex;
flex-direction: column;
margin-left: 2rem;
`;

const WidgetWrapper = styled.div`
display: flex;
width:100%;
justify-content: space-between;
`;
const Overview = styled.div`
background: rgb(48,51,78);
color: rgba(234,234,255,0.87);
padding: 1.5rem;
height:170px ;
border-radius:10px;
display: flex;
flex-direction: column;
justify-content: space-between;
width:100%;
`;