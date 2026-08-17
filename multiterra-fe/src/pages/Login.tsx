import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../config/api.ts";

interface LoginProps {
  setUsername: (username: string) => void;
}

function Login({ setUsername }: LoginProps) {

  const [username, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {

    try {

      const response = await fetch(
        `${API_URLS.CUSTOMER}/customers/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      console.log("Login response:", data);

      // Token
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Kullanıcı bilgileri
      localStorage.setItem("username", data.username);
      localStorage.setItem("customerId", data.customerId);

      if (data.fullAddress) {
        localStorage.setItem("fullAddress", data.fullAddress);
      }

      // React state'i de hemen güncelle
      setUsername(data.username);

      alert("Login successful");

      // Ana sayfaya gönder
      navigate("/");

    } catch (error) {

      console.error(error);

      alert("Username or password is incorrect");
    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsernameInput(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={login}>
        Login
      </button>

    </div>
  );
}

export default Login;