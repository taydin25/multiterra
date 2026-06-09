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

const cancelOrder = async (orderNumber: string) => {

  const confirmed = window.confirm(
    `${orderNumber} siparişini iptal etmek istiyor musunuz?`
  );

  if (!confirmed) {
    return;
  }

  try {

    const response = await fetch(
      `http://localhost:8083/ordermanagement/cancellOrder/${orderNumber}`,
      {
        method: "PATCH"
      }
    );

    if (!response.ok) {
      throw new Error("Order cancellation failed");
    }

    alert("Order cancelled successfully");

    loadOrders();

  } catch (error) {

    console.error(error);

    alert("Order cancellation failed");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

     {orders.map((order: any) => (
  <div
    key={order.id}
    style={{
      border: "1px solid #374151",
      background: "#111827",
      color: "white",
      padding: "20px",
      marginBottom: "15px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
    }}
  >
          <h3>{order.orderNumber}</h3>

          <p>
  Status:
  <span
    style={{
      color:
        order.status === "PREPARING"
          ? "#facc15"
          : order.status === "SHIPPED"
          ? "#60a5fa"
          : order.status === "DELIVERED"
          ? "#22c55e"
          : "#ef4444",
      marginLeft: "8px",
      fontWeight: "bold"
    }}
  >
    {order.status}
  </span>
</p>

          <p>
            Total: {order.totalPrice} {order.currency}
          </p>

          <p>
            Order Date: {order.orderDate}
          </p>

          {order.status !== "DELIVERED" &&
 order.status !== "CANCELLED" && (
  <button
    onClick={() => cancelOrder(order.orderNumber)}
    style={{
      background: "#dc2626",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "10px"
    }}
  >
    ❌ Cancel Order
  </button>
)}
        </div>
      ))}
    </div>
  );
}

export default OrderManagement;