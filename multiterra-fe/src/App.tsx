import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerRegistration from "./pages/CustomerRegistration";
import Navbar from "./components/Navbar";
import CustomerManagement from "./pages/CustomerManagement";
import ProductManagement from "./pages/ProductManagement";
import OrderManagement from "./pages/OrderManagement";
import ListCustomer from "./pages/ListCustomer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/register-customer" element={<CustomerRegistration />}/>
        <Route path="/customers/list" element={<ListCustomer />} />
        <Route path="/customers" element={<CustomerManagement />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />}

        
/>
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;