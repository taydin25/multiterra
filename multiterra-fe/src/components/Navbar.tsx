import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";


function Navbar() {
  const username = localStorage.getItem("username");

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("customerId");

  window.location.href = "/login";
};

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "90px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        zIndex: 1000,
      }}
    >
      <Link to="/">
        <img
          src={logo}
          alt="Multiterra Logo"
          style={{
            height: "160px",
            width: "auto",
            cursor: "pointer",
          }}
        />
      </Link>

      <div
        style={{
          display: "flex",
          gap: "40px",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        <Link
          to="/customers"
          style={{ textDecoration: "none", color: "#2563eb" }}
        >
          Customers
        </Link>

        <Link
          to="/products"
          style={{ textDecoration: "none", color: "#2563eb" }}
        >
          Products
        </Link>

        <Link
          to="/orders"
          style={{ textDecoration: "none", color: "#2563eb" }}
        >
          Orders
        </Link>

        <Link to="/register-customer">Become a Customer</Link>
 
 {username ? (
  <>
    <span
      style={{
        color: "#10b981",
        fontWeight: "bold"
      }}
    >
      👤 {username}
    </span>

    <button
      onClick={logout}
      style={{
        background: "#dc2626",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      Logout
    </button>
  </>
) : (
  <Link
    to="/login"
    style={{
      textDecoration: "none",
      color: "#2563eb"
    }}
  >
    Login
  </Link>
)}
      
      </div>
    </nav>
  );
}

export default Navbar;