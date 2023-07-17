const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://mercadopago-szea.onrender.com",
    ],
    credentials: true,
  })
);

//body parser
app.use(express.json());

app.use((req, res, next) => {
  var mercadopago = require("mercadopago");
  mercadopago.configurations.setAccessToken(
    "TEST-2421207288296147-071212-c351e728c659f3bef0f9ec86bf9003dd-98574482"
  );

  console.log(req.body);
  mercadopago.payment
    .save(req.body)
    .then(function (response) {
      const { status, status_detail, id } = response.body;
      res.status(response.status).json({ status, status_detail, id });
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen("3000", () => console.log("listening"));
