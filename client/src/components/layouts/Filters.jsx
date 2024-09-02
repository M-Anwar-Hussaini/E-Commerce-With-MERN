import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helper";
import { PRODUCT_CATEGORIES } from "../../constants/constant";
import StarRatings from "react-star-ratings";

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
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });
    if (checkbox.checked) {
      // Delete
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value);
      } else {
        searchParams.append(checkbox.name, checkbox.value);
      }
      const path = `${window.location.pathname}?${searchParams.toString()}`;
      navigate(path);
    } else {
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
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
      {[5, 4, 3, 2, 1].map((rating) => (
        <div className="form-check" key={rating}>
          <input
            className="form-check-input"
            type="checkbox"
            name="ratings"
            id={`rating${rating}`}
            value={rating}
            defaultChecked={handleDefaultChecked("ratings", "" + rating)}
            onChange={(e) => handleCategory(e.target)}
          />
          <label className="form-check-label" htmlFor={`rating${rating}`}>
            <StarRatings
              rating={rating}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="21px"
              starSpacing="1px"
            />
          </label>
        </div>
      ))}
    </div>
  );
}
