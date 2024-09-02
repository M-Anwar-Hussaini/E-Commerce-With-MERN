import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem, deleteCartItem } from "../../redux/features/cartSlice";
export default function Cart() {
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const increaseQuantity = (item, quantity) => {
    const newQuantity = quantity + 1;
    if (newQuantity > item?.stock) return;
    setItemToCard(item, newQuantity);
  };
  const decreaseQuantity = (item, quantity) => {
    const newQuantity = quantity - 1;
    if (newQuantity < 0) return;
    setItemToCard(item, newQuantity);
  };

  const setItemToCard = (item, newQuantity) => {
    const cardItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQuantity,
    };
    console.log(cardItem);
    dispatch(setCartItem(cardItem));
  };

  return (
    <>
      <MetaData title="Your Cart" />
      {cartItems?.length === 0 ? (
        <h2 className="mt-5">Your cart is empty</h2>
      ) : (
        <>
          <h2 className="mt-5">
            Your Cart: <b>{cartItems?.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems?.map((item) => {
                return (
                  <div key={item.product}>
                    <hr />
                    <div className="cart-item" data-key="product1">
                      <div className="row">
                        <div className="col-4 col-lg-3">
                          <img
                            src={item?.image}
                            alt="Laptop"
                            height="90"
                            width="115"
                          />
                        </div>
                        <div className="col-5 col-lg-3">
                          <Link to={`/products/${item?.product}`}>
                            {item?.name}{" "}
                          </Link>
                        </div>
                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p id="card_item_price">${item?.price}</p>
                        </div>
                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div className="stockCounter d-inline">
                            <span
                              className="btn btn-danger minus"
                              onClick={() =>
                                decreaseQuantity(item, item?.quantity)
                              }
                            >
                              -
                            </span>
                            <input
                              type="number"
                              className="form-control count d-inline"
                              value={item?.quantity}
                              readOnly
                            />
                            <span
                              className="btn btn-primary plus"
                              onClick={() =>
                                increaseQuantity(item, item?.quantity)
                              }
                            >
                              +
                            </span>
                          </div>
                        </div>
                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                          <i
                            id="delete_cart_item"
                            className="fa fa-trash btn btn-danger"
                            onClick={() =>
                              dispatch(deleteCartItem(item.product))
                            }
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <hr />
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">8 (Units)</span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">$1499.97</span>
                </p>
                <hr />
                <button id="checkout_btn" className="btn btn-primary w-100">
                  Check out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
