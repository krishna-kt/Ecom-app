import React, {useState, useEffect} from "react";
import { Redirect } from "react-router";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({ product, addtoCart = true, removeFromCart = false, setReload = function(f){return f}, reload = undefined }) => {
 // or use setReload = f => f
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count)

    const cardTitle = product ? product.name : "Default";
    const cardDescription = product ? product.description : "Default description";
    const cardPrice = product ? product.price : "0";

    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true))
    }

    const getRedirect = (redirect) => {
        if(redirect) {
            return <Redirect to="/cart" />
        }
    }

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload)
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">

        {getRedirect(redirect)}

        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12 d-grid gap-2 mx-auto">
            {showAddToCart(addtoCart)}
          </div>
          <div className="col-12 d-grid gap-2 mx-auto">
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
