const express = require("express");
const { api } = require("./routes/api.js");
const { web } = require("./routes/web.js");

const swaggerJSDoc = require("swagger-jsdoc");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use("/api", api);
app.use("/web", web);

// swagger definition
var swaggerDefinition = {
  info: {
    title: "ShoganOnBoarding API",
    version: "1.0.0",
    description:
      "Hello i am ShoganOnBoarding .",
  },
  host: "localhost:3000",
  basePath: "/api",
};

// options for swagger jsdoc
var options = {
  swaggerDefinition: swaggerDefinition, // swagger definition
  // apis: ['./configurations/UrlMapping.js'], // path where API specification are written
  apis: ["./routes/api.js"],
  // apis: [],
};

// initialize swaggerJSDoc
var swaggerSpec = swaggerJSDoc(options);

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
