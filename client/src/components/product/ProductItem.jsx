import PropTypes from "prop-types"; // ES6
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

export default function ProductItem({ product }) {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={product?.images[0]?.url || "./images/default_product.png"}
          alt={product?.name}
        />
        <div className="card-body ps-3 d-flex justify-content-center flex-column">
          <h5 className="card-title">
            <Link to={`/products/${product?._id}`}>{product?.name}</Link>
          </h5>
          <div className="ratings mt-auto d-flex">
            <StarRatings
              rating={product?.ratings}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="22px"
              starSpacing="1px"
            />
            <span id="no_of_reviews" className="pt-2 ps-2">
              ({product?.numOfReviews})
            </span>
          </div>
          <p className="card-text mt-2">${product?.price}</p>
          <Link to={`/products/${product?._id}`} id="view_btn" className="btn btn-block">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object,
};
