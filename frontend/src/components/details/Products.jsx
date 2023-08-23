import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url, setHeaders } from "../../features/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cardSlice";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const Navigate = useNavigate();


  console.log(product);
  useEffect(() => {
    //this is they way to fetch data without redux
    async function fetchData() {
      try {
        const res = await axios.get(
          `${url}/products/find/${params.id}`,
          setHeaders()
        );

        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleAddToCart = (product)=>{
    dispatch(addToCart(product));
    Navigate("/cart");
  }
  return (
    <StyledProduct>
      <ProductContainer>
        {loading ? (
          <p>Loading</p>
        ) : (
          <>
            <ImageContainer>
            <img src={product.image?.url} alt="product" />
            </ImageContainer>
            <ProductDetails>
            <h3>{product.name}</h3>
            <p><span>Brand :</span>{product.brand}</p>
            <p><span>Description :</span>{product.desc}</p>
            <Price>${product.price?.toLocaleString()}</Price>
            <button className="product-add-to-cart" onClick={()=> handleAddToCart(product)}> Add to cart</button>
            </ProductDetails>
          </>
        )}
      </ProductContainer>
    </StyledProduct>
  );
};

export default Product;

const StyledProduct = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;
const ProductContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
  }
`;
const ProductDetails = styled.div`
  flex: 2;
  margin-left: 2rem;
  h3 {
    font-size: 35px;
  }
  p span {
    font-weight: bold;
  }
`;
const Price = styled.div`
  margin: 1rem 0;
  font-weight: bold;
  font-size: 25px;
`;
