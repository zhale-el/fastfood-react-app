import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Category from "./components/categori/Category";

const App = () => {
  return (
    <div>
      <h3 className="wrapper bg-faded-dark">
        <Header />
        <Category />
      </h3>
    </div>
  );
};

export default App;
