var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "44sxfkqph7jsxnn5",
  publicKey: "2wjj372qxpvn5p8n",
  privateKey: "05dfab5f8332c818da433a1792874ec9"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
      });
};

exports.processPayment = (req, res) => {
    
    let nonceFromTheClient = req.body.paymentMethodNonce;

    let amountFromTheClient = req.body.amount;

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
        }
      });
};