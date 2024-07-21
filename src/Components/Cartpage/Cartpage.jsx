import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./Cartpage.css";

function CartPage({ cart = [] }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchCartDetails = () => {
    const customerID = Number(Cookies.get("customer_id"));

    axios
      .post(`/v1/cart-view`, {
        customerID: customerID,
      })
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  const handleIncrement = (productID) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productID === productID
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const handleDecrement = (productID) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productID === productID && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handleDelete = (productID) => {
    const customerID = Number(Cookies.get("customer_id"));

    axios
      .post(`/v1/remove-to-cart`, {
        customerID: customerID,
        productID: productID,
      })
      .then((response) => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.productID !== productID)
        );
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };

  const getTotalPrice = () => {
    return products.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  };

  const handleConfirm = () => {
    navigate("/confirmation", { state: { products } });
  };

  return (
    <div className="CartPage">
      {products.length > 0 ? (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.productID}>
                  <td>{product.title}</td>
                  <td>
                    <button
                      className="quantity-btn"
                      onClick={() => handleDecrement(product.productID)}
                    >
                      -
                    </button>
                    {product.quantity}
                    <button
                      className="quantity-btn"
                      onClick={() => handleIncrement(product.productID)}
                    >
                      +
                    </button>
                  </td>
                  <td>₹{product.price}</td>
                  <td>{product.rating}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product.productID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="total-price-row">
                <td colSpan="4" className="total-price-label">
                  Total Price:
                </td>
                <td className="total-price-value">₹{getTotalPrice()}</td>
              </tr>
            </tbody>
          </table>
          <button className="crfm-btn" onClick={handleConfirm}>
            Confirm
          </button>
        </>
      ) : (
        <div className="alert-box">
          <strong>Alert!</strong> Your cart is empty.
        </div>
      )}
    </div>
  );
}

export default CartPage;
