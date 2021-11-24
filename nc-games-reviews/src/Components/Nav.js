import { Link,  useNavigate } from "react-router-dom";
import { getCategories } from "../utils/api";
import { useEffect, useState } from "react";

export default function Nav() {

  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const handleSelect = (e) => {
    e.preventDefault();
    navigate(`/categories/${e.target.value}`);
  };

  return (
    <div className="nav">
      <Link to="/">
        <h2>Home</h2>
      </Link>

      <select className="categoriesOptions" onChange={handleSelect}>
        <option
          key="Category selector"
          value="Category selector"
          defaultValue="Categories"
          disabled
          selected
        >
          Categories
        </option>
        {categories.map((category) => {
          return (
            <option key={category.slug} value={category.slug}>
              {category.slug}
            </option>
          );
        })}
      </select>

      <p>Users</p>
    </div>
  )
}