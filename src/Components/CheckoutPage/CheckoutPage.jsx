import React, { useState, useEffect } from "react";
import axios from "axios";

function CheckoutPage() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make API call to fetch order details
    axios
      .post("/buy")
      .then((response) => {
        console.log("Getting data");
        const { customerID, productID, quantity, storeID, transactionID } =
          response.data.data;
        setOrderDetails({
          customerID,
          productID,
          quantity,
          storeID,
          transactionID,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        setError("Failed to load order details. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="OrderDetails">Order Details</h2>
      <p className="Cid">Customer ID: {orderDetails.customerID}</p>
      <p className="Pid">Product ID: {orderDetails.productID}</p>
      <p className="Qid">Quantity: {orderDetails.quantity}</p>
      <p className="Sid">Store ID: {orderDetails.storeID}</p>
      <p className="Tid">Transaction ID: {orderDetails.transactionID}</p>
    </div>
  );
}

export default CheckoutPage;
