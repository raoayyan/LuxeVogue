import { Link } from "react-router-dom";
import {  useSelector } from "react-redux/es/hooks/useSelector";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const { cardTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>LuxeVogue</h2>
      </Link>
      <Link to="/cart">
        <div className="nav-bag">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <span className="bag-quantity">
            <span> {cardTotalQuantity} </span>
          </span>
        </div>
      </Link>
      {auth._id ? (
        <Links>
        {auth.isAdmin ? (
          <div>
            <Link to="/admin/summary">Admin</Link>
          </div>
        ) : null}
        <div
          onClick={() => {
            dispatch(logoutUser(null));
            toast.warning("Logged out!", { position: "bottom-left" });
          }}
        >
          Logout
        </div>
      </Links>
      ) : (
        <AuthLinks>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </AuthLinks>
      )}
    </nav>
  );
};

export default Navbar;

const Links = styled.div`
  color: white;
  display: flex;

  div {
    cursor: pointer;

    &:last-child {
      margin-left: 2rem;
    }
  }
`;

const AuthLinks = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;

// const Links = styled.div`
//   color: white;
//   display: flex;

//   div {
//     cursor: pointer;

//     &:last-child {
//       margin-left: 2rem;
//     }
//   }
// `;
