import React, { useState } from "react";
import axios from "axios";
import "./UpdateAdress.css";
function UpdateAddress({ customerId, productId, quantity, onClose }) {
  const [address, setAddress] = useState("");

  const updateAddress = () => {
    axios
      .post("/update-address", {
        customerId: customerId,
        productId: productId,
        quantity: quantity,
        address: address,
      })
      .then((response) => {
        console.log(response.data);
        // Assuming response contains some confirmation message
        alert("Address updated successfully!");
        onClose(); // Close the modal or navigate back
      })
      .catch((error) => {
        console.error("Error updating address:", error);
      });
  };

  return (
    <div className="update">
      <h2 className="Up">Update Address</h2>
      <label className="up-name" htmlFor="address">
        Address:
      </label>
      <input
        type="text"
        id="address"
        placeholder="Update Your Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="pincode">
        <label className="pin1" htmlFor="pincode">
          Pincode:
        </label>
        <input className="pin" type="text" placeholder="Pincode" />
      </div>
      <div className="landmark">
        <label className="landmark1" htmlFor="landmark">
          Landmark:
        </label>
        <input
          className="landmark-l"
          type="text"
          placeholder="Near Landmark"
          required
        />
      </div>
      <button className="btn-add" onClick={updateAddress}>
        Update Address
      </button>
    </div>
  );
}

export default UpdateAddress;
