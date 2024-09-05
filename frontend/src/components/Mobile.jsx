import { addToCart } from "../features/cardSlice";
import {  useGetAllproductsQuery } from "../features/productsApi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const Mobile = () => {
  const { items: data, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { data, error, isLoading } = useGetAllProductsQuery();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <Link to={`/product/${product._id}`} alt={product.name}>
                  <img src={product.image?.url} alt={product.name} />
                  </Link>
                  
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Mobile;
