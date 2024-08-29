import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helper";
import { PRODUCT_CATEGORIES } from "../../constants/constant";

export default function Filters() {
  // Hooks
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  useEffect(() => {
    searchParams.has("min") && setMin(searchParams.get("min"));
    searchParams.has("max") && setMax(searchParams.get("max"));
  }, []);

  // Handle Price filter
  const handleFilter = (e) => {
    e.preventDefault();
    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);
    const path = `${window.location.pathname}?${searchParams.toString()}`;
    navigate(path);
  };

  // Handle Categories
  const handleCategory = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name);
    console.log(checkboxes);
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });
    if (checkbox.checked) {
      // Delete
      if (searchParams.has("category")) {
        searchParams.set("category", checkbox.value);
      } else {
        searchParams.append("category", checkbox.value);
      }
      const path = `${window.location.pathname}?${searchParams.toString()}`;
      navigate(path);
    } else {
      if (searchParams.has("category")) {
        searchParams.delete("category");
        const path = `${window.location.pathname}?${searchParams.toString()}`;
        navigate(path);
      }
    }
  };

  const handleDefaultChecked = (checkBoxType, checkBoxValue) => {
    const value = searchParams.get(checkBoxType);
    if (checkBoxValue === value) return true;
    return false;
  };
  return (
    <div className="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading mb-3">Price</h5>
      <form
        onSubmit={handleFilter}
        id="filter_form"
        className="px-2"
        action="your_action_url_here"
        method="get"
      >
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min ($)"
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max ($)"
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              GO
            </button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Category</h5>

      {PRODUCT_CATEGORIES.map((category) => (
        <div className="form-check" key={category}>
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            id={category}
            value={category}
            defaultChecked={handleDefaultChecked("category", category)}
            onChange={(e) => handleCategory(e.target)}
          />
          <label className="form-check-label" htmlFor={category}>
            {category}
          </label>
        </div>
      ))}
      <hr />
      <h5 className="mb-3">Ratings</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="ratings"
          id="check7"
          value="5"
        />
        <label className="form-check-label" htmlFor="check7">
          <span className="star-rating">★ ★ ★ ★ ★</span>
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="ratings"
          id="check8"
          value="4"
        />
        <label className="form-check-label" htmlFor="check8">
          <span className="star-rating">★ ★ ★ ★ ☆</span>
        </label>
      </div>
    </div>
  );
}
