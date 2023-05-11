const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "g6bps65gym3jfx27",
  publicKey: "2mfbkh9b8wchzyxv",
  privateKey: "051bac8510dda306cebc4afa520e1dbc",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate(
    {
      //customerId: aCustomerId
    },
    (err, response) => {
      // pass clientToken to your front-end
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    }
  );
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;

  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.tatus(500).send(err);
      } else {
        res.send(result);
      }
    }
  );
};
