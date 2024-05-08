import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Category from "./components/categori/Category";
import Loading from "./components/loading/Loading";
import FastFoodList from "./components/fastFoodList/FastFoodList";
import axios from "./axios";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [fastFoodItems, setFastFoodItems] = useState([]);

  const fetchData = async (categoryId = null) => {
    setLoading(true);

    const response = await axios.get(
      `/FastFood/list/${categoryId ? "?categoryId=" + categoryId : ""}`
    );
    setLoading(false);
    setFastFoodItems(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterItems = (categoryId) => {
    fetchData(categoryId);
  };

  const renderContent = () => {
    if (loading) {
      return <Loading theme="dark" />;
    }

    return <FastFoodList fastFoodItems={fastFoodItems} />;
  };

  return (
    <div className="wrapper bg-faded-dark">
      <Header />
      <Category filterItems={filterItems} />
      <div className="container mt-4">{renderContent()}</div>
    </div>
  );
};

export default App;
