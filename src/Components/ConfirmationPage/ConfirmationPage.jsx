import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useLocation } from "react-router-dom";
import "./ConfirmationPage.css";
import elocalhoodImage from "./elocalhoodlogo.jpg"; // Adjust the path based on your project structure

const ConfirmationPage = () => {
  const location = useLocation();
  const { products } = location.state || { products: [] };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Title", "Quantity", "Price"];
    const tableRows = [];

    products.forEach((product) => {
      const productData = [
        product.title,
        product.quantity,
        `₹${product.price}`,
      ];
      tableRows.push(productData);
    });

    // Add image to PDF
    doc.addImage(elocalhoodImage, "JPEG", 14, 10, 20, 20); // Adjust the coordinates and size as needed

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30, // Adjust startY to place the table below the image
    });

    const totalAmount = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    doc.text(
      `Total Amount: ₹${totalAmount}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.text("Order Confirmation", 14, 65); // Adjust Y coordinate to place it appropriately
    doc.save("order_confirmation.pdf");
  };

  const calculateTotalAmount = () => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return (
    <div className="confirmation-page">
      <h2>Order Confirmation</h2>
      <p>You have confirmed the following products:</p>
      <table className="product-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productID}>
              <td>{product.title}</td>
              <td>{product.quantity}</td>
              <td>₹{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-amount">
        <strong>Total Amount: ₹{calculateTotalAmount()}</strong>
      </div>
      <button className="pdf-btn" onClick={generatePDF}>
        Download PDF
      </button>
    </div>
  );
};

export default ConfirmationPage;
