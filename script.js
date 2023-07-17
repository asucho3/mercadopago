const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "https://pizzasuch.netlify.app",
    credentials: true,
  })
);

app.options("*", cors());

// Set middleware of CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://pizzasuch.netlify.app");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Private-Network", true);
//   //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
//   res.setHeader("Access-Control-Max-Age", 7200);

//   console.log(req.headers);
//   console.log(res.headers);
//   next();
// });

//body parser
app.use(express.json());

app.use((req, res, next) => {
  var mercadopago = require("mercadopago");
  mercadopago.configurations.setAccessToken(
    "TEST-2421207288296147-071212-c351e728c659f3bef0f9ec86bf9003dd-98574482"
  );

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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("listening"));
