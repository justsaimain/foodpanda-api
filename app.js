const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.get("/test", (req, res) => {
  res.send({
    messages: [
      { text: "Welcome to the Chatfuel Rockets!" },
      { text: "What are you up to?" },
    ],
  });
});
app.get("/", async (req, res) => {
  const inputUrl = req.query.input;
  console.log("input url", inputUrl);
  const id = inputUrl.split("/")[4];
  const apiUrl = `https://mm.fd-api.com/api/v5/vendors/${id}?include=menus&basket_currency=MMK`;
  try {
    const response = await axios.get(apiUrl);
    const { data } = response.data;
    const { menus } = data;
    // res.send("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
    res.json({
      messages: [{ text: `${data.name} ကနေ ဘာတွေမှာယူမလဲ။ 💩` }],
    });
  } catch (err) {
    console.error(err);
    res.send("something was wrong");
  }
});
