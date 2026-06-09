import { useEffect, useState } from "react";
import "./ProductManagement.css";

function ProductManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/productcatalog/getAllProducts"
      );

      if (!response.ok) {
        throw new Error("Products could not be loaded");
      }

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (product: any) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.productName
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      product.productCode
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      product.brandName
        ?.toLowerCase()
        .includes(searchText.toLowerCase())
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

 const createOrder = async () => {
  try {

    const groupedItems = Object.values(
      cart.reduce((acc: any, item: any) => {

        const key = item.productCode;

        if (!acc[key]) {
          acc[key] = {
            productCode: item.productCode,
            productName: item.productName,
            quantity: 1,
            unitPrice: Number(item.price),
            totalPrice: Number(item.price)
          };
        } else {
          acc[key].quantity += 1;
          acc[key].totalPrice += Number(item.price);
        }

        return acc;
      }, {})
    );

    const totalPrice = groupedItems.reduce(
      (sum: number, item: any) => sum + item.totalPrice,
      0
    );

    const customerId = localStorage.getItem("customerId");
    const fullAddress = localStorage.getItem("fullAddress");

    const orderRequest = {
      customerId: customerId,
      shippingAddress: fullAddress,
      note: "Web üzerinden oluşturuldu.",
      currency: "TRY",
      items: groupedItems,
      totalPrice
    };

    const response = await fetch(
      "http://localhost:8083/ordermanagement/createOrder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderRequest)
      }
    );

    if (!response.ok) {
      throw new Error("Order creation failed");
    }

    const data = await response.json();

    console.log(data);

    alert("Order created successfully");

    setCart([]);

  } catch (error) {
    console.error(error);
    alert("Order creation failed");
  }
};

  return (
    <div className="page-layout">
      <div className="product-container">
        <h1>Products</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by product name, code or brand..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.productId}>
              <img
                src={`/images/${product.productCode}.png`}
                alt={product.productName}
                className="product-image"
                onError={(e) => {
                  e.currentTarget.src = "/images/no-image.png";
                }}
              />

              <div className="product-info">
                <h3>{product.productName}</h3>

                <p className="brand">{product.brandName}</p>

                <p className="description">
                  {product.description}
                </p>

                <p className="price">
                  {product.price} {product.currency}
                </p>

                <div className="product-details">
                  Stock: {product.stockQuantity}
                </div>

                <div className="product-details">
                  Status: {product.status}
                </div>

                <div className="product-details">
                  Category: {product.category}
                </div>

                <div className="product-details">
                  Code: {product.productCode}
                </div>

                <button
                  className="add-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-panel">
        <h2>🛒 Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <div>
                  <strong>{item.productName}</strong>
                </div>

                <div>
                  {item.price} {item.currency}
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <hr />

            <h3>Total: {totalPrice.toFixed(2)}</h3>

            <button 
             className="checkout-btn"
            onClick={createOrder}
             >
              Create Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductManagement;