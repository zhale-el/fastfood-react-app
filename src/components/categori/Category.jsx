import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Loading from "../loading/Loading";

const Category = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoryes = async () => {
      const response = await axios.get("/FoodCategory/categories");
      setCategories(response.data);
      setLoading(false);
    };
    fetchCategoryes();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <Loading theme="primary" />;
    }

    return (
      <ul className="nav">
        <li className="nav-item">
          <a href="#" className="nav-link">
            همه ی فست فود ها
          </a>
        </li>
        {categories.map((category) => (
          <li className="nav-item" key={category.id}>
            <a href="#" className="nav-link">
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className="container mt-n5" style={{ fontSize: "18px" }}>
      <div
        className="d-flex align-items-center bg-white rounded-3 shadow-lg py-4"
        style={{ height: "80px" }}
      >
        {renderContent()}
      </div>
    </nav>
  );
};

export default Category;
