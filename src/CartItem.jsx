import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items); // Fetch cart items from Redux
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce(
      (total, item) => total + item.quantity * parseFloat(item.cost.slice(1)),
      0
    );
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name)); // Remove item if quantity is 0
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference.");
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      {cart.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h3>Your cart is empty!</h3>
          <button
            className="get-started-button"
            onClick={onContinueShopping}
            style={{ marginTop: "20px" }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">
                    {item.quantity}
                  </span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  Total: $
                  {(
                    item.quantity * parseFloat(item.cost.slice(1))
                  ).toFixed(2)}
                </div>
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: "20px", color: "black" }}>
        <button
          className="get-started-button"
          onClick={onContinueShopping}
          style={{ marginRight: "10px" }}
        >
          Continue Shopping
        </button>
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;