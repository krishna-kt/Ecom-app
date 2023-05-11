import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentBHelper";
import { createOrder } from "./helper/orderHelper";

import DropIn from "braintree-web-drop-in-react";
import { isAuthenticated } from "../auth/helper";

const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then(info => {
      // console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance => (info.instance = instance)}
            />
            <div class="d-grid gap-2 col-12 mx-auto">
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
            </div>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

//   const onPurchase = () => {
//     setInfo({...info, loading: true });
//     let nonce;
//     let getNonce = info.instance.requestPaymentMethod().then(data => {
//       nonce = data.nonce;
//       const paymentData = {
//         paymentMethodNonce: nonce,
//         amount: getAmount()
//       };
//       processPayment(userId, token, paymentData)
//         .then(response => {
//           setInfo({ ...info, success: response.success, loading: false });
//           console.log("PAYMENT SUCCESS");
//           //TODO: empty the cart
//           //TODO: force reload
//         })
//         .catch(error => {
//           setInfo({ loading: false, success: false });
//           console.log("PAYMENT FAILED");
//         });
//     });
//   };

const onPurchase = () => {
    setInfo({ ...info, loading: true })
    let nonce =null;
        let getNonce = info?.instance?.requestPaymentMethod()
                                 .then((data) => {
          nonce = data?.nonce;
          const paymentData = {
            paymentMethodNonce: nonce,
            amount: getAmount()
          };
          processPayment(userId, token, paymentData)
            .then(response => {
                console.log(response)
              setInfo({ ...info, success: true, loading: false });
              console.log("PAYMENT SUCCESS");
              //TODO: empty the cart
              //TODO: force reload
            })
            .catch(error => {
              setInfo({ loading: false, success: false , error: error});
              console.log("PAYMENT FAILED");
              console.log(error);

            });
        })
        .catch(error =>console.log(error));
      };

  const getAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Your bill is {getAmount()} $</h3>
      {showbtdropIn()}
    </div>
  );
};

export default Paymentb;
