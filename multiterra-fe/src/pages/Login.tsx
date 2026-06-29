import { useState } from "react";
import { API_URLS } from "../config/api.ts";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



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

    console.log(data);

    // JWT varsa sakla
    localStorage.setItem("token", data.token);

    alert("Login successful");

    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("customerId", data.customerId);
    localStorage.setItem("fullAddress", data.fullAddress);

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
        onChange={(e) => setUsername(e.target.value)}
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