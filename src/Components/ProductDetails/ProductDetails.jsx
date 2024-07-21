import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [customerID, setCustomerId] = useState(""); // State to hold customer ID
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details using the product ID from the URL
    axios
      .get(`/v1/product`, { params: { id } })
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  const addToCart = () => {
    console.log("Cid :: " + Cookies.get("customer_id"));
    // Send request to backend to add product to cart
    axios
      .post("/v1/add-to-cart", {
        productID: product.id,
        customerID: Number(Cookies.get("customer_id")),
        quantity: quantity,
      })
      .then((response) => {
        console.log(response.data);
        // Assuming response.data contains updated customer ID or other relevant data
        if (response.data && response.data.customerid) {
          setCustomerId(response.data.customerid); // Update state with new ID
          alert(
            "Product added to cart! Your Customer ID is: " +
              response.data.customerid
          );
          // Redirect to cart page or update cart state as needed
        } else {
          console.error("Error: No customer ID received in response.");
        }
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  const buyNow = () => {
    // Perform any necessary actions before redirecting, such as adding to cart
    addToCart();

    // Redirect to update address page
    navigate("/UpdateAddress");
  };

  return (
    <div>
      {product ? (
        <div className="product">
          <h2 className="title">{product.title}</h2>
          <p className="dis">Description: {product.description}</p>
          <p className="price">Price: ₹{product.price}</p>
          <p className="review">
            {product.ratings} Ratings & {product.reviews} Reviews
          </p>
          <p className="rating">{product.rating}</p>
          <p className="category">{product.category}:</p>
          <p className="Brand">{product.brand}</p>
          <p className="discount">{product.discountPercentage}% Off</p>
          <p className="customerid">Customer: {Cookies.get("customer_id")}</p>
          <button className="Cart" onClick={addToCart}>
            Add to Cart
          </button>
          <button className="Buy-now" onClick={buyNow}>
            Buy Now
          </button>
          <div className="Quantity1">
            <label className="quantity" htmlFor="quantity">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="product-img">
            <img
              src={`http://192.168.201.140:3000${product.thumbnail}`}
              alt={product.title}
            />
          </div>

          <Link className="view-cart" to="/Cartpage">
            View Cart
          </Link>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}

export default ProductDetails;
