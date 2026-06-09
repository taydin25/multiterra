import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderManagement() {

  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try {

      const customerId =
        localStorage.getItem("customerId");

      if (!customerId) {

        navigate("/login");

        return;
      }

      const response = await fetch(
        `http://localhost:8083/ordermanagement/customer/${customerId}`
      );

      const data = await response.json();

      setOrders(data);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.map((order: any) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px"
          }}
        >
          <h3>{order.orderNumber}</h3>

          <p>Status: {order.status}</p>

          <p>
            Total: {order.totalPrice} {order.currency}
          </p>

          <p>
            Order Date: {order.orderDate}
          </p>
        </div>
      ))}
    </div>
  );
}

export default OrderManagement;