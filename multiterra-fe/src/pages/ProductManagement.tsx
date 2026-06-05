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

  return (
    <div className="page-layout">
      <div className="product-container">
        <h1>Product Management</h1>

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

            <button className="checkout-btn">
              Create Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductManagement;