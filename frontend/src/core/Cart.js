import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import PaymentB from "./PaymentB";


const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = products => {
    return (
      <div>
        <h2>This is load products</h2>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div className="col-6 mb-4">
                <Card
                  key={index}
                  product={product}
                  addtoCart={false}
                  removeFromCart={true}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>Checkout Section</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to Checkout???">
      <div className="row text-center">
        <div className="col-6">{products.length > 0 ? loadAllProducts(products) : ( <h3>No Products in Cart</h3> )}</div>
        <div className="col-4 mx-auto"><PaymentB products={products} setReload={setReload} /></div>
      </div>
    </Base>
  );
};

export default Cart;
