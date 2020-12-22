const express = require("express");
const { api } = require("./routes/api.js");
const { web } = require("./routes/web.js");

// const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerJSON = require("./swagger.json");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));

// swagger definition
// var swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "ShoganOnBoarding API",
//       version: "1.0.0",
//       description: "Hello i am ShoganOnBoarding .",
//       servers: ["http://localhost:3000"],
//     },
//     host: "localhost:3000",
//     basePath: "/",
//   },
//   apis: ["./routes/api.js"],
// };

// initialize swaggerJSDoc
// var swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.use("/api", api);
app.use("/web", web);

app.get("/", (req, res) => {
  res.render("index");
});

// route for swagger.json
app.get("/swagger.json", function (req, res) {
  console.log(req.body);

  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
