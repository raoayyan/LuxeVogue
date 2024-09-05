import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { ShoppingCart } from 'lucide-react';
const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  
  return (
    
    <header className="bg-white shadow-sm">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">TechMart</h1>
      <nav>
        <ul className="flex space-x-4">
        <Link to="/">Home</Link>
        <Link to="/mobile">Mobiles</Link>
        <Link to="/laptops">Laptops</Link>
        </ul>
      </nav>
      <Link to="/cart">
      <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
        <ShoppingCart className="h-5 w-5 text-gray-600" />
      </button></Link>
      {auth._id ? (
        <Links>
          {auth.isAdmin && (
            <div>
              <Link className="admin" to="/admin/summary">Admin</Link>
            </div>
          )}
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
    </div>
  </header>
   
  );
};

export default Navbar;


const Links = styled.div`
  display: flex;
  align-items: center;
 
 color: black;
 .admin{
  color: black;
  text-decoration: none;
  &:hover{
    text-decoration: none;
        color:gray;
  }
 }
  div {
    cursor: pointer;
    color: black;
    margin-left: 2rem;
    

    &:hover {
      text-decoration: none;
        color:gray;
    }
  }
`;

const AuthLinks = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;

  a {
    margin-left: 2rem;
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: none;
        color:gray;
    }
  }
`;