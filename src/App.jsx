import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Category from "./components/categori/Category";
import Loading from "./components/loading/Loading";
import FastFoodList from "./components/fastFoodList/FastFoodList";
import axios from "./axios";
import SearchBar from "./components/searchBar/SearchBar";
import notFound from "./assets/images/404.png";

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

  const searchItems = async (term) => {
    setLoading(true);
    const response = await axios.get(
      `/FastFood/search/${term ? "?term=" + term : ""}`
    );
    setLoading(false);
    setFastFoodItems(response.data);
  };

  const renderContent = () => {
    if (loading) {
      return <Loading theme="dark" />;
    }
    if (fastFoodItems.length === 0) {
      return (
        <>
          <div className="alert alert-warning text-center">
            برای کلید واژه فوق هیچ آیتمی یافت نشد
          </div>
          <img
            src={notFound}
            alt=""
            className="mx-auto mt-5 d-block fade-in-horiz"
          />
        </>
      );
    }

    return <FastFoodList fastFoodItems={fastFoodItems} />;
  };

  return (
    <>
      <div className="wrapper bg-faded-dark">
        <Header />
        <Category filterItems={filterItems}>
          <SearchBar searchItems={searchItems} />
        </Category>
        <div className="container mt-4">{renderContent()}</div>
      </div>
    </>
  );
};

export default App;
