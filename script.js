const express = require("express");
const cors = require("cors");

const app = express();
console.log(req);
// app.use(
//   cors({
//     origin: "https://pizzasuch.netlify.app",
//   })
// );
// app.options(
//   "*",
//   cors({
//     origin: "https://pizzasuch.netlify.app",
//   })
// );

app.use(function (req, res, next) {
  console.log(req);
  const allowedOrigins = [
    "http://localhost:5173",
    "https://mercadopago-szea.onrender.com",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

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
