import { styled } from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../features/api";
import { setHeaders } from "../../../features/api";
import moment from "moment";


const Transactions = () => {
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${url}/orders/?new=true`, setHeaders());

        setOrder(res.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <StyledTransactions>
      {isLoading ? (
        <p>Transactions Loading ...</p>
      ) : (
        <>
          <h3>Lastest Transactions </h3>
          {order &&
            order.map((orderItem, index) => (
              <Transaction key={index}>
                <p>{orderItem.shipping.name}</p>
                <p>{(orderItem.total / 100).toLocaleString()}</p>
                <p>{moment(orderItem.createdAt).fromNow()}</p>
              </Transaction>
            ))}
        </>
      )}
    </StyledTransactions>
  );
};
export default Transactions;

const StyledTransactions = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  padding: 1rem;
  border-radius: 5px;
`;
const Transaction = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 1rem;
  padding: 0.5 rem;
  border-radius: 3px;
  background: rgba(38, 198, 249, 0.12);
  p {
    flex: 1;
  }
  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`;
