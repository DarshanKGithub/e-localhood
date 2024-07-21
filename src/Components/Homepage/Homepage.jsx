// Homepage.js

import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Homepage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSearch = (search) => {
    setLoading(true);
    axios
      .post("/v1/search", {
        search: search,
      })
      .then((res) => {
        if (res.data && Array.isArray(res.data.data)) {
          setData(res.data.data);
          setError(null);
        } else {
          setError("Invalid data format received from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleProductClick = (product) => {
    console.log("product clicked", product);
    setSearchTerm("");
    setData([]);
    navigate(`product/${product.id}`);
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
    } else {
      setData([]);
    }
  }, [searchTerm]);

  const renderSuggestions = () => {
    console.log("Rendering suggestion", data);
    if (data.length > 0) {
      return (
        <div className="suggestions">
          {data.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="suggestion"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-card">
                <img
                  // src={`http://10.42.0.158:3000${product.thumbnail}`}
                  alt={`Product ${product.id}`}
                  className="product-image"
                />
                <div className="product-details">
                  <h3>{product.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="homepage">
      <div className="home-nav">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchTerm.trim() !== "") {
              onSearch(searchTerm);
            }
          }}
        >
          <div className="search-container">
            <div className="search-inner">
              <input
                type="text"
                placeholder="Search your products & services"
                value={searchTerm}
                onChange={onChange}
                onFocus={() => onSearch(searchTerm)}
              />
              <FaSearch
                className="search-i"
                onClick={() => onSearch(searchTerm)}
              />
            </div>
            {renderSuggestions()}
            {data.length === 0 && loading && <p></p>}
          </div>
        </form>
      </div>
      {loading && <div className="loading-message">Loading suggestions...</div>}
      {error && <div className="error-message">Error: {error}</div>}
      <div className="Img-Border">
        <div className="Border"></div>
        <div className="images">
          <img
            src={require("./img/Electronics1.png")}
            alt="logo not found"
          ></img>
        </div>
        <div className="images2">
          <img src={require("./img/Mobile1.png")} />
        </div>
        <div className="images3">
          <img src={require("./img/Furniture1.png")} />
        </div>
        <div className="images4">
          <img src={require("./img/Clothes1.png")} />
        </div>
        <div className="images5">
          <img src={require("./img/Medical1.png")}></img>
        </div>
        <div className="images6">
          <img src={require("./img/Food1.png")}></img>
        </div>
        <div className="images7">
          <img src={require("./img/Bakery1.png")}></img>
        </div>
        <div className="logo-home">
          <img src={require("./img/elocalhoodlogo.jpg")}></img>
        </div>
        <div className="Add1">
          <img src={require("./img/Add5.jpg")}></img>
        </div>
      </div>
      <button className="btn1" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Homepage;
